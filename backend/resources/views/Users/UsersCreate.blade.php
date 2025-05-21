<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta 
            name="viewport"
            content="width=device-width, initial-scale=1.0"
        >
        <title>Add New User</title>
    </head>
    <body>
        <h1>Add New User</h1>
        <form 
            action="{{ route('users.store') }}" 
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
                <label for="email">Email: </label>
                <input 
                    type="email" 
                    id="email" 
                    name="email">
            </div>
            <div>
                <label for="role">Role: </label>
                <input 
                    type="role" 
                    id="role" 
                    name="role">
            </div>
            <div>
                <label for="password">Password: </label>
                <input 
                    type="password" 
                    id="password" 
                    name="password">
            </div>
            <div>
                <button type="submit">Add</button>
            </div>
        </form>
    </body>
</html>