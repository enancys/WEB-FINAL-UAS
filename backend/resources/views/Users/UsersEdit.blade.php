<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Edit User</title>
</head>
<body>
    <h1>Edit User</h1>
    <form 
        action="{{ route('users.update', $user->id) }}"
        method="POST"
    >
    @csrf
    @method('PUT')
    <div>
        <label for="name">Name: </label>
        <input 
            type="text"
            id="name"
            name="name"
            value="{{ $user->name }}">
    </div>
    <div>
        <label for="email">Email: </label>
        <input 
            type="text"
            id="email"
            name="email"
            value="{{ $user->email }}">
    </div>
    <div>
        <label for="role">Role: </label>
        <input 
            type="text"
            id="role"
            name="role"
            value="{{ $user->role }}">
    </div>
    <div>
        <label for="password">Password: </label>
        <input 
            type="text"
            id="password"
            name="password"
            value="{{ $user->password }}">
    </div>
    <div>
        <button type="submit">Update</button>
    </div>
    </form>
</body>
</html>