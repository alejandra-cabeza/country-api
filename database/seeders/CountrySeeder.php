<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\File;
use App\Models\Country;

class CountrySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $countriesJson = File::get('database/json/country.json');
        $countriesCollection = collect(json_decode($countriesJson, true));

        $countriesCollection->each(function ($country) {
            Country::insert([
                "name" => $country['name'],
                "code" => $country['code']
            ]);
        });
    }
}
