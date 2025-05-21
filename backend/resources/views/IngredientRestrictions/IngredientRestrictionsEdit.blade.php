<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Edit Ingredient Restriction</title>
</head>
<body>
    <h1>Edit Ingredient Restriction</h1>
    <form 
        action="{{ route('ingredient_restrictions.update', $ingredientRestriction->id) }}"
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
            value="{{ $ingredientRestriction->restriction_id }}">
    </div>
    <div>
        <label for="name">Restriction Name: </label>
        <input 
            type="text"
            id="restriction_name"
            name="restriction_name"
            value="{{ $ingredientRestriction->restriction->name }}"
            readonly>
    </div>
    <div>
        <label for="name">Ingredient ID: </label>
        <input 
            type="text"
            id="ingredient_id"
            name="ingredient_id"
            value="{{ $ingredientRestriction->ingredient_id }}">
    </div>
    <div>
        <label for="name">Ingredient Name: </label>
        <input 
            type="text"
            id="ingredient_name"
            name="ingredient_name"
            value="{{ $ingredientRestriction->ingredient->name }}"
            readonly>
    </div>

    <div>
        <button type="submit">Update</button>
    </div>
    </form>
</body>
</html>