<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta 
            name="viewport"
            content="width = device-width, initial-scale = 1.0"
        >
        <title>Food Tag List</title>
    </head>
    <body>
        <h1>Food Tag List</h1>
        <!-- Create -->
        <a href="{{ route('food_tags.create') }}">Add New Data</a>
        <table border="1">
            <thead>
                <tr>
                    <th>Food ID: </th>
                    <th>Food Name: </th>
                    <th>Tag ID: </th>
                    <th>Tag Name: </th>
                </tr>
            </thead>
            <tbody>
                @foreach ($foodTag as $item)
                <tr>
                    <td>{{ $item->food_id }}</td>
                    <td>{{ $item->food->name }}</td>
                    <td>{{ $item->tag_id }}</td>
                    <td>{{ $item->tag->name }}</td>
                    <td>
                        <a href="{{ route('food_tags.edit', $item->id) }}">Edit</a>
                        <form action="
                                {{ route('food_tags.destroy', $item->id) }}"
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