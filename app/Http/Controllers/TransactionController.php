<?php

namespace App\Http\Controllers;

use App\Models\CourseModel;
use App\Models\EnrollmentsModel;
use App\Models\Transaction;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Midtrans\Config;
use Midtrans\Snap;

use function Illuminate\Log\log;

class TransactionController extends Controller
{
    public function __construct()
    {
        Config::$clientKey = config('services.midtrans.clientKey');
        Config::$serverKey = config('services.midtrans.serverKey');
        Config::$isSanitized = true;
        Config::$isProduction = config('services.midtrans.is_production');
    }

    public function createTransaction($course_id, $user_id)
    {
        $course = CourseModel::find($course_id);
        $user = User::find($user_id);
        if (!$course) {
            return response()->json(['message' => 'course does not exist, please refresh the page'], 404);
        }

        $parameter = [
            'transaction_details' => array(
                'order_id' => 'TRX-' . (string) Str::uuid(),
                'gross_amount' => $course->price,
            ),
            'customer_details' => array(
                'email' => $user->email,
                'phone' => '0812345678',
            )
        ];

        Transaction::create([
            'order_id' => $parameter['transaction_details']['order_id'],
            'course_id' => $course_id,
            'user_id' => $user->id,
            'payment_status' => 1 // pending
        ]);

        $snapToken = Snap::getSnapToken($parameter);

        return response()->json([
            'message' => 'transaction initialized',
            'snap_token' => $snapToken
        ], 200);
    }

    public function setTransactionAccept($orderId)
    {
        $current_transaction = Transaction::where('order_id', '=', $orderId)->first();

        if (!$current_transaction) {
            return Inertia::render('Errors/Page404');
        }

        // Panggil Midtrans API untuk cek status
        $midtransResponse = Http::withHeaders([
            'Accept' => 'application/json',
            'Content-Type' => 'application/json',
            'Authorization' => 'Basic ' . base64_encode(env('MIDTRANS_SERVERKEY') . ':'),
        ])->get('https://api.sandbox.midtrans.com/v2/' . $orderId . '/status');

        if ($midtransResponse->failed()) {
            dd('Midtrans Request Failed', $midtransResponse->status(), $midtransResponse->body());
        }

        $response = $midtransResponse->json();

        // Cek apakah transaksi sudah paid
        if (isset($response['transaction_status']) && $response['transaction_status'] === 'settlement') {
            $current_transaction->status = 3; // completed
            $current_transaction->payment_status = 2; // paid
            $current_transaction->save();

            DB::transaction(function () use ($current_transaction) {
                EnrollmentsModel::create([
                    'user_id' => $current_transaction->user_id,
                    'course_id' => $current_transaction->course_id,
                ]);
            });

            return Inertia::render('Thanks');
        } else {
            return Inertia::render('Errors/Page500');
        }
    }

}