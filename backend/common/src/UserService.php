<?php


namespace Microservice;

class UserService {

  private $endpoint = "http://192.168.22.138:8001/api";

  public function __construct()
  {
    $this->endpoint = env('USERS_ENDPOINT');
    
  }


  public function headers(){
    return [
      'Authorization' => request()->headers->get('Authorization')
      // 'Authorization' =>  "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIzIiwianRpIjoiNzIzN2M2NDU0MTFjYTIyMjBjYmMxMGIyNDM1NGRhYTVlYmIyOGRkOTIzZWVlZDMxNTY0NmRlYzhlMzc0YjgxZjI5OWZhNGU5YzhiOWQzNjAiLCJpYXQiOjE2NTg1MTc5MzkuODE0NDA5LCJuYmYiOjE2NTg1MTc5MzkuODE0NDE2LCJleHAiOjE2OTAwNTM5MzkuODA4MzIzLCJzdWIiOiIxMCIsInNjb3BlcyI6WyJhZG1pbiJdfQ.p4JMnzheedOarJcgJZeql0HYpwf2hvpgI-H7D44JuJncIeUYjUmuc0uUiuUPxrXz2y4KCzsbb3hzk2_K3FVH1wLUDhGJdHNYB8dsEvZWhjGkiMxIlVxE50ocLk7wIz3MzpGDixKWgp-OaiAt-UUYnejOhiXBkGokoV9uXdAeD0mq5TCXtxzg3XaXM_ZCuqIsoKlONaHfOifdS8XUZXv4UjMVRcN9_3NKRavUlDsNH8gjK7BL-HcDNKiCOtxXWLlC4MM34KuFOd_gGQBGBVfkaSX1_7DMOCoyZNZwwIGfANGsw5msKCQ6phwagMofWcOgR0u8kL6FBHPYGGkpayiMYvj6jqxSLocoDFyCJbcQuWXE9QyxHrUHEW0ClII49BgstpSQQSNe5V80qQzvOymFR9qgiE33OdfxQKhkWItPPMw2f78YY-GzDl7YrwnP5loIopknmYVTxQX-2RfEUyEml0FYr16qk1K6cyavqQlM4Bd0M-wFXAypzQWpTFXm5QbJUjMj0AeWS_an2L43FPfYxK4T08BviSG3X92N-PFyC-AV12ZB0dX-4RRgj6esTMnF7Zag9UrWL7xyMiiXQJaWlToJ8s5VDcaXd1qik5AdrL5iKWUo5T1aoKxDDWN9-lpssM290X-SYXHaoJdOE5TJy0aogGwE9tv4OKSvlIMkJww"
    ];
  }


  public function getUser(){
    // $response = \Http::withHeaders($this->headers())->get(`{$this->endpoint}/user`);
    $json = \Http::withHeaders($this->headers())->get("{$this->endpoint}/user")->json();
    return new User($json);
  }


  public function isAdmin()
  {
    return \Http::withHeaders($this->headers())->get("{$this->endpoint}/admin")->successful();
  }

  public function isInfluencer()
  {
    return \Http::withHeaders($this->headers())->get("{$this->endpoint}/influencer")->successful();
  }

  public function request()
  {
    return \Http::withHeaders($this->headers());
  }


  public function allows($action, $model)
  {    
    return 1;
    // return \Gate::forUser($this->getUser())->authorize($action,$model);
  }

  public function all($page)
  {
    return $this->request()->get("{$this->endpoint}/users?page={$page}")->json();
  }

  public function find($id)
  {
    return new User($this->request()->get("{$this->endpoint}/users/{$id}")->json());
  }

  public function create($data)
  {
    return new User($this->request()->post("{$this->endpoint}/users",$data)->json());
  }

  public function update($id,$data)
  {
    return new User($this->request()->put("{$this->endpoint}/users/{$id}",$data)->json());
  }

  public function delete($id)
  {
    return $this->request()->delete("{$this->endpoint}/users/{$id}")->successful();
  }



}
