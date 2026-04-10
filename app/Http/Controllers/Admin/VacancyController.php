<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Vacancy;
use Inertia\Inertia;

class VacancyController extends Controller
{
    public function index()
    {
        $query = Vacancy::withCount('applications');
        
        if (!auth()->user()->isAdmin()) {
            $query->where('user_id', auth()->id());
        }

        return Inertia::render('Admin/Vacancies/Index', [
            'vacancies' => $query->latest()->get()
        ]);
    }

    public function store(\Illuminate\Http\Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'location' => 'required|string|max:255',
            'salary' => 'nullable|string|max:255',
            'type' => 'required|string|max:255',
            'is_active' => 'boolean',
        ]);

        $validated['user_id'] = auth()->id();

        Vacancy::create($validated);

        return redirect()->back()->with('success', 'Tin tuyển dụng đã được tạo thành công.');
    }

    public function update(\Illuminate\Http\Request $request, Vacancy $vacancy)
    {
        if (!auth()->user()->isAdmin() && $vacancy->user_id !== auth()->id()) {
            abort(403);
        }

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'location' => 'required|string|max:255',
            'salary' => 'nullable|string|max:255',
            'type' => 'required|string|max:255',
            'is_active' => 'boolean',
        ]);

        $vacancy->update($validated);

        return redirect()->back()->with('success', 'Tin tuyển dụng đã được cập nhật.');
    }

    public function destroy(Vacancy $vacancy)
    {
        if (!auth()->user()->isAdmin() && $vacancy->user_id !== auth()->id()) {
            abort(403);
        }

        $vacancy->delete();

        return redirect()->back()->with('success', 'Tin tuyển dụng đã được xóa.');
    }
}
