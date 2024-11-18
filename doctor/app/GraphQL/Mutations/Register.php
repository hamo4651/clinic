<?php declare(strict_types=1);

namespace App\GraphQL\Mutations;

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\ValidationException;

class Register
{
    public function __invoke($_, array $args)
    {
        // Validate the input fields
        $validator = validator($args, [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required'],
            'image' => ['nullable', 'file'], // Ensure it's a valid file
        ]);
    
        if ($validator->fails()) {
            throw new ValidationException($validator); // Throw validation error for GraphQL
        }
    
        // Handle the image upload
        $imagePath = null;
        if (isset($args['image'])) {
            $imagePath = time() . '.' . $args['image']->extension();
            $args['image']->move(public_path('profile_images'), $imagePath);
            $imageurl = url('profile_images/' . $imagePath);
            // $imagePath =   Storage::disk('public')->put(public_path('profile_images') , time() . '.' . $args['image']->extension($args['image']->getClientOriginalName()));
        }
    
        // Create the user
        $user = User::create([
            'name' => $args['name'],
            'email' => $args['email'],
            'password' => Hash::make($args['password']),
            'image' => $imageurl,
        ]);
    
        // Ensure that the user is saved and has an id
        if ($user && $user->id) {
            $token = $user->createToken('auth_token')->plainTextToken;

            return [
                'token' => $token,
                'user' => $user,
            ];        }
    
        throw new \Exception('User creation failed.');
    }
}
