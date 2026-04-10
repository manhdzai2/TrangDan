<?php

namespace App\Http\Controllers;

use App\Models\Vacancy;
use Illuminate\Http\Request;
use Inertia\Inertia;

class JobController extends Controller
{
    public function index()
    {
        $vacancies = Vacancy::where('is_active', true)->latest()->get();
        return Inertia::render('Jobs/Index', [
            'vacancies' => $vacancies
        ]);
    }

    public function show(Vacancy $vacancy)
    {
        return Inertia::render('Jobs/Show', [
            'vacancy' => $vacancy
        ]);
    }
}
