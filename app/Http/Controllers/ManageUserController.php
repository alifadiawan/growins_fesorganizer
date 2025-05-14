<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ManageUserController extends Controller
{
    public function index()
    {
        $users = User::with('transactions')->paginate(10);

        $countAdminUsers = User::where('role', '=', 'admin')->count();
        $countStudentUsers = User::where('role', '=', 'student')->count();
        $countDosenUsers = User::where('role', '=', 'instructor')->count();
        $allUsers = User::count();

        return Inertia::render('Admin/Users/Index', [
            'users' => $users,
            'total_user' => $allUsers,
            'total_admin' => $countAdminUsers,
            'total_student' => $countStudentUsers,
            'total_dosen' => $countDosenUsers,
        ]);
    }
    public function detail()
    {
    }
    public function update()
    {
    }

    public function updateToDosen($userId)
    {

        $user = user::find($userId);

        if (!$user) {
            return redirect()->back()->with('error', 'user not found');
        }

        $user->role = 2; // dosen
        $user->save();

        return response()->json(['success' => 'User role changed to DOSEN']);
    }
}
