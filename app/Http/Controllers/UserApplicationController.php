<?php

namespace App\Http\Controllers;

use App\Models\Application;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserApplicationController extends Controller
{
    public function index()
    {
        $applications = Application::with('vacancy')
            ->where('user_id', auth()->id())
            ->latest()
            ->get();

        return Inertia::render('Applications/MyApplications', [
            'applications' => $applications
        ]);
    }
}
