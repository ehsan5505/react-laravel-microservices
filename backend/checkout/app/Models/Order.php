<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;


class Order extends Model
{
    public function orderItems()
    {
        return $this->hasMany(\App\OrderItem::class);
    }

    public function getTotalAttribute()
    {
        return $this->orderItems->sum(function(OrderItem $item){
            return ($item->price*$item->quantity);
        });
    }

    public function getAdminTotalAttribute()
    {
        return $this->orderItems->sum(function(OrderItem $item){
            return ($item->admin_revenue);
        });
    }
    public function getInfluencerTotalAttribute()
    {
        return $this->orderItems->sum(function(OrderItem $item){
            return ($item->influencer_revenue);
        });
    }
    public function getNameAttribute()
    {
        return $this->first_name." ".$this->last_name;
    }
}
