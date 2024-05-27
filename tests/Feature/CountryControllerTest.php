<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\Country;

class CountryControllerTest extends TestCase
{
    use RefreshDatabase;

    public function test_index_returns_successful_response()
    {
        $response = $this->getJson('/api/countries?page=1&per_page=10&search');

        $response->assertStatus(200);
    }

    public function test_index_returns_paginated_list_of_countries()
    {
        Country::factory()->count(50)->create();

        $response = $this->getJson('/api/countries?page=1&per_page=10');

        $response->assertJsonStructure([
            'data' => [
                '*' => ['id', 'name', 'code']
            ],
            'links' => ['first', 'last', 'prev', 'next'],
            'meta' => ['current_page', 'last_page', 'from', 'to', 'path', 'per_page', 'total']
        ]);
    }

    public function test_index_correctly_filters_countries()
    {
        Country::factory()->create(['name' => 'Canada']);
        Country::factory()->create(['name' => 'USA']);

        $response = $this->getJson('/api/countries?page=1&per_page=10&search=Canada');

        $response->assertJsonCount(1, 'data');
        $response->assertJsonFragment(['name' => 'Canada']);
    }

    public function test_index_respects_per_page_parameter()
    {
        Country::factory()->count(50)->create();

        $response = $this->getJson('/api/countries?page=1&per_page=5');

        $response->assertJsonCount(5, 'data');
    }

    public function test_index_returns_empty_result_when_no_countries_match()
    {
        Country::factory()->create(['name' => 'Canada']);
        Country::factory()->create(['name' => 'USA']);

        $response = $this->getJson('/api/countries?page=1&per_page=10&search=cjckxkdjjksjsd');

        $response->assertJsonCount(0, 'data');
    }

    public function test_index_returns_422_when_per_page_is_not_positive_integer()
    {
        $response = $this->getJson('/api/countries?page=1&per_page=0');
    
        $response->assertStatus(422);
        $response->assertJsonValidationErrors('per_page');
    }
}