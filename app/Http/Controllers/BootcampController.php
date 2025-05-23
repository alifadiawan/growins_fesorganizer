<?php

namespace App\Http\Controllers;

use App\Models\BootcampRegistration;
use App\Services\BootcampServices;
use Illuminate\Http\Request;
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
        $bootcamps = $this->bootcampServices->getAllBootcamps();
        return Inertia::render('Admin/Bootcamp/Index', ['bootcamps' => $bootcamps]);
    }

    public function create(){
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
            'normal_price' => 'nullable|integer',
            'discounted_price' => 'nullable|integer',
        ]);

        $this->bootcampServices->createBootcamp($data);

        return redirect('bootcamp.index')->with('success', 'Bootcamp created successfully');
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
            'time' => 'nullable',
            'date' => 'nullable',
            'main_theme' => 'required',
            'normal_price' => 'nullable|integer',
            'discounted_price' => 'nullable|integer',
        ]);

        $this->bootcampServices->updateBootcamp($id, $data);

        return redirect()->route('bootcamp.index')->with('success', 'Bootcamp updated successfully');
    }

    public function destroy($id)
    {
        $this->bootcampServices->deleteBootcamp($id);
        return redirect()->route('bootcamp.index')->with('success', 'Bootcamp deleted successfully');
    }
}
