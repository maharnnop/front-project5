<?php

namespace App\Models\Tip;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Policy extends Model
{
    use HasFactory;
    public $timestamps = true;

    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'tip_policy';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'insure_id',
        'insure_name',
        'user_id',
        'agent_id',
        'title',
        'first_name',
        'last_name',
        'id_card',
        'email',
        'location1',
        'location2',
        'location3',
        'location4',
        'location5',
        'location6',
        'birth_date',
        'cover_date',
        'end_date',
        'premium',
        'benify_first_name',
        'benify_last_name',
        'benify_relation',
        'is_draft',
        // 'phone_number',
    ];// allow column for saved to database
}
