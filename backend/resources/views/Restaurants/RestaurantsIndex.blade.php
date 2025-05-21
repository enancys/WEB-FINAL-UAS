<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta 
            name="viewport"
            content="width = device-width, initial-scale = 1.0"
        >
        <title>Restaurant List</title>
    </head>
    <body>
        <h1>Restaurant List</h1>
        <!-- Create -->
        <a href="{{ route('restaurants.create') }}">Add New Data</a>
        <table border="1">
            <thead>
                <tr>
                    <th>Name: </th>
                    <th>Location: </th>
                    <th>Phone: </th>
                    <th>Website URL: </th>
                    <th>Opening Hour: </th>
                    <th>Cuisine ID: </th>
                    <th>Cuisine Name: </th>
                    <th>Rating: </th>
                    <th>Description: </th>
                    <th>Image URL: </th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                @foreach ($restaurant as $item)
                <tr>
                    <td>{{ $item->name }}</td>
                    <td>{{ $item->location }}</td>
                    <td>{{ $item->phone }}</td>
                    <td>{{ $item->website_url }}</td>
                    <td>{{ $item->opening_hours }}</td>
                    <td>{{ $item->cuisine_id }}</td>
                    <td>{{ $item->cuisine->name }}</td>
                    <td>{{ $item->rating }}</td>
                    <td>{{ $item->description }}</td>
                    <td>{{ $item->image_url }}</td>
                    <td>
                        <a href="{{ route('restaurants.edit', $item->id) }}">Edit</a>
                        <form action="
                                {{ route('restaurants.destroy', $item->id) }}"
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