<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta 
            name="viewport"
            content="width=device-width, initial-scale=1.0"
        >
        <title>Add New Rating</title>
    </head>
    <body>
        <h1>Add New Rating</h1>
        <form 
            action="{{ route('ratings.store') }}" 
            method="POST">
            @csrf
                <div>
        <label for="user_id">User ID: </label>
        <input 
            type="text"
            id="user_id"
            name="user_id">
    </div>
    <div>
        <label for="food_id">Food ID: </label>
        <input 
            type="text"
            id="food_id"
            name="food_id">
    </div>
    <div>
        <label for="restaurant_id">Restaurant ID: </label>
        <input 
            type="text"
            id="restaurant_id"
            name="restaurant_id">
    </div>
    <div>
        <label for="rating">Rating: </label>
        <input 
            type="text"
            id="rating"
            name="rating">
    </div>
    <div>
        <label for="review">Review: </label>
        <input 
            type="text"
            id="review"
            name="review">
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