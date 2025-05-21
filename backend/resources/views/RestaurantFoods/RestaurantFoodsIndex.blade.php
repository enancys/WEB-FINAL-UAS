<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta 
            name="viewport"
            content="width = device-width, initial-scale = 1.0"
        >
        <title>Restaurant Foods List</title>
    </head>
    <body>
        <h1>Restaurant Foods List</h1>
        <!-- Create -->
        <a href="{{ route('restaurant_foods.create') }}">Add New Data</a>
        <table border="1">
            <thead>
                <tr>
                    <th>Food ID: </th>
                    <th>Food Name: </th>
                    <th>Restaurant ID: </th>
                    <th>Restaurant Name: </th>
                </tr>
            </thead>
            <tbody>
                @foreach ($restaurantFood as $item)
                <tr>
                    <td>{{ $item->food_id }}</td>
                    <td>{{ $item->food->name }}</td>
                    <td>{{ $item->restaurant_id }}</td>
                    <td>{{ $item->restaurant->name }}</td>
                    <td>
                        <a href="{{ route('restaurant_foods.edit', $item->id) }}">Edit</a>
                        <form action="
                                {{ route('restaurant_foods.destroy', $item->id) }}"
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