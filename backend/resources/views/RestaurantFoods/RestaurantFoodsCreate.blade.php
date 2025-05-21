<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta 
            name="viewport"
            content="width=device-width, initial-scale=1.0"
        >
        <title>Add New Restaurant Foods</title>
    </head>
    <body>
        <h1>Add New Restaurant Fodos</h1>
        <form 
            action="{{ route('category_foods.store') }}" 
            method="POST">
            @csrf
            <div>
                <label for="food_id">Food ID: </label>
                <input 
                    type="food_id" 
                    id="food_id" 
                    name="food_id">
            </div>
            <div>
                <label for="restaurant_id">Restaurant ID: </label>
                <input 
                    type="restaurant_id" 
                    id="restaurant_id" 
                    name="restaurant_id">
            </div>
            <div>
                <button type="submit">Add</button>
            </div>
        </form>
    </body>
</html>