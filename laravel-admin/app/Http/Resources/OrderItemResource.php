<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class OrderItemResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id'            =>          $this->id,
            'product_title' =>          $this->title,
            'price'         => (float)  $this->price,
            'qty'           => (int)    $this->quantity
        ];
    }
}
