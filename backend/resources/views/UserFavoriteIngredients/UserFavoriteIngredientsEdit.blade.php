<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Edit User Favorite Ingredient</title>
</head>
<body>
    <h1>Edit User Favorite Ingredient</h1>
    <form 
        action="{{ route('user_favorite_ingredients.update', $userFavoriteIngredient->id) }}"
        method="POST"
    >
    @csrf
    @method('PUT')
    <div>
        <label for="name">Ingredient ID: </label>
        <input 
            type="text"
            id="ingredient_id"
            name="ingredient_id"
            value="{{ $userFavoriteIngredient->ingredient_id }}">
    </div>
    <div>
        <label for="name">Ingredient Name: </label>
        <input 
            type="text"
            id="ingredient_name"
            name="ingredient_name"
            value="{{ $userFavoriteIngredient->ingredient->name }}"
            readonly>
    </div>
    <div>
        <label for="name">User Preference ID: </label>
        <input 
            type="text"
            id="user_preference_id"
            name="user_preference_id"
            value="{{ $userFavoriteIngredient->user_preference_id }}">
    </div>
    <div>
        <label for="name">User Preference Name: </label>
        <input 
            type="text"
            id="user_preference_name"
            name="user_preference_name"
            value="{{ $userFavoriteIngredient->userPreference->user->name }}"
            readonly>
    </div>

    <div>
        <button type="submit">Update</button>
    </div>
    </form>
</body>
</html>