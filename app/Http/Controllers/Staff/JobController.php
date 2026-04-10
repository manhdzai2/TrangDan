<?php

namespace App\Http\Controllers\Staff;

use App\Http\Controllers\Controller;
use App\Models\Vacancy;
use Illuminate\Http\Request;
use Inertia\Inertia;

class JobController extends Controller
{
    public function index(Request $request)
    {
        $query = Vacancy::where('user_id', auth()->id());

        if ($request->search) {
            $query->where('title', 'like', "%{$request->search}%");
        }

        if ($request->status) {
            $query->where('is_active', $request->status === 'active');
        }

        $vacancies = $query->withCount('applications')->latest()->get();

        return Inertia::render('Staff/Jobs/Index', [
            'vacancies' => $vacancies,
            'filters' => $request->only(['search', 'status']),
        ]);
    }

    public function create()
    {
        return Inertia::render('Staff/Jobs/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'location' => 'required|string|max:255',
            'salary' => 'nullable|string|max:255',
            'type' => 'required|in:Full-time,Part-time,Remote,Contract,Intern',
            'deadline' => 'nullable|date',
        ]);

        Vacancy::create([
            ...$request->all(),
            'user_id' => auth()->id(),
            'is_active' => true,
        ]);

        return redirect()->route('staff.jobs.index');
    }

    public function edit(Vacancy $vacancy)
    {
        $this->authorizeOwner($vacancy);
        return Inertia::render('Staff/Jobs/Edit', ['job' => $vacancy]);
    }

    public function update(Request $request, Vacancy $vacancy)
    {
        $this->authorizeOwner($vacancy);

        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'location' => 'required|string|max:255',
            'salary' => 'nullable|string|max:255',
            'type' => 'required|in:Full-time,Part-time,Remote,Contract,Intern',
            'deadline' => 'nullable|date',
            'is_active' => 'boolean',
        ]);

        $vacancy->update($request->all());

        return redirect()->route('staff.jobs.index');
    }

    public function destroy(Vacancy $vacancy)
    {
        $this->authorizeOwner($vacancy);
        $vacancy->delete();
        return back();
    }

    protected function authorizeOwner(Vacancy $vacancy)
    {
        if ($vacancy->user_id !== auth()->id()) {
            abort(403);
        }
    }
}
