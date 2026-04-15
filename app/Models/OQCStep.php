<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OQCStep extends Model
{
    use HasFactory;

    protected $table = 'oqc_steps';

    protected $fillable = ['title', 'description', 'icon', 'order'];
}
