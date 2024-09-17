<?php

namespace App\Http\Controllers\api\radio;

use App\Http\Controllers\api\BaseController;
use App\Http\Controllers\Controller;
use App\Http\Requests\api\radio\CreateRadioRequest;
use App\Models\FavouriteModel;
use App\Models\RadioCategoryModel;
use App\Models\RadioModel;
use Illuminate\Http\Request;

class indexController extends BaseController
{
    public function categories(Request $request)
    {
        $client = $request->user();

        try {
            $categories = RadioCategoryModel::all();
            return parent::succes("Kategoriler Getirildi",$categories);
        }catch (\Exception $e){
            return parent::error("Kategoriler getirilirken hata oluştu");
        }
    }

    public function set_radio(CreateRadioRequest $request)
    {
        $client = $request->user();
        $data = $request->except("_token");

        try {
            $create = RadioModel::create($data);
            return parent::succes("Radyo Ekleme İşlemi Başarılı",[],201);
        }catch (\Exception $e){
            return parent::error("Radyo eklenirken hata oluştu");
        }
    }

    public function remove_radio(Request $request)
    {
        $client = $request->user();
        $data = $request->except("_token");

        try {
            $remove_radio = RadioModel::where("rd_id",$data["rd_id"])->delete();
            $remove_favourite = FavouriteModel::where([
                ["fw_radio","=",$data["rd_id"]],
                ["fw_user","=",$client->id],
            ])->delete();

            return parent::succes("Radyo silindi",[]);
        }catch (\Exception $e){
            return parent::error("Radyo Silinirken Bir Hata Oluştu");
        }
    }
}
