<?php

namespace App\Http\Controllers\Checkout;

use App\Http\Resources\LinkResource;
use App\Link;
use Illuminate\Http\Request;

class LinkController
{
    public function index()
    {
        return "Test";
    }

    public function show($code)
    {
        $link = Link::where("code",$code)->first();

        return $link;
        // return new LinkResource($link);
    }
}
