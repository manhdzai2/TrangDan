<?php

namespace App\Http\Controllers\Admin\CMS;

use App\Http\Controllers\Controller;
use App\Models\QualityStandard;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class QualityStandardController extends Controller
{
    public function index()
    {
        $standards = QualityStandard::orderBy('type')->orderBy('order')->get();
        return Inertia::render('Admin/CMS/Defects/Index', [
            'standards' => $standards
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'type' => 'required|in:pass,fail',
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'image' => 'nullable|image|max:10240',
            'order' => 'integer'
        ]);

        if ($request->hasFile('image')) {
            $validated['image_path'] = $request->file('image')->store('defects', 'public');
        }

        QualityStandard::create($validated);

        return back()->with('success', 'Thêm tiêu chuẩn chất lượng thành công.');
    }

    public function update(Request $request, QualityStandard $qualityStandard)
    {
        $validated = $request->validate([
            'type' => 'required|in:pass,fail',
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'image' => 'nullable|image|max:10240',
            'order' => 'integer'
        ]);

        if ($request->hasFile('image')) {
            // Delete old image
            if ($qualityStandard->image_path) {
                Storage::disk('public')->delete($qualityStandard->image_path);
            }
            $validated['image_path'] = $request->file('image')->store('defects', 'public');
        }

        $qualityStandard->update($validated);

        return back()->with('success', 'Cập nhật tiêu chuẩn thành công.');
    }

    public function destroy(QualityStandard $qualityStandard)
    {
        if ($qualityStandard->image_path) {
            Storage::disk('public')->delete($qualityStandard->image_path);
        }
        $qualityStandard->delete();
        return back()->with('success', 'Xóa tiêu chuẩn thành công.');
    }

    public function reorder(Request $request)
    {
        $orderedIds = $request->input('ids');
        foreach ($orderedIds as $index => $id) {
            QualityStandard::where('id', $id)->update(['order' => $index]);
        }
        return back()->with('success', 'Sắp xếp lại thành công.');
    }
}
