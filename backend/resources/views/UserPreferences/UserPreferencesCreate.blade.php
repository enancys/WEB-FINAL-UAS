<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta 
            name="viewport"
            content="width=device-width, initial-scale=1.0"
        >
        <title>Add New User Preference</title>
    </head>
    <body>
        <h1>Add New User Preference</h1>
        <form 
            action="{{ route('user_preferences.store') }}" 
            method="POST">
            @csrf
            <div>
                <label for="user_id">User ID: </label>
                <input 
                    type="user_id" 
                    id="user_id" 
                    name="user_id">
            </div>
            <div>
                <button type="submit">Add</button>
            </div>
        </form>
    </body>
</html>