<?php

namespace App\Http\Controllers;

use App\Models\Application;
use App\Models\Vacancy;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ApplicationController extends Controller
{
    public function store(Request $request, Vacancy $vacancy)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'cv' => 'required|file|mimes:pdf|max:5120', // Max 5MB
        ]);

        $cvPath = null;
        if ($request->hasFile('cv')) {
            $cvPath = $request->file('cv')->store('cvs', 'public');
        }

        Application::create([
            'vacancy_id' => $vacancy->id,
            'name' => $request->name,
            'email' => $request->email,
            'cv_path' => $cvPath,
            'status' => 'pending',
        ]);

        return back()->with('success', 'Hồ sơ của bạn đã được gửi thành công!');
    }
}
