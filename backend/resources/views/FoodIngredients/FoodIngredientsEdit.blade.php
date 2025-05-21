<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Edit Food Ingredient</title>
</head>
<body>
    <h1>Edit Food Ingredient</h1>
    <form 
        action="{{ route('food_ingredients.update', $foodIngredient->id) }}"
        method="POST"
    >
    @csrf
    @method('PUT')
    <div>
        <label for="name">Food ID: </label>
        <input 
            type="text"
            id="food_id"
            name="food_id"
            value="{{ $foodIngredient->food_id }}">
    </div>
    <div>
        <label for="name">Food Name: </label>
        <input 
            type="text"
            id="food_name"
            name="food_name"
            value="{{ $foodIngredient->food->name }}"
            readonly>
    </div>
    <div>
        <label for="name">Ingredient ID: </label>
        <input 
            type="text"
            id="ingredient_id"
            name="ingredient_id"
            value="{{ $foodIngredient->ingredient_id }}">
    </div>
    <div>
        <label for="name">Ingredient Name: </label>
        <input 
            type="text"
            id="ingredient_name"
            name="ingredient_name"
            value="{{ $foodIngredient->ingredient->name }}"
            readonly>
    </div>

    <div>
        <button type="submit">Update</button>
    </div>
    </form>
</body>
</html>