<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Vacancy;
use App\Models\Application;
use Inertia\Inertia;
use Illuminate\Support\Carbon;

class DashboardController extends Controller
{
    public function index()
    {
        $isAdmin = auth()->user()->isAdmin();
        $userId = auth()->id();

        $stats = [
            'total_openings' => Vacancy::when(!$isAdmin, fn($q) => $q->where('user_id', $userId))->count(),
            'total_candidates' => Application::when(!$isAdmin, fn($q) => $q->whereHas('vacancy', fn($v) => $v->where('user_id', $userId)))->count(),
            'interviews' => Application::where('status', 'reviewed')->when(!$isAdmin, fn($q) => $q->whereHas('vacancy', fn($v) => $v->where('user_id', $userId)))->count(),
            'hired' => Application::where('status', 'accepted')->when(!$isAdmin, fn($q) => $q->whereHas('vacancy', fn($v) => $v->where('user_id', $userId)))->count(),
            'trends' => [
                'openings' => '+5%',
                'candidates' => '+12%',
            ]
        ];

        // Group applications by day for the last 30 days
        $volumeData = Application::selectRaw('DATE(created_at) as date, count(*) as count')
            ->where('created_at', '>=', now()->subDays(30))
            ->when(!$isAdmin, fn($q) => $q->whereHas('vacancy', fn($v) => $v->where('user_id', $userId)))
            ->groupBy('date')
            ->orderBy('date')
            ->get()
            ->map(fn($item) => [
                'name' => Carbon::parse($item->date)->format('d/m'),
                'volume' => $item->count
            ]);

        // Group applications by source for pie chart
        $totalApps = Application::when(!$isAdmin, fn($q) => $q->whereHas('vacancy', fn($v) => $v->where('user_id', $userId)))->count();
        $sourceData = Application::selectRaw('source, count(*) as count')
            ->when(!$isAdmin, fn($q) => $q->whereHas('vacancy', fn($v) => $v->where('user_id', $userId)))
            ->groupBy('source')
            ->get()
            ->map(fn($item) => [
                'name' => $item->source ?? 'Khác',
                'value' => $totalApps > 0 ? round(($item->count / $totalApps) * 100) : 0
            ]);

        $charts = [
            'application_volume' => $volumeData,
            'application_sources' => $sourceData
        ];

        $recent_applications = Application::with('vacancy')
            ->when(!$isAdmin, fn($q) => $q->whereHas('vacancy', fn($v) => $v->where('user_id', $userId)))
            ->latest()
            ->take(6)
            ->get()
            ->map(fn($app) => [
                'id' => $app->id,
                'name' => $app->name,
                'job' => $app->vacancy?->title ?? 'N/A',
                'status' => $this->mapStatus($app->status),
                'date' => $app->created_at->format('Y-m-d'),
            ]);

        return Inertia::render('Dashboard', [
            'stats' => $stats,
            'charts' => $charts,
            'recent_applications' => $recent_applications,
        ]);
    }

    private function mapStatus($status)
    {
        return match($status) {
            'pending' => 'Chờ duyệt',
            'reviewed' => 'Đã xem',
            'accepted' => 'Đã tuyển',
            'rejected' => 'Từ chối',
            default => ucfirst($status)
        };
    }
}
