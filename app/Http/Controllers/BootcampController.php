<?php

namespace App\Http\Controllers;

use App\Models\Bootcamp;
use App\Models\BootcampRegistration;
use App\Services\BootcampServices;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;
use Illuminate\Validation\Rule;

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
            'title' => 'required|string',
            'slug' => 'required|string|unique:bootcamps,slug',
            'short_description' => 'required|string',
            'description' => 'required|string',
            'quota' => 'nullable|integer',
            'normal_price' => 'nullable|integer',
            'discounted_price' => 'nullable|integer',
            'time_start' => 'nullable|date_format:H:i',
            'time_end' => 'nullable|date_format:H:i',
            'date_start' => 'nullable|date',
            'date_end' => 'nullable|date',
            'meta_title' => 'nullable|string',
            'meta_description' => 'nullable|string',
            'is_published' => 'boolean',
            'custom_attributes' => 'nullable|array',
            'custom_attributes.*.title' => 'required_with:custom_attributes|string|max:255',
            'custom_attributes.*.dataType' => [
                'required_with:custom_attributes',
                'string',
                Rule::in(['text', 'number', 'date', 'file']),
            ],
            'cover' => 'nullable|image|mimes:jpeg,png,jpg|max:5120',
            'hero_image' => 'nullable|image|mimes:jpeg,png,jpg|max:5120',
            'poster' => 'nullable|image|mimes:jpeg,png,jpg|max:5120',
        ]);

        // Handle image uploads
        foreach (['cover', 'hero_image', 'poster', 'meta_image'] as $field) {
            if ($request->hasFile($field)) {
                $data[$field] = $request->file($field)->store($field . 's', 'public');
            }
        }

        // set custom attributes to JSON
        $data['custom_attributes'] = json_encode($data['custom_attributes'] ?? []);

        // Store bootcamp using a service or directly
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

        // Decode custom_attributes JSON string into array
        $bootcamp->custom_attributes = json_decode($bootcamp->custom_attributes ?? '[]', true);

        return Inertia::render('Admin/Bootcamp/Edit', [
            'bootcamp' => $bootcamp,
        ]);
    }

    public function update(Request $request, $id)
    {
        // 1. Fix checkbox value from string to boolean
        $request->merge([
            'is_published' => filter_var($request->input('is_published'), FILTER_VALIDATE_BOOLEAN),
        ]);

        // 2. Decode custom_attributes JSON from string to array
        $customAttributes = json_decode($request->input('custom_attributes') ?? '[]', true);

        // 3. Validate the decoded custom_attributes array
        Validator::make(['custom_attributes' => $customAttributes], [
            'custom_attributes' => 'array',
            'custom_attributes.*.title' => 'required|string|max:255',
            'custom_attributes.*.dataType' => [
                'required',
                'string',
                Rule::in(['text', 'number', 'date', 'file']),
            ],
        ])->validate();

        // 4. Validate the rest of the request
        $data = $request->validate([
            'title' => 'required|string',
            'slug' => 'required|string|unique:bootcamps,slug,' . $id,
            'short_description' => 'required|string',
            'description' => 'required|string',
            'quota' => 'nullable|integer',
            'normal_price' => 'nullable|integer',
            'discounted_price' => 'nullable|integer',
            'time_start' => 'nullable|date_format:H:i',
            'time_end' => 'nullable|date_format:H:i',
            'date_start' => 'nullable|date',
            'date_end' => 'nullable|date',
            'meta_title' => 'nullable|string',
            'meta_description' => 'nullable|string',
            'is_published' => 'nullable|boolean',
            'cover' => 'nullable|image|mimes:jpeg,png,jpg|max:5120',
            'hero_image' => 'nullable|image|mimes:jpeg,png,jpg|max:5120',
            'poster' => 'nullable|image|mimes:jpeg,png,jpg|max:5120',
        ]);

        // 5. Add the decoded and re-encoded custom_attributes to $data
        $data['custom_attributes'] = json_encode($customAttributes);

        // 6. Handle file replacements
        $bootcamp = $this->bootcampServices->getBootcampById($id);
        $fileFields = ['covers', 'hero_image', 'poster'];

        foreach ($fileFields as $field) {
            if ($request->hasFile($field)) {
                // Delete old file
                if (!empty($bootcamp->$field)) {
                    Storage::disk('public')->delete($bootcamp->$field);
                }

                // Store new file
                $path = $request->file($field)->store($field . 's', 'public');
                $data[$field] = $path;
            }
        }

        // 7. Save
        $this->bootcampServices->updateBootcamp($id, $data);

        return redirect()->route('bootcamp.index')->with('success', 'Bootcamp updated successfully');
    }


    public function destroy($id)
    {
        $this->bootcampServices->deleteBootcamp($id);
        return redirect()->route('bootcamp.index')->with('success', 'Bootcamp deleted successfully');
    }
}
