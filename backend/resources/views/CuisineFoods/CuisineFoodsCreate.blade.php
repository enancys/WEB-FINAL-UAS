<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta 
            name="viewport"
            content="width=device-width, initial-scale=1.0"
        >
        <title>Add New Cuisine Foods</title>
    </head>
    <body>
        <h1>Add New Cuisine Fodos</h1>
        <form 
            action="{{ route('cuisine_foods.store') }}" 
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
                <label for="cuisine_id">Cuisine ID: </label>
                <input 
                    type="cuisine_id" 
                    id="cuisine_id" 
                    name="cuisine_id">
            </div>
            <div>
                <button type="submit">Add</button>
            </div>
        </form>
    </body>
</html>