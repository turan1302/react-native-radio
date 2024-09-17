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
        Schema::create('radios', function (Blueprint $table) {
            $table->id('rd_id');
            $table->string('rd_name')->nullable();
            $table->string('rd_link')->nullable();
            $table->string('rd_category')->nullable();
            $table->softDeletes();
            $table->timestamp('rd_created_at')->nullable();
            $table->timestamp('rd_updated_at')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('radios');
    }
};
