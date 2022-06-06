<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class OrderResource extends JsonResource
{
    
    public function toArray($request)
    {
        return [
            'id'        =>  $this->id,
            'first_name'    =>  $this->first_name,
            'last_name'     =>  $this->last_name,
            'email'         =>  $this->email,
            'orders'        =>  OrderItemResource::collection($this->orderItems)
        ];
    }
}
