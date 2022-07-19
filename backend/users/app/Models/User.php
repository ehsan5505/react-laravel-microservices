<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, Notifiable;

    protected $guarded = ['id'];

    protected $hidden = [
        'password',
    ];

    public function isAdmin(): bool
    {
        return $this->is_fluencer === 0;
    }

    public function isInfluencer(): bool
    {
        return $this->is_fluencer === 1;
    }

}
