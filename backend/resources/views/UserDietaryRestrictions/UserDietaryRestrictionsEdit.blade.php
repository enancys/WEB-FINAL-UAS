<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Edit User Dietary Restriction</title>
</head>
<body>
    <h1>Edit User Dietary Restriction</h1>
    <form 
        action="{{ route('user_dietary_restrictions.update', $userDietaryRestriction->id) }}"
        method="POST"
    >
    @csrf
    @method('PUT')
    <div>
        <label for="name">Restriction ID: </label>
        <input 
            type="text"
            id="restriction_id"
            name="restriction_id"
            value="{{ $userDietaryRestriction->restriction_id }}">
    </div>
    <div>
        <label for="name">Restriction Name: </label>
        <input 
            type="text"
            id="restriction_name"
            name="restriction_name"
            value="{{ $userDietaryRestriction->restriction->name }}"
            readonly>
    </div>
    <div>
        <label for="name">User Preference ID: </label>
        <input 
            type="text"
            id="user_preference_id"
            name="user_preference_id"
            value="{{ $userDietaryRestriction->user_preference_id }}">
    </div>
    <div>
        <label for="name">User Preference Name: </label>
        <input 
            type="text"
            id="user_preference_name"
            name="user_preference_name"
            value="{{ $userDietaryRestriction->userPreference->user->name }}"
            readonly>
    </div>

    <div>
        <button type="submit">Update</button>
    </div>
    </form>
</body>
</html>