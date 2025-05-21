<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Edit Restaurant</title>
</head>
<body>
    <h1>Edit Restaurant</h1>
    <form 
        action="{{ route('restaurants.update', $restaurant->id) }}"
        method="POST"
    >
    @csrf
    @method('PUT')
    <div>
        <label for="name">Name: </label>
        <input 
            type="text"
            id="name"
            name="name"
            value="{{ $restaurant->name }}">
    </div>
    <div>
    <div>
        <label for="location">Location: </label>
        <input 
            type="text"
            id="location"
            name="location"
            value="{{ $restaurant->location }}">
    </div>
    <div>
        <label for="phone">Phone: </label>
        <input 
            type="text"
            id="phone"
            name="phone"
            value="{{ $restaurant->phone }}">
    </div>
    <div>
        <label for="website_url">Website URL: </label>
        <input 
            type="text"
            id="website_url"
            name="website_url"
            value="{{ $restaurant->website_url }}">
    </div>
    <div>
        <label for="opening_hours">Opening Hours: </label>
        <input 
            type="text"
            id="opening_hours"
            name="opening_hours"
            value="{{ $restaurant->opening_hours }}">
    </div>
    <div>
        <label for="cuisine_id">Cuisine ID: </label>
        <input 
            type="text"
            id="cuisine_id"
            name="cuisine_id"
            value="{{ $restaurant->cuisine_id }}">
    </div>
    <div>
        <label for="cuisine_name">Cuisine Name: </label>
        <input 
            type="text"
            id="cuisine_name"
            name="cuisine_name"
            value="{{ $restaurant->cuisine->name }}">
    </div>
    <div>
        <label for="rating">Rating: </label>
        <input 
            type="text"
            id="rating"
            name="rating"
            value="{{ $restaurant->rating }}">
    </div>
    <div>
        <label for="description">Description: </label>
        <input 
            type="text"
            id="description"
            name="description"
            value="{{ $restaurant->description }}">
    </div>
    <div>
        <label for="image_url">Image URL: </label>
        <input 
            type="text"
            id="image_url"
            name="image_url"
            value="{{ $restaurant->image_url }}">
    </div>
    <div>
        <button type="submit">Update</button>
    </div>
    </form>
</body>
</html>