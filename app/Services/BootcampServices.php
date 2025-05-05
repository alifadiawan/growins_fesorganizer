<?php

namespace App\Services;

use App\Models\Bootcamp;

class BootcampServices
{
    public function createBootcamp($data)
    {
        return Bootcamp::create($data);
    }
    public function getAllBootcamps()
    {
        return Bootcamp::paginate(10);
    }
    public function getBootcampById()
    {
    }
    public function updateBootcamp()
    {
    }
    public function deleteBootcamp()
    {
    }
}