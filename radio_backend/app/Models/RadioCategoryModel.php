<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class RadioCategoryModel extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $table = "radio_categories";
    protected $primaryKey = "rc_id";
    protected $guarded = [];

    public const CREATED_AT = "rc_created_at";
    public const UPDATED_AT = "rc_updated_at";
}
