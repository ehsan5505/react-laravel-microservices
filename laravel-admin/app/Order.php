<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relation;


class Order extends Model
{
    public function orderItems()
    {
        return $this->hasMany(\App\OrderItem::class);
    }
}
