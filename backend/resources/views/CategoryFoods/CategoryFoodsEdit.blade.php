<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Edit Category Foods</title>
</head>
<body>
    <h1>Edit Category Foods</h1>
    <form 
        action="{{ route('category_foods.update', $categoryFoods->id) }}"
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
            value="{{ $categoryFoods->food_id }}">
    </div>
    <div>
        <label for="name">Food Name: </label>
        <input 
            type="text"
            id="food_name"
            name="food_name"
            value="{{ $categoryFoods->food->name }}"
            readonly>
    </div>
    <div>
        <label for="name">Category ID: </label>
        <input 
            type="text"
            id="category_id"
            name="category_id"
            value="{{ $categoryFoods->category_id }}">
    </div>
    <div>
        <label for="name">Category Name: </label>
        <input 
            type="text"
            id="category_name"
            name="category_name"
            value="{{ $categoryFoods->category->name }}"
            readonly>
    </div>

    <div>
        <button type="submit">Update</button>
    </div>
    </form>
</body>
</html>