<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta 
            name="viewport"
            content="width=device-width, initial-scale=1.0"
        >
        <title>Add New User Preference Restriction</title>
    </head>
    <body>
        <h1>Add New User Preference Restriction</h1>
        <form 
            action="{{ route('user_dietary_restrictions.store') }}" 
            method="POST">
            @csrf
            <div>
                <label for="restriction_id">Restriction ID: </label>
                <input 
                    type="restriction_id" 
                    id="restriction_id" 
                    name="restriction_id">
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