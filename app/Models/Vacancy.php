<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Vacancy extends Model
{
    protected $fillable = ['title', 'highlight', 'description', 'recruitment_process', 'requirements', 'benefits', 'location', 'salary', 'type', 'is_active', 'user_id', 'factory', 'level', 'kpi_target'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function applications()
    {
        return $this->hasMany(Application::class);
    }
}
