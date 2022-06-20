<?php

namespace App\Http\Controllers\Influencer;

use App\Http\Resources\LinkResource;
use App\Link;
use App\LinkProduct;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class LinkController
{
    public function store(Request $request)
    {
        $link = Link::create([
            'user_id' => $request->user()->id,
            'code'  =>  Str::random(8),
        ]);

        foreach($request->input('products') as $product_id)
        {
            LinkProduct::create([
                'link_id'   =>  $link->id,
                'product_id'    =>  $product_id
            ]);
        }

        return new LinkResource($link);
    }
}
