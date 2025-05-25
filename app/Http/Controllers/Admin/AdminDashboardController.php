<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Bootcamp;
use App\Models\CourseModel;
use App\Models\Transaction;
use App\Models\User;
use Illuminate\Http\Request;

class AdminDashboardController extends Controller
{
    public function dashboard()
    {
        $allUsers = User::count();
        $allCourses = CourseModel::count();
        $allBootcamps = Bootcamp::count();
        $allTransactions = Transaction::count();
        $recentTransactions = Transaction::with(['user'])->latest()->take(5)->get();

        return inertia('Admin/Dashboard', [
            'allUsers' => $allUsers,
            'allCourses' => $allCourses,
            'allBootcamps' => $allBootcamps,
            'allTransactions' => $allTransactions,
            'recentTransactions' => $recentTransactions,
        ]);
    }

    public function transaction_view()
    {
        $allTransactions = Transaction::paginate(20);

        return inertia('Admin/Transactions/Index', ['transactions' => $allTransactions]);
    }

    public function transaction_detail($order_id)
    {
        $transaction = Transaction::with(['course', 'user'])->where('order_id', '=', $order_id)->get();

        if (!$transaction) {
            return redirect()->back()->with('error', 'Not found');
        }

        return inertia('Admin/Transactions/Detail', ['transaction' => $transaction[0]]);
    }
}
