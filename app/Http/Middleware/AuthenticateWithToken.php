<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class AuthenticateWithToken
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next)
    {
        if ($token = $request->bearerToken()) {
            $hashedToken = hash('sha256', $token);

            $user = \App\Models\User::whereHas('tokens', function ($query) use ($hashedToken) {
                $query->where('token', $hashedToken);
            })->first();

            if ($user) {
                Auth::login($user);
            }
        }

        return $next($request);
    }
}
