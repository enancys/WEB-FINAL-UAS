<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Edit User Preference</title>
</head>
<body>
    <h1>Edit User Preference</h1>
    <form 
        action="{{ route('user_preferences.update', $userPreference->id) }}"
        method="POST"
    >
    @csrf
    @method('PUT')
    <div>
        <label for="user_id">User ID: </label>
        <input 
            type="text"
            id="user_id"
            name="user_id"
            value="{{ $userPreference->user_id }}">
    </div>
    <div>
        <label for="user_name">User Name: </label>
        <input 
            type="text"
            id="user_name"
            name="user_name"
            value="{{ $userPreference->user->name }}">
    </div>
    <div>
        <button type="submit">Update</button>
    </div>
    </form>
</body>
</html>