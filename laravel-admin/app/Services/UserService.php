<?php

use App\User;

namespace App\Services;

use App\User;

class UserService {

  private $endpoint = "http://192.168.22.138:8001/api";

  public function headers(){
    return [
      'Authorization' => request()->headers->get('Authorization')
    ];
  }


  public function getUser(){
    // $response = \Http::withHeaders($this->headers())->get(`{$this->endpoint}/user`);
    $json = \Http::withHeaders($this->headers())->get("{$this->endpoint}/user")->json();
    
    $user = new User();
    $user->id           = $json['id'];
    $user->first_name   = $json['first_name'];
    $user->last_name    = $json['last_name'];
    $user->email        = $json['email'];
    $user->is_fluencer  = $json['is_fluencer'];
    
    return $user;

  }


  public function isAdmin()
  {
    return \Http::withHeaders($this->headers())->get("{$this->endpoint}/admin")->successful();
  }

  public function isInfluencer()
  {
    return \Http::withHeaders($this->headers())->get("{$this->endpoint}/influencer")->successful();
  }


  public function allows($action, $model)
  {
    return \Gate::forUser($this->getUser())->authorize($action,$model);
  }

  public function all($page)
  {
    // return "Yes it is clicked";
    // return \Http::withHeaders($this->headers())->get("{$this->endpoint}/users?page={$page}")->json();
  }


}
