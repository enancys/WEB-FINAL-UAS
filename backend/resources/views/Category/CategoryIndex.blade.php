<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta 
            name="viewport"
            content="width = device-width, initial-scale = 1.0"
        >
        <title>Category List</title>
    </head>
    <body>
        <h1>Category List</h1>
        <!-- Create -->
        <a href="{{ route('categories.create') }}">Add New Data</a>
        <table border="1">
            <thead>
                <tr>
                    <th>Name: </th>
                </tr>
            </thead>
            <tbody>
                @foreach ($category as $cat)
                <tr>
                    <td>{{ $cat->name }}</td>
                    <td>
                        <a href="{{ route('categories.edit', $cat->id) }}">Edit</a>
                        <form action="
                                {{ route('categories.destroy', $cat->id) }}"
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