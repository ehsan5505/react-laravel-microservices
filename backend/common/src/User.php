<?php

namespace Microservice;

/**
 * App\User
 * @property int $id
 * @property string $first_name
 * @property string $last_name
 * @property string $email
 * @property string|null $email_verified_at
 * @property string $password
 * @property string|null $remember_token
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Notifications\DatabaseNotificationCollection|\Illuminate\Notifications\DatabaseNotification[] $notifications
 * @property-read int|null $notifications_count
 * @method static \Illuminate\Database\Eloquent\Builder|User newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|User newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|User query()
 * @method static \Illuminate\Database\Eloquent\Builder|User whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereEmailVerifiedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereFirstName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereLastName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User wherePassword($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereRememberToken($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereUpdatedAt($value)
 * @mixin \Eloquent
 * @property-read \Illuminate\Database\Eloquent\Collection|\Laravel\Passport\Client[] $clients
 * @property-read int|null $clients_count
 * @property-read \Illuminate\Database\Eloquent\Collection|\Laravel\Passport\Token[] $tokens
 * @property-read int|null $tokens_count
 * @property int $role_id
 * @method static \Illuminate\Database\Eloquent\Builder|User whereRoleId($value)
 * @property int $is_fluencer
 * @method static \Illuminate\Database\Eloquent\Builder|User whereIsFluencer($value)
 * @property-read mixed $revenue
 */
class User 
{

    public $id;
    public $first_name;
    public $last_name;
    public $email;
    public $is_fluencer;

    public function __construct($json)
    {
        $this->id           = $json['id'];
        $this->first_name   = $json['first_name'];
        $this->last_name    = $json['last_name'];
        $this->email        = $json['email'];
        $this->is_fluencer  = $json['is_fluencer'];
    }


    public function isAdmin(): bool
    {
        return $this->is_fluencer === 0;
    }

    public function isInfluencer(): bool
    {
        return $this->is_fluencer === 1;
    }

    public function revenue()
    {
        $orders = Order::where('user_id',$this->id)->where('complete',1)->get();
        return $orders->sum(function (Order $order){
            return $order->influencer_total;
        });
    }

    public function fullName()
    {
        return $this->first_name." ".$this->last_name;
    }
}
