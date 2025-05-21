<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta 
            name="viewport"
            content="width = device-width, initial-scale = 1.0"
        >
        <title>Food Ingredients List</title>
    </head>
    <body>
        <h1>Food Ingredients List</h1>
        <!-- Create -->
        <a href="{{ route('food_ingredients.create') }}">Add New Data</a>
        <table border="1">
            <thead>
                <tr>
                    <th>Food ID: </th>
                    <th>Food Name: </th>
                    <th>Ingredient ID: </th>
                    <th>Ingredient Name: </th>
                </tr>
            </thead>
            <tbody>
                @foreach ($foodIngredient as $item)
                <tr>
                    <td>{{ $item->food_id }}</td>
                    <td>{{ $item->food->name }}</td>
                    <td>{{ $item->ingredient_id }}</td>
                    <td>{{ $item->ingredient->name }}</td>
                    <td>
                        <a href="{{ route('food_ingredients.edit', $item->id) }}">Edit</a>
                        <form action="
                                {{ route('food_ingredients.destroy', $item->id) }}"
                                method="POST" 
                                style="display: inline;">
                                @csrf
                                @method('DELETE')
                                <button type="submit">Delete</button>
                        </form>
                    </td>
                </tr>
                @endforeach
            </tbody>
        </table>
    </body>
</html>