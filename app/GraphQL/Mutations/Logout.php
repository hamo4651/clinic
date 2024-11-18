<?php declare(strict_types=1);

namespace App\GraphQL\Mutations;

use Illuminate\Support\Facades\Auth;

final readonly class Logout
{
    /** @param  array{}  $args */
    public function __invoke(null $_, array $args)
    {
        
        $user=Auth::guard('api')->user();
        $user->currentAccessToken()->delete();        
        return [
            'message' => 'Logout successfully',
        ];
    }   
}
