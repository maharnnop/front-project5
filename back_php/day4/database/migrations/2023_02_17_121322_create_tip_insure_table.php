<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tip_insure', function (Blueprint $table) {
            $table->id();
            $table->string('name')->unique();
            $table->string('descript')->nullable();
            $table->integer('premium');
            $table->integer('period_day');
            $table->string('return_alive')->nullable();
            $table->string('return_dead')->nullable();
            $table->string('return_disability')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tip_insure');
    }
};
