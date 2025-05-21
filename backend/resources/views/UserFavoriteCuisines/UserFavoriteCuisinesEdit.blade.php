<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Edit User Favorite Cuisine</title>
</head>
<body>
    <h1>Edit User Favorite Cuisine</h1>
    <form 
        action="{{ route('user_favorite_cuisines.update', $userFavoriteCuisine->id) }}"
        method="POST"
    >
    @csrf
    @method('PUT')
    <div>
        <label for="name">Cuisine ID: </label>
        <input 
            type="text"
            id="cuisine_id"
            name="cuisine_id"
            value="{{ $userFavoriteCuisine->cuisine_id }}">
    </div>
    <div>
        <label for="name">Cuisine Name: </label>
        <input 
            type="text"
            id="cuisine_name"
            name="cuisine_name"
            value="{{ $userFavoriteCuisine->cuisine->name }}"
            readonly>
    </div>
    <div>
        <label for="name">User Preference ID: </label>
        <input 
            type="text"
            id="user_preference_id"
            name="user_preference_id"
            value="{{ $userFavoriteCuisine->user_preference_id }}">
    </div>
    <div>
        <label for="name">User Preference Name: </label>
        <input 
            type="text"
            id="user_preference_name"
            name="user_preference_name"
            value="{{ $userFavoriteCuisine->userPreference->user->name }}"
            readonly>
    </div>

    <div>
        <button type="submit">Update</button>
    </div>
    </form>
</body>
</html>