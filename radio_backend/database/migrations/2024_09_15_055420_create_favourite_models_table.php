<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('favourites', function (Blueprint $table) {
            $table->id('fw_id');
            $table->integer('fw_radio')->nullable();
            $table->integer('fw_user')->nullable();
            $table->softDeletes();
            $table->timestamp('fw_created_at')->nullable();
            $table->timestamp('fw_updated_at')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('favourites');
    }
};
