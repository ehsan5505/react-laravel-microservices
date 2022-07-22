<?php

use App\Models\User;

class UserService {

  private $endpoint = "http://192.168.22.138:8001/api/user";

  private function header(){
    return request()->headers()->get('Authorization');
  }


  public function getUser(){
    $response = Http::withHeaders($this->header())->get($this->endpoint);
    $json = $response->json();

    $user = new User();
    $user->id           = $json['id'];
    $user->first_name   = $json['first_name'];
    $user->last_name    = $json['last_name'];
    $user->email        = $json['email'];
    $user->is_fluencer  = $json['is_fluencer'];

    return $user;

  }


}


?>