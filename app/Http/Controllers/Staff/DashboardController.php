<?php

namespace App\Http\Controllers\Staff;

use App\Http\Controllers\Controller;
use App\Models\Vacancy;
use App\Models\Application;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $user = auth()->user();

        $stats = [
            'total_jobs' => Vacancy::where('user_id', $user->id)->count(),
            'total_applications' => Application::whereHas('vacancy', function($q) use ($user) {
                $q->where('user_id', $user->id);
            })->count(),
            'pending_applications' => Application::where('status', 'pending')
                ->whereHas('vacancy', function($q) use ($user) {
                    $q->where('user_id', $user->id);
                })->count(),
            'accepted_applications' => Application::where('status', 'accepted')
                ->whereHas('vacancy', function($q) use ($user) {
                    $q->where('user_id', $user->id);
                })->count(),
        ];

        $recent_applications = Application::with('vacancy')
            ->whereHas('vacancy', function($q) use ($user) {
                $q->where('user_id', $user->id);
            })
            ->latest()
            ->limit(5)
            ->get();

        return Inertia::render('Staff/Dashboard', [
            'stats' => $stats,
            'recentApplications' => $recent_applications,
        ]);
    }
}
