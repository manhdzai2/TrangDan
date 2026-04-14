<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Application;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\StreamedResponse;

class ExportController extends Controller
{
    public function exportApplications()
    {
        $headers = [
            'Content-Type' => 'text/csv',
            'Content-Disposition' => 'attachment; filename="applications_' . date('Y-m-d') . '.csv"',
        ];

        $callback = function () {
            $file = fopen('php://output', 'w');
            fputcsv($file, ['ID', 'Họ tên', 'Email', 'Điện thoại', 'Vị trí', 'Trạng thái', 'Ngày nộp']);

            $query = Application::with('vacancy');
            
            if (!auth()->user()->isAdmin()) {
                $query->whereHas('vacancy', function($q) {
                    $q->where('user_id', auth()->id());
                });
            }

            $query->chunk(100, function ($applications) use ($file) {
                foreach ($applications as $app) {
                    fputcsv($file, [
                        $app->id,
                        $app->name,
                        $app->email,
                        $app->phone,
                        $app->vacancy->title ?? 'N/A',
                        $app->status,
                        $app->created_at->format('Y-m-d H:i:s'),
                    ]);
                }
            });

            fclose($file);
        };

        return new StreamedResponse($callback, 200, $headers);
    }
}
