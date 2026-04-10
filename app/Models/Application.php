<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Application extends Model
{
    protected $fillable = ['vacancy_id', 'name', 'email', 'cv_path', 'source', 'status'];

    public function vacancy()
    {
        return $this->belongsTo(Vacancy::class);
    }
}
