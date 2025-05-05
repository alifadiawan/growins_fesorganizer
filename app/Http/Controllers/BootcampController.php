<?php

namespace App\Http\Controllers;

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
            'time' => 'nullable',
            'date' => 'nullable',
            'main_theme' => 'required',
            'normal_price' => 'nullable|integer',
            'discounted_price' => 'nullable|integer',
        ]);

        $this->bootcampServices->createBootcamp($data);

        return redirect()->back()->with('success', 'Bootcamp created successfully');
    }
}
