<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta 
            name="viewport"
            content="width=device-width, initial-scale=1.0"
        >
        <title>Add New Food Tag</title>
    </head>
    <body>
        <h1>Add New Food Tag</h1>
        <form 
            action="{{ route('food_tags.store') }}" 
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
                <label for="tag_id">Tag ID: </label>
                <input 
                    type="tag_id" 
                    id="tag_id" 
                    name="tag_id">
            </div>
            <div>
                <button type="submit">Add</button>
            </div>
        </form>
    </body>
</html>