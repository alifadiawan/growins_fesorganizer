<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Laravel\Socialite\Facades\Socialite;
use Illuminate\Support\Facades\URL;

class OauthController extends Controller
{
    public function redirectToProvider(Request $request)
    {
        $redirectTo = $request->input('redirect_to', '/');
        session(['custom_redirect' => $redirectTo]);

        return Socialite::driver('google')->redirect();
    }

    public function showForm()
    {
        return Inertia::render('Auth/SetPassword');
    }

    public function store(Request $request)
    {
        $request->validate([
            'password' => ['required', 'string', 'min:8', 'confirmed'],
        ]);

        $user = Auth::user();

        if (!$user) {
            return back()->with('error', 'User not found!');
        }

        $user->password = Hash::make($request->input('password'));
        $user->password_set = true;
        $user->save();

        $redirectTo = session()->pull('custom_redirect', '/');

        return redirect($redirectTo)->with('success', 'Password set successfully.');
    }

    public function handleProviderCallback()
    {
        try {
            $googleUser = Socialite::driver('google')->user();
            $user = User::where('gauth_id', $googleUser->id)->first();

            // if user not found
            if (!$user) {
                $user = User::create([
                    'name' => $googleUser->name,
                    'email' => $googleUser->email,
                    'gauth_id' => $googleUser->id,
                    'gauth_type' => 'google',
                    'password' => Hash::make(Str::random(16)),
                    'password_set' => false,
                ]);
            }

            Auth::login($user);

            if (!$user->password_set) {
                $signedUrl = URL::temporarySignedRoute('oauth.showForm', now()->addMinutes(10));
                return redirect($signedUrl);
            }

            return redirect('/');
        } catch (\Throwable $e) {
            Log::error('OAuth login error', [
                'message' => $e->getMessage(),
                'trace' => $e->getTrace(),
            ]);

            return response()->view('errors.500', [], 500);
        }

    }

}
