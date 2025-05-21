<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta 
            name="viewport"
            content="width = device-width, initial-scale = 1.0"
        >
        <title>Food List</title>
    </head>
    <body>
        <h1>Food List</h1>
        <!-- Create -->
        <a href="{{ route('foods.create') }}">Add New Data</a>
        <table border="1">
            <thead>
                <tr>
                    <th>Name: </th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                @foreach ($food as $item)
                <tr>
                    <td>{{ $item->name }}</td>
                    <td>
                        <a href="{{ route('foods.edit', $item->id) }}">Edit</a>
                        <form action="
                                {{ route('foods.destroy', $item->id) }}"
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