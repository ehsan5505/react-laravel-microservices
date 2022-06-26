<?php

namespace App;

use Illuminate\Database\Eloquent\Model;


/**
 * App\Order
 *
 * @property int $id
 * @property string $first_name
 * @property string $last_name
 * @property string $email
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read mixed $name
 * @property-read mixed $total
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\OrderItem[] $orderItems
 * @property-read int|null $order_items_count
 * @method static \Illuminate\Database\Eloquent\Builder|Order newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Order newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Order query()
 * @method static \Illuminate\Database\Eloquent\Builder|Order whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Order whereEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Order whereFirstName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Order whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Order whereLastName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Order whereUpdatedAt($value)
 * @mixin \Eloquent
 * @property string $code
 * @property int $user_id
 * @property string $influencer_email
 * @property string|null $address
 * @property string|null $address2
 * @property string|null $city
 * @property string|null $country
 * @property string|null $zip
 * @method static \Illuminate\Database\Eloquent\Builder|Order whereAddress($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Order whereAddress2($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Order whereCity($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Order whereCode($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Order whereCountry($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Order whereInfluencerEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Order whereUserId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Order whereZip($value)
 * @property string|null $transaction_id
 * @method static \Illuminate\Database\Eloquent\Builder|Order whereTransactionId($value)
 * @property-read mixed $admin_total
 * @property-read mixed $influencer_total
 */
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
            return ($item->admin_revenue*$item->quantity);
        });
    }
    public function getInfluencerTotalAttribute()
    {
        return $this->orderItems->sum(function(OrderItem $item){
            return ($item->influencer*$item->quantity);
        });
    }
    public function getNameAttribute()
    {
        return $this->first_name." ".$this->last_name;
    }
}
