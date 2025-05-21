<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Edit Food</title>
</head>
<body>
    <h1>Edit Food</h1>
    <form 
        action="{{ route('cuisines.update', $food->id) }}"
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
            value="{{ $food->name }}">
    </div>
    <div>
        <button type="submit">Update</button>
    </div>
    </form>
</body>
</html>