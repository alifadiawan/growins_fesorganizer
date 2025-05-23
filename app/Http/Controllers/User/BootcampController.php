<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\BootcampRegistration;
use App\Services\BootcampServices;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class BootcampController extends Controller
{
    protected $bootcampServices;
    public function __construct(BootcampServices $bootcampServices)
    {
        $this->bootcampServices = $bootcampServices;
    }

    public function show($id)
    {
        $bootcamp = $this->bootcampServices->getBootcampById($id);
        $bootcampRegistration = BootcampRegistration::where('user_id', Auth::user()->id)->where('bootcamp_id', $id)->first();
        return Inertia::render('User/Workshop/Show', [
            'bootcamp' => $bootcamp,
            'bootcampRegistration' => $bootcampRegistration
        ]);
     }

}