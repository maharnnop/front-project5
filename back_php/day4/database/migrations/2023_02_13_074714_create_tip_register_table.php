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
        Schema::create('tip_register', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('first_name');
            $table->string('last_name');
            $table->string('id_card')->unique();
            $table->string('username')->unique();
            $table->string('password');
            $table->string('email');
            $table->string('phone_number')->nullable();
            $table->string('location1')->nullable();
            $table->string('location2')->nullable();
            $table->string('location3')->nullable();
            $table->string('location4')->nullable();
            $table->string('location5')->nullable();
            $table->string('location6')->nullable();
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
        Schema::dropIfExists('tip_register');
    }
};
