<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta 
            name="viewport"
            content="width = device-width, initial-scale = 1.0"
        >
        <title>Cuisine Foods List</title>
    </head>
    <body>
        <h1>Cuisine Foods List</h1>
        <!-- Create -->
        <a href="{{ route('cuisine_foods.create') }}">Add New Data</a>
        <table border="1">
            <thead>
                <tr>
                    <th>Food ID: </th>
                    <th>Food Name: </th>
                    <th>Cuisine ID: </th>
                    <th>Cuisine Name: </th>
                </tr>
            </thead>
            <tbody>
                @foreach ($cuisineFood as $cuiFoods)
                <tr>
                    <td>{{ $cuiFoods->food_id }}</td>
                    <td>{{ $cuiFoods->food->name }}</td>
                    <td>{{ $cuiFoods->cuisine_id }}</td>
                    <td>{{ $cuiFoods->cuisine->name }}</td>
                    <td>
                        <a href="{{ route('cuisine_foods.edit', $cuiFoods->id) }}">Edit</a>
                        <form action="
                                {{ route('cuisine_foods.destroy', $cuiFoods->id) }}"
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