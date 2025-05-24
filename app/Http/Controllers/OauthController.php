<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Laravel\Socialite\Facades\Socialite;
use Illuminate\Support\Facades\URL;

class OauthController extends Controller
{
    public function redirectToProvider(Request $request)
    {
        if ($request->has('redirect_to')) {
            session(['custom_redirect' => $request->input('redirect_to')]);
        }

        return Socialite::driver('google')->redirect();
    }

    public function showForm()
    {
        return Inertia::render('Auth/SetPassword');
    }

    public function store(Request $request)
    {
        $request->validate([
            'password' => 'required|string|min:8|confirmed',
        ]);

        $user = Auth::user();

        if (!$user) {
            return redirect()->back()->with('error', 'User Not Found !');
        }

        $user->password = Hash::make($request->password);
        $user->save();

        return redirect()->intended()->with('success', 'Password set successfully.');
    }
    public function handleProviderCallback()
    {
        try {

            $user = Socialite::driver('google')->user();

            $finduser = User::where('gauth_id', $user->id)->first();

            if ($finduser) {

                Auth::login($finduser);
                $redirectUrl = session()->pull('custom_redirect', '/');

                return redirect($redirectUrl);

            } else {
                $newUser = User::create([
                    'name' => $user->name,
                    'email' => $user->email,
                    'gauth_id' => $user->id,
                    'gauth_type' => 'google',
                    'password' => Hash::make(Str::random(16)),
                ]);

                Auth::login($newUser);

                if (!$user->password) {
                    $signedUrl = URL::temporarySignedRoute(
                        'oauth.showForm',
                        now()->addMinutes(5)
                    );
                    return redirect($signedUrl);
                }

                $redirectUrl = session()->pull('custom_redirect', '/');

                return redirect($redirectUrl)->with('success', 'Account created successfully.');
            }

        } catch (Exception $e) {
            dd($e->getMessage());
        }
    }
}
