<?php

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/dosen/dashboard', function () {
    return Inertia::render('Dosen/Dashboard');
})->name('dosen.dashboard');