<?php

namespace App\Http\Controllers\Admin\CMS;

use App\Http\Controllers\Controller;
use App\Models\OQCStep;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OQCStepController extends Controller
{
    public function index()
    {
        $steps = OQCStep::orderBy('order')->get();
        return Inertia::render('Admin/CMS/OQC/Index', [
            'steps' => $steps
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'icon' => 'required|string',
            'order' => 'integer'
        ]);

        OQCStep::create($validated);

        return back()->with('success', 'Thêm bước quy trình thành công.');
    }

    public function update(Request $request, OQCStep $oqcStep)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'icon' => 'required|string',
            'order' => 'integer'
        ]);

        $oqcStep->update($validated);

        return back()->with('success', 'Cập nhật quy trình thành công.');
    }

    public function destroy(OQCStep $oqcStep)
    {
        $oqcStep->delete();
        return back()->with('success', 'Xóa bước quy trình thành công.');
    }

    public function reorder(Request $request)
    {
        $orderedIds = $request->input('ids');
        foreach ($orderedIds as $index => $id) {
            OQCStep::where('id', $id)->update(['order' => $index]);
        }
        return back()->with('success', 'Sắp xếp lại thành công.');
    }
}
