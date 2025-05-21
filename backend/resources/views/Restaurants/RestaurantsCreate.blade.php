<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta 
            name="viewport"
            content="width=device-width, initial-scale=1.0"
        >
        <title>Add New Restaurant</title>
    </head>
    <body>
        <h1>Add New Restaurant</h1>
        <form 
            action="{{ route('restaurants.store') }}" 
            method="POST">
            @csrf
    <div>
        <label for="name">Name: </label>
        <input 
            type="text"
            id="name"
            name="name">
    </div>
    <div>
        <label for="location">Location: </label>
        <input 
            type="text"
            id="location"
            name="location">
    </div>
    <div>
        <label for="phone">Phone: </label>
        <input 
            type="text"
            id="phone"
            name="phone">
    </div>
    <div>
        <label for="website_url">Website URL: </label>
        <input 
            type="text"
            id="website_url"
            name="website_url">
    </div>
    <div>
        <label for="opening_hours">Opening Hours: </label>
        <input 
            type="text"
            id="opening_hours"
            name="opening_hours">
    </div>
    <div>
        <label for="cuisine_id">Cuisine ID: </label>
        <input 
            type="text"
            id="cuisine_id"
            name="cuisine_id">
    </div>
    <div>
        <label for="cuisine_name">Cuisine Name: </label>
        <input 
            type="text"
            id="cuisine_name"
            name="cuisine_name">
    </div>
    <div>
        <label for="rating">Rating: </label>
        <input 
            type="text"
            id="rating"
            name="rating">
    </div>
    <div>
        <label for="description">Description: </label>
        <input 
            type="text"
            id="description"
            name="description">
    </div>
    <div>
        <label for="image_url">Image URL: </label>
        <input 
            type="text"
            id="image_url"
            name="image_url">
    </div>
            <div>
                <button type="submit">Add</button>
            </div>
        </form>
    </body>
</html>