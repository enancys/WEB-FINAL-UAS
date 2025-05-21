<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta 
            name="viewport"
            content="width=device-width, initial-scale=1.0"
        >
        <title>Add New Ingredient Restriction</title>
    </head>
    <body>
        <h1>Add New Ingredient Restriction</h1>
        <form 
            action="{{ route('ingredient_restrictions.store') }}" 
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
                <label for="ingredient_id">Ingredient ID: </label>
                <input 
                    type="ingredient_id" 
                    id="ingredient_id" 
                    name="ingredient_id">
            </div>
            <div>
                <button type="submit">Add</button>
            </div>
        </form>
    </body>
</html>