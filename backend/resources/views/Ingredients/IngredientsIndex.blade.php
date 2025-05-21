<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta 
            name="viewport"
            content="width = device-width, initial-scale = 1.0"
        >
        <title>Ingredient List</title>
    </head>
    <body>
        <h1>Ingredient List</h1>
        <!-- Create -->
        <a href="{{ route('ingredients.create') }}">Add New Data</a>
        <table border="1">
            <thead>
                <tr>
                    <th>Name: </th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                @foreach ($ingredient as $item)
                <tr>
                    <td>{{ $item->name }}</td>
                    <td>
                        <a href="{{ route('ingredients.edit', $item->id) }}">Edit</a>
                        <form action="
                                {{ route('ingredients.destroy', $item->id) }}"
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