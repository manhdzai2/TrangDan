<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\JobController;
use App\Http\Controllers\ApplicationController;
use App\Http\Controllers\UserApplicationController;
use App\Http\Controllers\Admin\DashboardController as AdminDashboard;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LanguageController;
use Inertia\Inertia;

// Language Switch
Route::get('language/{locale}', [LanguageController::class, 'switch'])->name('language.switch');

// Public Routes
Route::get('/', function () {
    return Inertia::render('Home');
});

Route::get('/culture', function () {
    return Inertia::render('Culture');
})->name('culture');


Route::get('/about', function () {
    return Inertia::render('About');
})->name('about');

Route::get('/jobs', [JobController::class, 'index'])->name('jobs.index');
Route::get('/jobs/{vacancy}', [JobController::class, 'show'])->name('jobs.show');

// Protected Apply Route
Route::middleware('auth')->post('/jobs/{vacancy}/apply', [ApplicationController::class, 'store'])->name('jobs.apply');

// User: Xem hồ sơ đã nộp
Route::middleware('auth')->get('/my-applications', [UserApplicationController::class, 'index'])->name('my.applications');

// Dashboard Alias (Breeze Compatibility)
Route::middleware(['auth'])->get('/dashboard', function () {
    if (auth()->user()->role === 'admin') {
        return redirect()->route('admin.dashboard');
    }
    if (auth()->user()->role === 'staff') {
        return redirect()->route('staff.dashboard');
    }
    return redirect('/');
})->name('dashboard');

// Auth Routes (Breeze)
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Staff Dedicated Routes
Route::middleware(['auth', 'role:staff,admin'])->prefix('staff')->name('staff.')->group(function () {
    Route::get('/dashboard', [\App\Http\Controllers\Staff\DashboardController::class, 'index'])->name('dashboard');
    
    // Profile
    Route::get('/profile', [\App\Http\Controllers\Staff\ProfileController::class, 'index'])->name('profile.index');
    Route::post('/profile', [\App\Http\Controllers\Staff\ProfileController::class, 'update'])->name('profile.update');
    Route::post('/profile/password', [\App\Http\Controllers\Staff\ProfileController::class, 'updatePassword'])->name('profile.password');
    Route::delete('/profile/avatar', [\App\Http\Controllers\Staff\ProfileController::class, 'deleteAvatar'])->name('profile.avatar');

    // Jobs
    Route::get('/jobs', [\App\Http\Controllers\Staff\JobController::class, 'index'])->name('jobs.index');
    Route::get('/jobs/create', [\App\Http\Controllers\Staff\JobController::class, 'create'])->name('jobs.create');
    Route::post('/jobs', [\App\Http\Controllers\Staff\JobController::class, 'store'])->name('jobs.store');
    Route::get('/jobs/{vacancy}/edit', [\App\Http\Controllers\Staff\JobController::class, 'edit'])->name('jobs.edit');
    Route::put('/jobs/{vacancy}', [\App\Http\Controllers\Staff\JobController::class, 'update'])->name('jobs.update');
    Route::delete('/jobs/{vacancy}', [\App\Http\Controllers\Staff\JobController::class, 'destroy'])->name('jobs.destroy');

    // Applications
    Route::get('/applications', [\App\Http\Controllers\Staff\ApplicationController::class, 'index'])->name('applications.index');
    Route::get('/applications/{application}', [\App\Http\Controllers\Staff\ApplicationController::class, 'show'])->name('applications.show');
    Route::put('/applications/{application}/status', [\App\Http\Controllers\Staff\ApplicationController::class, 'updateStatus'])->name('applications.updateStatus');
});

// Admin Routes (Kept for Admin only)
Route::middleware(['auth', 'role:admin'])->prefix('admin')->group(function () {
    Route::get('/dashboard', [AdminDashboard::class, 'index'])->name('admin.dashboard');
    
    // Profile Management
    Route::get('/profile', [\App\Http\Controllers\Admin\ProfileController::class, 'index'])->name('admin.profile.index');
    Route::post('/profile', [\App\Http\Controllers\Admin\ProfileController::class, 'update'])->name('admin.profile.update');
    Route::post('/profile/password', [\App\Http\Controllers\Admin\ProfileController::class, 'updatePassword'])->name('admin.profile.password');
    Route::delete('/profile/avatar', [\App\Http\Controllers\Admin\ProfileController::class, 'deleteAvatar'])->name('admin.profile.avatar');

    Route::get('/vacancies', [\App\Http\Controllers\Admin\VacancyController::class, 'index'])->name('admin.vacancies.index');
    Route::post('/vacancies/generate-jd', [\App\Http\Controllers\Admin\VacancyController::class, 'generateJD'])->name('admin.vacancies.generate-jd');
    Route::post('/vacancies', [\App\Http\Controllers\Admin\VacancyController::class, 'store'])->name('admin.vacancies.store');
    Route::put('/vacancies/{vacancy}', [\App\Http\Controllers\Admin\VacancyController::class, 'update'])->name('admin.vacancies.update');
    Route::delete('/vacancies/{vacancy}', [\App\Http\Controllers\Admin\VacancyController::class, 'destroy'])->name('admin.vacancies.destroy');
    
    Route::get('/applications/kanban', [\App\Http\Controllers\Admin\ApplicationController::class, 'kanban'])->name('admin.applications.kanban');
    Route::get('/applications', [\App\Http\Controllers\Admin\ApplicationController::class, 'index'])->name('admin.applications.index');
    Route::get('/applications/{application}', [\App\Http\Controllers\Admin\ApplicationController::class, 'show'])->name('admin.applications.show');
    Route::put('/applications/{application}/status', [\App\Http\Controllers\Admin\ApplicationController::class, 'updateStatus'])->name('admin.applications.updateStatus');
    Route::post('/applications/{application}/ai-analyze', [\App\Http\Controllers\Admin\ApplicationController::class, 'aiAnalyze'])->name('admin.applications.ai-analyze');
    Route::get('/export/applications', [\App\Http\Controllers\Admin\ExportController::class, 'exportApplications'])->name('admin.export.applications');
    
    Route::get('/reports', [\App\Http\Controllers\Admin\ReportController::class, 'index'])->name('admin.reports.index');
    
    Route::get('/settings', function() {
        return inertia('Admin/Settings');
    })->name('admin.settings');

    // Company Information
    Route::get('/company-info', [\App\Http\Controllers\Admin\CompanyInfoController::class, 'index'])->name('admin.company.index');
    Route::post('/company-info', [\App\Http\Controllers\Admin\CompanyInfoController::class, 'update'])->name('admin.company.update');

    // Enhanced Application Features
    Route::post('/applications/{application}/contact', [\App\Http\Controllers\Admin\ApplicationController::class, 'contact'])->name('admin.applications.contact');

    // System Features
    Route::post('/system/backup', function() {
        // Simulated backup logic
        return back()->with('success', 'Hệ thống đã được sao lưu thành công (Simulated).');
    })->name('admin.system.backup');
});

require __DIR__.'/auth.php';
