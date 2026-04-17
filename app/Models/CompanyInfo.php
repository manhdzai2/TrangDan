<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CompanyInfo extends Model
{
    protected $table = 'company_info';

    protected $fillable = [
        'name',
        'history',
        'general_job_description',
        'salary_range',
        'benefits',
        'mission',
        'vision',
        'address',
        'email',
        'phone',
        'logo',
        'images'
    ];

    protected $casts = [
        'images' => 'array'
    ];
}
