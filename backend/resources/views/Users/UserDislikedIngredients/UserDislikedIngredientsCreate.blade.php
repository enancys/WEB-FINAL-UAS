<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta 
            name="viewport"
            content="width=device-width, initial-scale=1.0"
        >
        <title>Add New User Disliked Ingredient</title>
    </head>
    <body>
        <h1>Add New User Disliked Ingredient</h1>
        <form 
            action="{{ route('user_disliked_ingredients.store') }}" 
            method="POST">
            @csrf
            <div>
                <label for="ingredient_id">Ingredient ID: </label>
                <input 
                    type="ingredient_id" 
                    id="ingredient_id" 
                    name="ingredient_id">
            </div>
            <div>
                <label for="user_preference_id">User Preference ID: </label>
                <input 
                    type="user_preference_id" 
                    id="user_preference_id" 
                    name="user_preference_id">
            </div>
            <div>
                <button type="submit">Add</button>
            </div>
        </form>
    </body>
</html>