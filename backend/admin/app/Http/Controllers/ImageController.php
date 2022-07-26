<?php

namespace App\Http\Controllers;

use App\Http\Requests\ImageUploadRequest;
use Illuminate\Support\Str;
use Storage;
use Symfony\Component\HttpFoundation\Response;

class ImageController
{
    public function upload(ImageUploadRequest $request)
    {

        if (!$request->has('image'))
            return response()->json(['message' => 'Please upload the Image...'], Response::HTTP_NOT_FOUND);

        $file = $request->file('image');
        $name =  Str::random(10); // Random String name
        $filename = $name . "." . $file->extension();
        $url = Storage::putFileAs("images", $file, $filename);

        $image_url = env('IMAGE_HOST') . "/" . $url;
        return ["url" => $image_url];
    }
}
