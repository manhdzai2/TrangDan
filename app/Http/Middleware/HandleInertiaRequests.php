<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $locale = app()->getLocale();
        $translations = file_exists(base_path("lang/{$locale}.json")) 
            ? json_decode(file_get_contents(base_path("lang/{$locale}.json")), true) 
            : [];

        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user(),
            ],
            'locale' => $locale,
            'translations' => $translations,
            'company' => \App\Models\CompanyInfo::first(),
            'unreadApplicationsCount' => $request->user() && $request->user()->isAdmin() 
                ? \App\Models\Application::where('is_read', false)->count() 
                : 0,
            'flash' => [
                'success' => $request->session()->get('success'),
                'error' => $request->session()->get('error'),
                'ai_result' => $request->session()->get('ai_result'),
            ],
        ];
    }
}
