<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta 
            name="viewport"
            content="width = device-width, initial-scale = 1.0"
        >
        <title>User Disliked Ingredient List</title>
    </head>
    <body>
        <h1>User Disliked Ingredient List</h1>
        <!-- Create -->
        <a href="{{ route('user_disliked_ingredients.create') }}">Add New Data</a>
        <table border="1">
            <thead>
                <tr>
                    <th>Ingredient ID: </th>
                    <th>Ingredient Name: </th>
                    <th>User Preference ID: </th>
                    <th>User Preference Name: </th>
                </tr>
            </thead>
            <tbody>
                @foreach ($userDislikedIngredient as $item)
                <tr>
                    <td>{{ $item->ingredient_id }}</td>
                    <td>{{ $item->ingredient->name }}</td>
                    <td>{{ $item->user_preference_id }}</td>
                    <td>{{ $item->userPreference->user->name }}</td>
                    <td>
                        <a href="{{ route('user_disliked_ingredients.edit', $item->id) }}">Edit</a>
                        <form action="
                                {{ route('user_disliked_ingredients.destroy', $item->id) }}"
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