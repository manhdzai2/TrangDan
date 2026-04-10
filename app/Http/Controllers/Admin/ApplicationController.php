<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Application;
use Inertia\Inertia;

class ApplicationController extends Controller
{
    public function index()
    {
        $query = Application::with('vacancy');

        if (!auth()->user()->isAdmin()) {
            $query->whereHas('vacancy', function($q) {
                $q->where('user_id', auth()->id());
            });
        }

        return Inertia::render('Admin/Applications/Index', [
            'applications' => $query->latest()->get()
        ]);
    }

    public function show(Application $application)
    {
        if (!auth()->user()->isAdmin() && $application->vacancy->user_id !== auth()->id()) {
            abort(403);
        }

        return Inertia::render('Admin/Applications/Show', [
            'application' => $application->load('vacancy')
        ]);
    }

    public function updateStatus(Application $application, \Illuminate\Http\Request $request)
    {
        $request->validate([
            'status' => 'required|in:pending,reviewed,accepted,rejected'
        ]);

        $application->update([
            'status' => $request->status
        ]);

        return back()->with('success', 'Trạng thái ứng viên đã được cập nhật.');
    }
}
