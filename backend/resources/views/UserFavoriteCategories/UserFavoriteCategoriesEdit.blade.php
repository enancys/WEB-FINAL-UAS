<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Edit User Favorite Category</title>
</head>
<body>
    <h1>Edit User Favorite Category</h1>
    <form 
        action="{{ route('user_favorite_categories.update', $userFavoriteCategory->id) }}"
        method="POST"
    >
    @csrf
    @method('PUT')
    <div>
        <label for="name">Category ID: </label>
        <input 
            type="text"
            id="category_id"
            name="category_id"
            value="{{ $userFavoriteCategory->category_id }}">
    </div>
    <div>
        <label for="name">Category Name: </label>
        <input 
            type="text"
            id="category_name"
            name="category_name"
            value="{{ $userFavoriteCategory->category->name }}"
            readonly>
    </div>
    <div>
        <label for="name">User Preference ID: </label>
        <input 
            type="text"
            id="user_preference_id"
            name="user_preference_id"
            value="{{ $userFavoriteCategory->user_preference_id }}">
    </div>
    <div>
        <label for="name">User Preference Name: </label>
        <input 
            type="text"
            id="user_preference_name"
            name="user_preference_name"
            value="{{ $userFavoriteCategory->userPreference->user->name }}"
            readonly>
    </div>

    <div>
        <button type="submit">Update</button>
    </div>
    </form>
</body>
</html>