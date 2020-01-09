<?php

namespace App\Http\Controllers;

use App\User;
use GuzzleHttp\Client;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        // $http = new \GuzzleHttp\Client([
        //     'timeout'  => 2.0,
        // ]);
        // $response = $http->request('POST', 'http://127.0.0.1:8000/oauth/token', [
        //     'headers' => [
        //         'Content-Type' => 'multipart/form-data',
        //         'Accept'     => 'application/json'
        //     ],
        //     'form_params' => [
        //         'grant_type' => 'password',
        //         'client_id' => config('services.passport.client_id'),
        //         'client_secret' => config('services.passport.client_secret'),
        //         'username' => $request->username,
        //         'password' => $request->password,
        //     ]
        // ]);
        // return $response->getBody();
        // try {
        // } catch (\GuzzleHttp\Exception\BadResponseException $e) {
        //     if ($e->getCode() === 400) {
        //         return response()->json('Invalid Request. Please enter a username or a password.', $e->getCode());
        //     } else if ($e->getCode() === 401) {
        //         return response()->json('Your credentials are incorrect. Please try again', $e->getCode());
        //     }
        //     return response()->json('Something went wrong on the server.', $e->getCode());
        // }
        // $http = new Client([
        //     'timeout'  => 2.0,
        // ]);

        // $response = $http->post('http://localhost:8000/oauth/token', [
        //     'form_params' => [
        //         'grant_type' => 'password',
        //         'client_id' => 2,
        //         'client_secret' => 'GmGrfvNcNsoSUjHkiYPN5rxMxcCVQNuheorFnu7R',
        //         'username' => 'amos64@example.net',
        //         'password' => 'password',
        //         'scope' => '',
        //     ],
        // ]);
        // dd($response);

        // return json_decode((string) $response->getBody(), true);
    }

    public function registration(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6',
        ]);
        return User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);
    }

    public function logout()
    {
        auth()->user()->tokens->each(function ($token, $key) {
            $token->delete();
        });
        return response()->json('Logged out successfully', 200);
    }
}
