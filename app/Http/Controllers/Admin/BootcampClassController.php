<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\BootcampClassModel;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BootcampClassController extends Controller
{
    public function index()
    {
       return Inertia::render('Admin/BootcampClass/Index', [
            'bootcampClasses' => BootcampClassModel::with(['bootcamp'])->get(),
        ]);
    }
    public function create()
    {
        return Inertia::render('Admin/BootcampClass/Create');
    }
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'required|string|unique:bootcamp_class,slug',
            'price' => 'nullable|numeric|min:0',
            'description' => 'nullable|string',
            'custom_fields' => 'nullable|json',
            'order' => 'nullable|integer',
            'is_active' => 'boolean',
            'accent_color' => 'nullable|string|max:7', 
        ]);

        BootcampClassModel::create($request->all());

        return redirect()->back()->with('success', 'Bootcamp class created successfully.');
    }
    public function edit($id)
    {
        $bootcampClass = BootcampClassModel::findOrFail($id);

        return Inertia::render('Admin/BootcampClass/Edit', [
            'bootcampClass' => $bootcampClass,
        ]);
    }
    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'required|string|unique:bootcamp_class,slug,' . $id,
            'price' => 'nullable|numeric|min:0',
            'description' => 'nullable|string',
            'custom_fields' => 'nullable|json',
            'order' => 'nullable|integer',
            'is_active' => 'boolean',
            'accent_color' => 'nullable|string|max:7', 
        ]);

        $bootcampClass = BootcampClassModel::findOrFail($id);
        $bootcampClass->update($request->all());

        return redirect()->back()->with('success', 'Bootcamp class updated successfully.');
    }
    public function destroy($id)
    {
        $bootcampClass = BootcampClassModel::findOrFail($id);
        $bootcampClass->delete();

        return redirect()->back()->with('success', 'Bootcamp class deleted successfully.');
    }
}
