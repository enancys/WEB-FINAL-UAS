<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Edit Restaurant Foods</title>
</head>
<body>
    <h1>Edit Restaurant Foods</h1>
    <form 
        action="{{ route('restaurant_foods.update', $restaurantFood->id) }}"
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
            value="{{ $restaurantFood->food_id }}">
    </div>
    <div>
        <label for="name">Food Name: </label>
        <input 
            type="text"
            id="food_name"
            name="food_name"
            value="{{ $restaurantFood->food->name }}"
            readonly>
    </div>
    <div>
        <label for="name">Restaurant ID: </label>
        <input 
            type="text"
            id="restaurant_id"
            name="restaurant_id"
            value="{{ $restaurantFood->restaurant_id }}">
    </div>
    <div>
        <label for="name">Restaurant Name: </label>
        <input 
            type="text"
            id="restaurant_name"
            name="restaurant_name"
            value="{{ $restaurantFood->restaurant->name }}"
            readonly>
    </div>
    <div>
        <button type="submit">Update</button>
    </div>
    </form>
</body>
</html>