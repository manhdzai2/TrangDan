<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Setting extends Model
{
    protected $fillable = ['key', 'value', 'group'];

    /**
     * Get a setting value by key.
     */
    public static function get($key, $default = null)
    {
        $setting = self::where('key', $key)->first();
        if (!$setting) return $default;
        
        // Handle boolean-like values or JSON if needed
        $value = $setting->value;
        if ($value === 'true') return true;
        if ($value === 'false') return false;
        
        return $value;
    }

    /**
     * Set a setting value by key.
     */
    public static function set($key, $value, $group = 'general')
    {
        // Convert boolean to string for storage
        if (is_bool($value)) {
            $value = $value ? 'true' : 'false';
        }

        return self::updateOrCreate(
            ['key' => $key],
            ['value' => $value, 'group' => $group]
        );
    }
}
