<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Country;
use App\Http\Resources\CountryResource;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Storage;

class CountryController extends Controller
{
    /**
     * Display a listing of countries.
     * @param Request $request
     * @return AnonymousResourceCollection
     */
    public function index(Request $request): AnonymousResourceCollection
    {
        $validated = $request->validate([
            'per_page' => 'required|integer|min:1',
            'page' => 'required|integer|min:1',
            'search' => 'nullable|string'
        ]);

        $perPage = $validated['per_page'] ?? 10;
        $search = $validated['search'] ?? '';

        $query = Country::query();

        if ($search) {
            $query->where('name', 'ilike', '%' . $search . '%');
        }

        $countries = $query->paginate($perPage);

        return CountryResource::collection($countries);
    }
}