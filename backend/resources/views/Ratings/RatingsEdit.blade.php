<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Edit Rating</title>
</head>
<body>
    <h1>Edit Rating</h1>
    <form 
        action="{{ route('ratings.update', $rating->id) }}"
        method="POST"
    >
    @csrf
    @method('PUT')
    <div>
        <label for="user_id">User ID: </label>
        <input 
            type="text"
            id="user_id"
            name="user_id"
            value="{{ $rating->user_id }}">
    </div>
    <div>
    <div>
        <label for="user_name">User Name: </label>
        <input 
            type="text"
            id="user_name"
            name="user_name"
            value="{{ $rating->user->name }}">
    </div>
    <div>
        <label for="food_id">Food ID: </label>
        <input 
            type="text"
            id="food_id"
            name="food_id"
            value="{{ $rating->food_id }}">
    </div>
    <div>
        <label for="food_name">Food Name: </label>
        <input 
            type="text"
            id="food_name"
            name="food_name"
            value="{{ $rating->food->name }}">
    </div>
    <div>
        <label for="restaurant_id">Restaurant ID: </label>
        <input 
            type="text"
            id="restaurant_id"
            name="restaurant_id"
            value="{{ $rating->restaurant_id }}">
    </div>
    <div>
        <label for="restaurant_name">Restaurant Name: </label>
        <input 
            type="text"
            id="restaurant_name"
            name="restaurant_name"
            value="{{ $rating->restaurant_name }}">
    </div>
    <div>
        <label for="rating">Rating: </label>
        <input 
            type="text"
            id="rating"
            name="rating"
            value="{{ $rating->rating }}">
    </div>
    <div>
        <label for="review">Review: </label>
        <input 
            type="text"
            id="review"
            name="review"
            value="{{ $rating->review }}">
    </div>
    <div>
        <label for="image_url">Image URL: </label>
        <input 
            type="text"
            id="image_url"
            name="image_url"
            value="{{ $rating->image_url }}">
    </div>
    <div>
        <button type="submit">Update</button>
    </div>
    </form>
</body>
</html>