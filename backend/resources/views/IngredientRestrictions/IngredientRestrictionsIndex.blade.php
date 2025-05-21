<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta 
            name="viewport"
            content="width = device-width, initial-scale = 1.0"
        >
        <title>Ingredients Restriction List</title>
    </head>
    <body>
        <h1>Ingredients Restriction List</h1>
        <!-- Create -->
        <a href="{{ route('ingredient_restrictions.create') }}">Add New Data</a>
        <table border="1">
            <thead>
                <tr>
                    <th>Restriction ID: </th>
                    <th>Restriction Name: </th>
                    <th>Ingredient ID: </th>
                    <th>Ingredient Name: </th>
                </tr>
            </thead>
            <tbody>
                @foreach ($ingredientRestriction as $item)
                <tr>
                    <td>{{ $item->ingredient_id }}</td>
                    <td>{{ $item->ingredient->name }}</td>
                    <td>{{ $item->restriction_id }}</td>
                    <td>{{ $item->restriction->name }}</td>
                    <td>
                        <a href="{{ route('ingredient_restrictions.edit', $item->id) }}">Edit</a>
                        <form action="
                                {{ route('ingredient_restrictions.destroy', $item->id) }}"
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