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
        Schema::create('radio_categories', function (Blueprint $table) {
            $table->id('rc_id');
            $table->string('rc_name')->nullable();
            $table->string('rc_slug')->nullable();
            $table->softDeletes();
            $table->timestamp('rc_created_at')->nullable();
            $table->timestamp('rc_updated_at')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('radio_categories');
    }
};
