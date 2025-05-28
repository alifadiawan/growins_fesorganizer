<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\BootcampRegistration;
use App\Services\BootcampServices;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Inertia\Inertia;

class BootcampController extends Controller
{
    protected $bootcampServices;
    public function __construct(BootcampServices $bootcampServices)
    {
        $this->bootcampServices = $bootcampServices;
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'slug' => 'nullable|string|unique:bootcamps,slug',
            'description' => 'nullable|string',
            'main_theme' => 'nullable|string',
            'quota' => 'nullable|string',
            'cover' => 'nullable|image',
            'hero_image' => 'nullable|image',
            'poster' => 'nullable|image',
            'url' => 'nullable|string|url',
            'form_fields' => 'nullable|array',
            'layout_style' => 'nullable|string',
            'meta_title' => 'nullable|string|max:255',
            'meta_description' => 'nullable|string',
            'meta_image' => 'nullable|image',
            'time_start' => 'nullable|string',
            'time_end' => 'nullable|string',
            'date_start' => 'nullable|string',
            'date_end' => 'nullable|string',
            'normal_price' => 'required|integer',
            'discounted_price' => 'nullable|integer',
            'sections' => 'nullable|array',
            'is_published' => 'boolean',
        ]);

        $validated['slug'] = $validated['slug'] ?? Str::slug($validated['title']);

        // Upload images
        foreach (['cover', 'hero_image', 'poster', 'meta_image'] as $img) {
            if ($request->hasFile($img)) {
                $validated[$img] = $request->file($img)->store('bootcamps', 'public');
            }
        }

        // Convert JSON fields
        $validated['form_fields'] = json_encode($validated['form_fields'] ?? []);
        $validated['sections'] = json_encode($validated['sections'] ?? []);

        $this->bootcampServices->createBootcamp($validated);

        return redirect()->route('bootcamps.index')->with('success', 'Bootcamp created!');
    }



    public function show($slug)
    {
        $bootcamp = $this->bootcampServices->getBootcampBySlug($slug);
        return Inertia::render('Workshop/Show', [
            'bootcamp' => $bootcamp
        ]);
    }

}