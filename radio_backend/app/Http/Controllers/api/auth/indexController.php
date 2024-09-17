<?php

namespace App\Http\Controllers\api\auth;

use App\Http\Controllers\api\BaseController;
use App\Http\Controllers\Controller;
use App\Http\Requests\api\auth\LoginRequest;
use App\Http\Requests\api\auth\RegisterRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class indexController extends BaseController
{
    public function login(LoginRequest $request)
    {
        $data = $request->except("_token");

        $client = User::where("email",$data['email'])->first();

        if ($client && Hash::check($data['password'],$client->password)){
            $token = $client->createToken('radio')->accessToken;

            return parent::succes("Kullanıcı girişi gerçekleştirildi",[
                "id" => $client->id,
                "name" => $client->name,
                "email" => $client->email,
                "url" => $client->url,
                "channel" => $client->channel,
                "token_type" => "Bearer",
                "access_token" => $token
            ]);
        }else{
            return parent::error("Kullanıcı bilgileri hatalı",[],401);
        }
    }

    public function register(RegisterRequest $request)
    {
        $data = $request->except("_token","password_confirmation");
        $data['password'] = Hash::make($data['password']);

        $create = User::create($data);

        if ($create){
            return parent::succes("Kullanıcı kayıt işlemi başarılı. Bilgilerinizle giriş yapabilirsiniz",[$create],201);
        }else{
            return parent::error("Kullanıcı kayıt işleminde hata oluştu");
        }
    }

    public function profile(Request $request)
    {
        $client = $request->user();

        return parent::succes("Kullanıcı bilgileri getirildi",[
            "user" => $client
        ]);
    }

    public function update(Request $request)
    {
        $client = $request->user();
        $data = $request->except("_token");

        $update = User::where("id",$client->id)->update([
            "url" => $data['url'],
            "channel" => $data['channel'],
        ]);

        if ($update){
            $token = $client->createToken("radio")->accessToken;

            return response()->json([
                "success" => true,
                "title" => "Başarılı",
                "message" => "İşlem başarılı",
                "isLoggedIn" => true,
                "data" => [
                    "id" => $client->id,
                    "name" => $client->name,
                    "email" => $client->email,
                    "url" => $data['url'],
                    "channel" => $data['channel'],
                    "token_type" => "Bearer",
                    "access_token" => $token
                ]
            ]);
        }else{
            return response()->json([
                "success" => false,
                "title" => "Hata",
                "message" => "İşlem Başarısız"
            ]);
        }
    }

    public function update_profile(Request $request)
    {
        $client = $request->user();
        $data = $request->except("_token","password_confirmation");

        if ($data["email"]!==$client->email){
            $count = User::where("email",$data["email"])->first();

            if ($count){
                return parent::error("Aynı E-Mail Adresine Ait Kullanıcı Var",[],422);
            }
        }

        $update = User::where("id",$client->id)->update([
            "name" => $data['name'],
            "email" => $data['email'],
            "password" => ($data['password']=="") ? $client->password :  Hash::make($data["password"])
        ]);

        if ($update){
            $token = $client->createToken("radio")->accessToken;

            return response()->json([
                "success" => true,
                "title" => "Başarılı",
                "message" => "İşlem başarılı. Yeni bilgilerinizle giriş yapabilirsiniz",
                "isLoggedIn" => true,
                "data" => [
                    "id" => $client->id,
                    "name" => $client->name,
                    "email" => $client->email,
                    "token_type" => "Bearer",
                    "access_token" => $token
                ]
            ]);
        }else{
            return response()->json([
                "success" => false,
                "title" => "Hata",
                "message" => "İşlem Başarısız"
            ]);
        }
    }

    public function check(Request $request)
    {
        $client = $request->user();

        if ($client){
            $token = $client->createToken("radio")->accessToken;

            return response()->json([
                "success" => true,
                "isLoggedIn" => true,
                "data" => [
                    "id" => $client->id,
                    "name" => $client->name,
                    "email" => $client->email,
                    "url" => $client->url,
                    "channel" => $client->channel,
                    "token_type" => "Bearer",
                    "access_token" => $token
                ]
            ]);
        }else{
            return response()->json([
                "success" => false,
                "isLoggedIn" => false
            ]);
        }
    }

    public function logout(Request $request)
    {
        $client = $request->user();
        $token = $client->token();
        $token->revoke();

        return parent::succes("Kullanıcı çıkış işlemi başarılı");
    }
}
