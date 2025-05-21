<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta 
            name="viewport"
            content="width=device-width, initial-scale=1.0"
        >
        <title>Add New Food Ingredient</title>
    </head>
    <body>
        <h1>Add New Food Ingredient</h1>
        <form 
            action="{{ route('food_ingredients.store') }}" 
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
                <label for="ingredient_id">Ingredient ID: </label>
                <input 
                    type="ingredient_id" 
                    id="ingredient_id" 
                    name="ingredient_id">
            </div>
            <div>
                <button type="submit">Add</button>
            </div>
        </form>
    </body>
</html>