<?php

namespace App\Http\Controllers;

use App\Models\Bootcamp;
use App\Models\BootcampRegistration;
use App\Services\BootcampServices;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class BootcampController extends Controller
{
    protected $bootcampServices;

    public function __construct(BootcampServices $bootcampServices)
    {
        $this->bootcampServices = $bootcampServices;
    }

    public function fetchBootcamp(Request $request)
    {
        $bootcamps = $this->bootcampServices->getAllBootcamps();
        return response()->json($bootcamps);
    }

    public function index()
    {
        $bootcamps = $this->bootcampServices->getBootcampsWithoutDescription();
        return Inertia::render('Admin/Bootcamp/Index', ['bootcamps' => $bootcamps]);
    }

    public function create()
    {
        return Inertia::render('Admin/Bootcamp/Create');
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'title' => 'required',
            'description' => 'required',
            'time_start' => 'nullable',
            'time_end' => 'nullable',
            'date_start' => 'nullable',
            'date_end' => 'nullable',
            'main_theme' => 'required',
            'url' => 'required',
            'normal_price' => 'nullable|integer',
            'cover' => 'nullable|mimes:jpeg,png,jpg|max:5120',
            'discounted_price' => 'nullable|integer',
        ]);

        if ($request->hasFile('cover')) {
            $path = $request->file('cover')->store('covers', 'public');
            $data['cover'] = $path;
        }

        $this->bootcampServices->createBootcamp($data);

        return redirect()->route('bootcamp.index')->with('success', 'Bootcamp created successfully');
    }

    public function show($id)
    {
        $bootcamp = $this->bootcampServices->getBootcampById($id);
        $registrations = BootcampRegistration::where('bootcamp_id', $id)
            ->latest()
            ->paginate(20);

        return Inertia::render('Admin/Bootcamp/Show', [
            'bootcamp' => $bootcamp,
            'registrations' => $registrations,
        ]);
    }

    public function edit($id)
    {
        $bootcamp = $this->bootcampServices->getBootcampById($id);
        return Inertia::render('Admin/Bootcamp/Edit', ['bootcamp' => $bootcamp]);
    }

    public function update(Request $request, $id)
    {
        $data = $request->validate([
            'title' => 'required',
            'description' => 'required',
            'time_start' => 'nullable',
            'time_end' => 'nullable',
            'date_start' => 'required',
            'date_end' => 'nullable',
            'main_theme' => 'nullable',
            'normal_price' => 'required|integer',
            'cover' => 'nullable|mimes:jpeg,png,jpg|max:5120',
            'discounted_price' => 'nullable|integer',
        ]);

        if ($request->hasFile('cover')) {
            // Delete old cover if exists
            $bootcamp = $this->bootcampServices->getBootcampById($id);
            if ($bootcamp->cover) {
                Storage::disk('public')->delete($bootcamp->cover);
            }

            $path = $request->file('cover')->store('covers', 'public');
            $data['cover'] = $path;
        }

        $this->bootcampServices->updateBootcamp($id, $data);

        return redirect()->route('bootcamp.index')->with('success', 'Bootcamp updated successfully');
    }

    public function destroy($id)
    {
        $this->bootcampServices->deleteBootcamp($id);
        return redirect()->route('bootcamp.index')->with('success', 'Bootcamp deleted successfully');
    }
}
