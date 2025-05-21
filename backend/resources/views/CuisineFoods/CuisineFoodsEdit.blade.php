<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Edit Cuisine Foods</title>
</head>
<body>
    <h1>Edit Cuisine Foods</h1>
    <form 
        action="{{ route('cuisine_foods.update', $cuisineFood->id) }}"
        method="POST"
    >
    @csrf
    @method('PUT')
    <div>
        <label for="name">Food ID: </label>
        <input 
            type="text"
            id="food_id"
            name="food_id"
            value="{{ $cuisineFood->food_id }}">
    </div>
    <div>
        <label for="name">Food Name: </label>
        <input 
            type="text"
            id="food_name"
            name="food_name"
            value="{{ $cuisineFood->food->name }}"
            readonly>
    </div>
    <div>
        <label for="name">Cuisine ID: </label>
        <input 
            type="text"
            id="cuisine_id"
            name="cuisine_id"
            value="{{ $cuisineFood->cuisine_id }}">
    </div>
    <div>
        <label for="name">Cuisine Name: </label>
        <input 
            type="text"
            id="cuisine_name"
            name="cuisine_name"
            value="{{ $cuisineFood->cuisine->name }}"
            readonly>
    </div>

    <div>
        <button type="submit">Update</button>
    </div>
    </form>
</body>
</html>