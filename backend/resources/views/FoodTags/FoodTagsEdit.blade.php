<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Edit Food Tag</title>
</head>
<body>
    <h1>Edit Food Tag</h1>
    <form 
        action="{{ route('food_tags.update', $foodTag->id) }}"
        method="POST"
    >
    @csrf
    @method('PUT')
    <div>
        <label for="name">Food ID: </label>
        <input 
            type="text"
            id="food_id"
            name="food_id"
            value="{{ $foodTag->food_id }}">
    </div>
    <div>
        <label for="name">Food Name: </label>
        <input 
            type="text"
            id="food_name"
            name="food_name"
            value="{{ $foodTag->food->name }}"
            readonly>
    </div>
    <div>
        <label for="name">Tag ID: </label>
        <input 
            type="text"
            id="tag_id"
            name="tag_id"
            value="{{ $foodTag->tag_id }}">
    </div>
    <div>
        <label for="name">Tag Name: </label>
        <input 
            type="text"
            id="tag_name"
            name="tag_name"
            value="{{ $foodTag->tag->name }}"
            readonly>
    </div>

    <div>
        <button type="submit">Update</button>
    </div>
    </form>
</body>
</html>