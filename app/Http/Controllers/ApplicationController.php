<?php

namespace App\Http\Controllers;

use App\Models\Application;
use App\Models\Vacancy;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ApplicationController extends Controller
{
    public function store(Request $request, Vacancy $vacancy, \App\Services\GeminiService $gemini)
    {
        $request->validate([
            'name'             => 'required|string|max:255',
            'email'            => 'required|email|max:255',
            'phone'            => ['required', 'string', 'regex:/^(0|84)(3|5|7|8|9)([0-9]{8})$/'],
            'address'          => 'required|string|max:500',
            'age'              => 'required|integer|min:16|max:70',
            'start_date'       => 'required|date|after_or_equal:today',
            'cover_letter'     => 'nullable|string',
            'cv'               => 'required|file|mimes:pdf,doc,docx|max:5120',
        ], [
            'phone.regex' => 'Số điện thoại không đúng định dạng Việt Nam.',
            'cv.required' => 'Vui lòng đính kèm CV (PDF/DOCX).',
        ]);

        $cvPath = null;
        if ($request->hasFile('cv')) {
            $cvPath = $request->file('cv')->store('cvs', 'public');
        }

        $application = Application::create([
            'vacancy_id'       => $vacancy->id,
            'user_id'          => auth()->id(),
            'name'             => $request->name,
            'email'            => $request->email,
            'phone'            => $request->phone,
            'address'          => $request->address,
            'age'              => $request->age,
            'applied_position' => $vacancy->title, // Tự động điền từ vacancy
            'start_date'       => $request->start_date,
            'cover_letter'     => $request->cover_letter,
            'cv_path'          => $cvPath,
            'status'           => 'pending',
            'is_read'          => false,
        ]);

        // Automate AI Analysis
        try {
            $cvText = "Tên: " . $request->name . "\nEmail: " . $request->email . "\nThư giới thiệu: " . ($request->cover_letter ?? "N/A");
            $jdText = "Vị trí: " . $vacancy->title . "\nMô tả: " . $vacancy->description . "\nYêu cầu: " . $vacancy->requirements;
            
            $analysisResponse = $gemini->analyzeCV($cvText, $jdText);
            $decoded = json_decode($analysisResponse, true);
            
            if ($decoded) {
                $application->update(['ai_analysis' => $decoded]);
            }
        } catch (\Exception $e) {
            \Log::error('Auto AI Analysis Failed: ' . $e->getMessage());
        }

        return back()->with('success', 'Hồ sơ của bạn đã được gửi thành công! AI của chúng tôi cũng đã hoàn tất phân tích sơ bộ.');
    }
}
