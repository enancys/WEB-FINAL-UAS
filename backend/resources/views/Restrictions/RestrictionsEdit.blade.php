<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Edit Restriction</title>
</head>
<body>
    <h1>Edit Restriction</h1>
    <form 
        action="{{ route('restrictions.update', $restriction->id) }}"
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
            value="{{ $restriction->name }}">
    </div>
    <div>
        <button type="submit">Update</button>
    </div>
    </form>
</body>
</html>