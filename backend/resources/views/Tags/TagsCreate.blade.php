<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta 
            name="viewport"
            content="width=device-width, initial-scale=1.0"
        >
        <title>Add New Tag</title>
    </head>
    <body>
        <h1>Add New Tag</h1>
        <form 
            action="{{ route('tags.store') }}" 
            method="POST">
            @csrf
            <div>
                <label for="name">Name: </label>
                <input 
                    type="name" 
                    id="name" 
                    name="name">
            </div>
            <div>
                <button type="submit">Add</button>
            </div>
        </form>
    </body>
</html>