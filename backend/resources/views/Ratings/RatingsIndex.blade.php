<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta 
            name="viewport"
            content="width = device-width, initial-scale = 1.0"
        >
        <title>Rating List</title>
    </head>
    <body>
        <h1>Rating List</h1>
        <!-- Create -->
        <a href="{{ route('ratings.create') }}">Add New Data</a>
        <table border="1">
            <thead>
                <tr>
                    <th>User ID: </th>
                    <th>Food ID: </th>
                    <th>Restaurant ID: </th>
                    <th>Rating: </th>
                    <th>Review: </th>
                    <th>Image URL: </th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                @foreach ($rating as $item)
                <tr>
                    <td>{{ $item->user_id }}</td>
                    <td>{{ $item->food_id }}</td>
                    <td>{{ $item->restaurant_id }}</td>
                    <td>{{ $item->rating }}</td>
                    <td>{{ $item->review }}</td>
                    <td>{{ $item->image_url }}</td>
                    <td>
                        <a href="{{ route('ratings.edit', $item->id) }}">Edit</a>
                        <form action="
                                {{ route('ratings.destroy', $item->id) }}"
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