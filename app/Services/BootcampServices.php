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

    public function getBootcampById($id)
    {
        return Bootcamp::findOrFail($id);
    }

    public function updateBootcamp($id, $data)
    {
        $bootcamp = Bootcamp::findOrFail($id);
        $bootcamp->update($data);
        return $bootcamp;
    }

    public function deleteBootcamp($id)
    {
        $bootcamp = Bootcamp::findOrFail($id);
        return $bootcamp->delete();
    }
}