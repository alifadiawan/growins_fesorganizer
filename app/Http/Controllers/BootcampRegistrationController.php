<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\BootcampRegistration;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class BootcampRegistrationController extends Controller
{

    public function index()
    {
        $registrations = BootcampRegistration::latest()->paginate(20);
        return Inertia::render('Admin/BootcampRegistrations/Index', [
            'registrations' => $registrations,
        ]);
    }

    // Show a single registration (admin)
    public function show($id)
    {
        $registration = BootcampRegistration::findOrFail($id);
        return Inertia::render('Admin/BootcampRegistrations/show', [
            'registration' => $registration,
        ]);
    }

    // Store a new registration (user/landing page)
    public function store(Request $request)
    {
        $validated = $request->validate([
            'bootcamp_id' => 'nullable|string|exists:bootcamps,id',
            'whatsapp_number' => 'nullable|string|max:20',
            'city' => 'nullable|string|max:100',
            'province' => 'nullable|string|max:100',

            // Additional fields
            'nama' => 'nullable|string|max:255',
            'jurusan' => 'nullable|string|max:255',
            'asal_kampus' => 'nullable|string|max:255',
            'username_ig' => 'nullable|string|max:255',
            'cv_path' => 'nullable|file|mimes:pdf,doc,docx|max:2048',
            'cover_image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048', // Add this line
        ]);

        // Handle CV upload if exists
        if ($request->hasFile('cv')) {
            $validated['cv_path'] = $request->file('cv')->store('cv_uploads', 'public');
        }

        // Handle cover image upload if exists
        if ($request->hasFile('cover_image')) {
            $validated['cover_image'] = $request->file('cover_image')->store('cover_images', 'public');
        }

        $validated['user_id'] = Auth::id();

        BootcampRegistration::create($validated);

        return redirect()->back()->with('success', 'Registration successful!');
    }

    // Edit registration (admin)
    public function edit($id)
    {
        $registration = BootcampRegistration::findOrFail($id);
        return view('Admin/bootcamp_registrations.edit', compact('registration'));
    }

    // Update registration (admin)
    public function update(Request $request, $id)
    {
        $registration = BootcampRegistration::findOrFail($id);

        $validated = $request->validate([
            'full_name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'whatsapp_number' => 'required|string|max:20',
            'city' => 'required|string|max:100',
            'province' => 'required|string|max:100',
        ]);

        $registration->update($validated);

        return redirect()->route('bootcamp_registrations.index')->with('success', 'Registration updated!');
    }

    // Delete registration (admin)
    public function destroy($id)
    {
        $registration = BootcampRegistration::findOrFail($id);
        $registration->delete();

        return redirect()->route('bootcamp_registrations.index')->with('success', 'Registration deleted!');
    }
}
