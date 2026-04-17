<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\CompanyInfo;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class CompanyInfoController extends Controller
{
    public function index()
    {
        $info = CompanyInfo::first() ?? new CompanyInfo();
        return Inertia::render('Admin/CompanyInfo', [
            'info' => $info
        ]);
    }

    public function update(Request $request)
    {
        $info = CompanyInfo::first() ?? new CompanyInfo();

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'history' => 'nullable|string',
            'general_job_description' => 'nullable|string',
            'salary_range' => 'nullable|string|max:255',
            'benefits' => 'nullable|string',
            'mission' => 'nullable|string',
            'vision' => 'nullable|string',
            'address' => 'nullable|string|max:255',
            'email' => 'nullable|email|max:255',
            'phone' => 'nullable|string|max:20',
            'logo' => 'nullable|image|max:2048',
        ]);

        if ($request->hasFile('logo')) {
            // Delete old logo if exists
            if ($info->logo) {
                Storage::disk('public')->delete($info->logo);
            }
            $validated['logo'] = $request->file('logo')->store('company', 'public');
        }

        $info->fill($validated);
        $info->save();

        return back()->with('success', 'Thông tin công ty đã được cập nhật thành công.');
    }
}
