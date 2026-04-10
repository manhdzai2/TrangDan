<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Application;
use Inertia\Inertia;

class ReportController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Reports/Index', [
            'stats' => [
                'total_apps' => Application::count(),
                'by_status' => Application::selectRaw('status, count(*) as count')->groupBy('status')->get(),
                'by_source' => Application::selectRaw('source, count(*) as count')->groupBy('source')->get(),
            ]
        ]);
    }
}
