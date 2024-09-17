<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class RadioModel extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $table = "radios";
    protected $primaryKey = "rd_id";
    protected $guarded = [];

    public const CREATED_AT = "rd_created_at";
    public const UPDATED_AT = "rd_updated_at";
}
