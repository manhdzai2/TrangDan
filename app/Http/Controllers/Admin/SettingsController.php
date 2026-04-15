<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SettingsController extends Controller
{
    public function index()
    {
        $settings = [
            'company_name' => Setting::get('company_name', 'AMT SOLUTIONS'),
            'admin_email' => Setting::get('admin_email', 'admin@amt.com'),
            'notifications' => Setting::get('notifications', true),
            'two_factor' => Setting::get('two_factor', true),
            'maintenance_mode' => Setting::get('maintenance_mode', false),
        ];

        return Inertia::render('Admin/Settings', [
            'settings' => $settings
        ]);
    }

    public function update(Request $request)
    {
        $validated = $request->validate([
            'company_name' => 'required|string|max:255',
            'admin_email' => 'required|email|max:255',
            'notifications' => 'required|boolean',
            'two_factor' => 'required|boolean',
            'maintenance_mode' => 'required|boolean',
        ]);

        foreach ($validated as $key => $value) {
            Setting::set($key, $value);
        }

        return back()->with('success', 'Hệ thống đã được cập nhật thành công.');
    }
}
