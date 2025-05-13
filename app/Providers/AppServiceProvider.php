<?php

namespace App\Providers;

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\URL;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Vite::prefetch(concurrency: 3);

        // Admin Routes
        Route::middleware(['web'])->prefix('admin')->group(base_path('routes/admin.php'));

        // Student Routes
        Route::middleware('web')->prefix('user')->group(base_path('routes/user.php'));

        // Dosen  Routes
        Route::middleware('web')->prefix('dosen')->group(base_path('routes/dosen.php'));

    }
}
