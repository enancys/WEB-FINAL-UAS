<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta 
            name="viewport"
            content="width=device-width, initial-scale=1.0"
        >
        <title>Add New Category Foods</title>
    </head>
    <body>
        <h1>Add New Category Fodos</h1>
        <form 
            action="{{ route('category_foods.store') }}" 
            method="POST">
            @csrf
            <div>
                <label for="food_id">Food ID: </label>
                <input 
                    type="food_id" 
                    id="food_id" 
                    name="food_id">
            </div>
            <div>
                <label for="category_id">Category ID: </label>
                <input 
                    type="category_id" 
                    id="category_id" 
                    name="category_id">
            </div>
            <div>
                <button type="submit">Add</button>
            </div>
        </form>
    </body>
</html>