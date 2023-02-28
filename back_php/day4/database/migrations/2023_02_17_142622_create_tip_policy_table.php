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
        Schema::create('tip_policy', function (Blueprint $table) {
            $table->id();
            $table->integer('insure_id');
            $table->integer('user_id')->nullable();
            $table->integer('agent_id')->nullable();
            $table->string('title');
            $table->string('first_name');
            $table->string('last_name');
            $table->string('id_card');
            $table->string('location1')->nullable();
            $table->string('location2')->nullable();
            $table->string('location3')->nullable();
            $table->string('location4')->nullable();
            $table->string('location5')->nullable();
            $table->string('location6')->nullable();
            $table->string('email');
            $table->date('birth_date')->nullable();
            $table->date('cover_date');
            $table->date('end_date');
            $table->integer('premium');
            $table->string('benify_first_name')->nullable();
            $table->string('benify_last_name')->nullable();
            $table->string('benify_relation')->nullable();

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
        Schema::dropIfExists('tip_policy');
    }
};
