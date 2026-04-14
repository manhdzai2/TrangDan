<?php

namespace App\Http\Controllers;

use App\Models\Application;
use App\Models\Vacancy;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ApplicationController extends Controller
{
    public function store(Request $request, Vacancy $vacancy)
    {
        $request->validate([
            'name'             => 'required|string|max:255',
            'email'            => 'required|email|max:255',
            'phone'            => 'required|string|max:20',
            'address'          => 'required|string|max:500',
            'age'              => 'required|integer|min:16|max:70',
            'start_date'       => 'required|date|after_or_equal:today',
            'cover_letter'     => 'nullable|string',
            'cv'               => 'nullable|file|mimes:pdf,doc,docx|max:5120',
        ]);

        $cvPath = null;
        if ($request->hasFile('cv')) {
            $cvPath = $request->file('cv')->store('cvs', 'public');
        }

        Application::create([
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

        return back()->with('success', 'Hồ sơ của bạn đã được gửi thành công!');
    }
}
