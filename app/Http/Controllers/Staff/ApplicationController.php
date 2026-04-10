<?php

namespace App\Http\Controllers\Staff;

use App\Http\Controllers\Controller;
use App\Models\Application;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ApplicationController extends Controller
{
    public function index(Request $request)
    {
        $user = auth()->user();
        $query = Application::with(['vacancy', 'candidate'])
            ->whereHas('vacancy', function($q) use ($user) {
                $q->where('user_id', $user->id);
            });

        if ($request->search) {
            $query->whereHas('candidate', function($q) use ($request) {
                $q->where('name', 'like', "%{$request->search}%");
            });
        }

        if ($request->status) {
            $query->where('status', $request->status);
        }

        if ($request->job_id) {
            $query->where('vacancy_id', $request->job_id);
        }

        $applications = $query->latest()->get();

        return Inertia::render('Staff/Applications/Index', [
            'applications' => $applications,
            'filters' => $request->only(['search', 'status', 'job_id']),
        ]);
    }

    public function show(Application $application)
    {
        $this->authorizeOwner($application);
        $application->load(['vacancy', 'candidate']);
        
        return Inertia::render('Staff/Applications/Show', [
            'application' => $application,
        ]);
    }

    public function updateStatus(Request $request, Application $application)
    {
        $this->authorizeOwner($application);
        
        $request->validate([
            'status' => 'required|in:pending,reviewed,accepted,rejected',
        ]);

        $application->update(['status' => $request->status]);

        return back();
    }

    protected function authorizeOwner(Application $application)
    {
        if ($application->vacancy->user_id !== auth()->id()) {
            abort(403);
        }
    }
}
