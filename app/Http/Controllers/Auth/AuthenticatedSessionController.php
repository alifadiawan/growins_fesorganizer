<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;

class AuthenticatedSessionController extends Controller
{
    /**
     * Display the login view.
     */
    public function create(Request $request): Response
    {
        if ($request->has('redirect_to')) {
            session(['custom_redirect' => $request->input('redirect_to')]);
        }
        
        return Inertia::render('Auth/Login', [
            'canResetPassword' => Route::has('password.request'),
            'status' => session('status'),
        ]);
    }

    /**
     * Handle an incoming authentication request.
     */
    public function login(Request $request)
    {
        if ($request->has('redirect_to')) {
            session(['custom_redirect' => $request->input('redirect_to')]);
        }

        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return redirect()->back()->withErrors([
                'email' => 'Invalid credentials.', // or use 'general' if preferred
            ]);
        }
        Auth::login($user);

        // Pull from session (set during GET)
        $redirectUrl = session()->pull('custom_redirect', '/');

        $allowedRedirects = ['/workshop/impact'];
        if (!in_array($redirectUrl, $allowedRedirects)) {
            $redirectUrl = '/';
        }

        return redirect($redirectUrl)->with('success', 'Login successful.');

    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): RedirectResponse
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect('/');
    }
}
