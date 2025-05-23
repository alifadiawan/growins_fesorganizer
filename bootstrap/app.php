<?php

use App\Http\Middleware\AuthenticateWithToken;
use App\Http\Middleware\RedirectIfAdmin;
use App\Http\Middleware\RedirectIfInstructor;
use App\Http\Middleware\RedirectIfStudent;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->web(append: [
            \App\Http\Middleware\HandleInertiaRequests::class,
            \Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets::class,
        ]);
        $middleware->alias([
            'auth.token' => AuthenticateWithToken::class,
            'middleware.student' => RedirectIfStudent::class,
            'middleware.admin' => RedirectIfAdmin::class,
            'middleware.dosen' => RedirectIfInstructor::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions) {
        //
    })->create();
