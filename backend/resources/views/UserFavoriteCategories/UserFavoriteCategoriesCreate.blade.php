<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta 
            name="viewport"
            content="width=device-width, initial-scale=1.0"
        >
        <title>Add New User Favorite Category</title>
    </head>
    <body>
        <h1>Add New User Favorite Category</h1>
        <form 
            action="{{ route('user_favorite_categories.store') }}" 
            method="POST">
            @csrf
            <div>
                <label for="category_id">Category ID: </label>
                <input 
                    type="category_id" 
                    id="category_id" 
                    name="category_id">
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