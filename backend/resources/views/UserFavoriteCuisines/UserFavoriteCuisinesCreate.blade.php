<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta 
            name="viewport"
            content="width=device-width, initial-scale=1.0"
        >
        <title>Add New User Favorite Cuisine</title>
    </head>
    <body>
        <h1>Add New User Favorite Cuisine</h1>
        <form 
            action="{{ route('user_favorite_cuisines.store') }}" 
            method="POST">
            @csrf
            <div>
                <label for="cuisine_id">Cuisine ID: </label>
                <input 
                    type="cuisine_id" 
                    id="cuisine_id" 
                    name="cuisine_id">
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