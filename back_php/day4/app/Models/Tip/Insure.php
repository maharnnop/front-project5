<?php

namespace App\Models\Tip;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Insure extends Model
{
    use HasFactory;
    public $timestamps = true;

    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'tip_insure';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'descript',
        'premium',
        'period_day',
        'return_alive',
        'return_dead',
        'return_disability',
    ];// allow column for saved to database
}
