<?php

namespace App\Http\Controllers\api\home;

use App\Http\Controllers\api\BaseController;
use App\Http\Controllers\Controller;
use App\Models\FavouriteModel;
use App\Models\RadioCategoryModel;
use App\Models\RadioModel;
use App\Models\User;
use Illuminate\Http\Request;

class indexController extends BaseController
{
    public function index(Request $request)
    {
        $client = $request->user();

        try {
            $radio_categories = RadioCategoryModel::all();
            $radios = RadioModel::get()->map(function ($item) use ($client) {
                $item['isFavourite'] = FavouriteModel::where([
                    ["fw_radio", "=", $item->rd_id],
                    ["fw_user", "=", $client->id]
                ])->count();

                return $item;
            });

            return parent::succes("Bilgiler getirildi", [
                "radio_categories" => $radio_categories,
                "radios" => $radios
            ]);
        } catch (\Exception $e) {
            return parent::error("Bilgiler getirilirken hata oluştu", [], 500);
        }
    }

    public function set_favourite(Request $request)
    {
        $client = $request->user();
        $data = $request->except("_token");

        try {
            $control = FavouriteModel::where([
                ["fw_user", "=", $client->id],
                ["fw_radio", "=", $data['fw_radio']],
            ])->first();

            if ($control) {
                FavouriteModel::where([
                    ["fw_user", "=", $client->id],
                    ["fw_radio", "=", $data['fw_radio']],
                ])->delete();
            } else {
                FavouriteModel::create([
                    "fw_user" => $client->id,
                    "fw_radio" => $data['fw_radio']
                ]);
            }
        } catch (\Exception $e) {
            return parent::error("Favori işleminde hata oluştu", [], 500);
        }
    }
}
