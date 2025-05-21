<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Edit Category</title>
</head>
<body>
    <h1>Edit Category</h1>
    <form 
        action="{{ route('categories.update', $category->id) }}"
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
            value="{{ $category->name }}">
    </div>
    <div>
        <button type="submit">Update</button>
    </div>
    </form>
</body>
</html>