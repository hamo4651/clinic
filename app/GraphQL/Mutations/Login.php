<?php declare(strict_types=1);

namespace App\GraphQL\Mutations;

use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class Login
{
    public function __invoke($_, array $args)
    {
        // if (!Auth::attempt(['email' => $args['email'], 'password' => $args['password']])) {
        //     return [
        //         'error' => 'Invalid credentials',
        //     ];
        // }
        // $validator = Validator::make($args, [
        //     'email' => 'required||email|',
        //     'password' => 'required',
        //   ]);
    
        //   if ($validator->fails()) {
        //     return [
        //       'message' => 'Validation failed',
        //       'errors' => $validator->errors()
        //     ];
        //   }
        $user = User::where('email', $args['email'])->first();
        if (!$user || !Hash::check($args['password'], $user->password)) {
            return [
                'error' => 'email or password is incorrect.',
            ];
        }
        else{
        $token = $user->createToken('auth_token')->plainTextToken;
        return [
            'token' => $token,
            'user' => $user,
            'message' => 'Login successfully',
        ];}
    }
}
