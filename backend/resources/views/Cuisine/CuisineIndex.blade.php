<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta 
            name="viewport"
            content="width = device-width, initial-scale = 1.0"
        >
        <title>Cuisine List</title>
    </head>
    <body>
        <h1>Cuisine List</h1>
        <!-- Create -->
        <a href="{{ route('cuisines.create') }}">Add New Data</a>
        <table border="1">
            <thead>
                <tr>
                    <th>Name: </th>
                </tr>
            </thead>
            <tbody>
                @foreach ($cuisine as $cui)
                <tr>
                    <td>{{ $cui->name }}</td>
                    <td>
                        <a href="{{ route('cuisines.edit', $cui->id) }}">Edit</a>
                        <form action="
                                {{ route('cuisines.destroy', $cui->id) }}"
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