<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Application extends Model
{
    protected $fillable = ['vacancy_id', 'user_id', 'name', 'email', 'phone', 'address', 'age', 'applied_position', 'start_date', 'cv_path', 'cover_letter', 'source', 'status', 'is_read', 'ai_analysis'];
    protected $casts = [
        'is_read' => 'boolean',
        'ai_analysis' => 'array',
    ];

    public function vacancy()
    {
        return $this->belongsTo(Vacancy::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
