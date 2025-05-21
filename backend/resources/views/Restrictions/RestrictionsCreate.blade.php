<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta 
            name="viewport"
            content="width=device-width, initial-scale=1.0"
        >
        <title>Add New Restriction</title>
    </head>
    <body>
        <h1>Add New Restriction</h1>
        <form 
            action="{{ route('restrictions.store') }}" 
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