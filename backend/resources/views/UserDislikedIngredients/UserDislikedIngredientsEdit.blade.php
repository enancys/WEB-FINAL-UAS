<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Edit User Disliked Ingredient</title>
</head>
<body>
    <h1>Edit User Disliked Ingredient</h1>
    <form 
        action="{{ route('user_disliked_ingredients.update', $userDislikedIngredient->id) }}"
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
            value="{{ $userDislikedIngredient->ingredient_id }}">
    </div>
    <div>
        <label for="name">Ingredient Name: </label>
        <input 
            type="text"
            id="ingredient_name"
            name="ingredient_name"
            value="{{ $userDislikedIngredient->ingredient->name }}"
            readonly>
    </div>
    <div>
        <label for="name">User Preference ID: </label>
        <input 
            type="text"
            id="user_preference_id"
            name="user_preference_id"
            value="{{ $userDislikedIngredient->user_preference_id }}">
    </div>
    <div>
        <label for="name">User Preference Name: </label>
        <input 
            type="text"
            id="user_preference_name"
            name="user_preference_name"
            value="{{ $userDislikedIngredient->userPreference->user->name }}"
            readonly>
    </div>

    <div>
        <button type="submit">Update</button>
    </div>
    </form>
</body>
</html>