<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Application;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ApplicationController extends Controller
{
    public function index(Request $request)
    {
        $query = Application::with('vacancy');

        if (!auth()->user()->isAdmin()) {
            $query->whereHas('vacancy', function($q) {
                $q->where('user_id', auth()->id());
            });
        }

        // Search & Filter
        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%");
            });
        }

        if ($request->has('status') && $request->status !== 'all') {
            $query->where('status', $request->status);
        }

        return Inertia::render('Admin/Applications/Index', [
            'applications' => $query->latest()->get(),
            'filters' => $request->only(['search', 'status'])
        ]);
    }

    public function kanban()
    {
        $query = Application::with('vacancy');

        if (!auth()->user()->isAdmin()) {
            $query->whereHas('vacancy', function($q) {
                $q->where('user_id', auth()->id());
            });
        }

        return Inertia::render('Admin/Applications/Kanban', [
            'applications' => $query->latest()->get()
        ]);
    }

    public function show(Application $application)
    {
        if (!auth()->user()->isAdmin() && $application->vacancy->user_id !== auth()->id()) {
            abort(403);
        }

        // Mark as read
        if (!$application->is_read) {
            $application->update(['is_read' => true]);
        }

        return Inertia::render('Admin/Applications/Show', [
            'application' => $application->load('vacancy')
        ]);
    }

    public function updateStatus(Application $application, Request $request)
    {
        $request->validate([
            'status' => 'required|in:pending,reviewed,accepted,rejected'
        ]);

        $application->update([
            'status' => $request->status
        ]);

        return back()->with('success', 'Trạng thái ứng viên đã được cập nhật.');
    }

    public function contact(Application $application, Request $request)
    {
        $request->validate([
            'subject' => 'required|string|max:255',
            'message' => 'required|string',
        ]);

        return back()->with('success', "Thông báo đã được gửi đến {$application->name} thành công.");
    }

    public function aiAnalyze(Application $application, \App\Services\GeminiService $gemini)
    {
        if (!auth()->user()->isAdmin() && $application->vacancy->user_id !== auth()->id()) {
            abort(403);
        }

        // Fetch text from CV if possible
        $cvText = "Tên: " . $application->name . "\nHồ sơ: " . ($application->cover_letter ?? "N/A");
        $jdText = "Vị trí: " . $application->vacancy->title . "\nMô tả: " . $application->vacancy->description . "\nYêu cầu: " . $application->vacancy->requirements;

        $analysisResponse = $gemini->analyzeCV($cvText, $jdText);
        $decoded = json_decode($analysisResponse, true);

        if ($decoded) {
            $application->update(['ai_analysis' => $decoded]);
            return back()->with('success', 'AI Analysis completed successfully!');
        }

        return back()->with('error', 'AI was unable to generate a valid analysis. Please try again.');
    }
}
