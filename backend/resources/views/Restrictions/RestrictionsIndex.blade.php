<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta 
            name="viewport"
            content="width = device-width, initial-scale = 1.0"
        >
        <title>Restriction List</title>
    </head>
    <body>
        <h1>Restriction List</h1>
        <!-- Create -->
        <a href="{{ route('restrictions.create') }}">Add New Data</a>
        <table border="1">
            <thead>
                <tr>
                    <th>Name: </th>
                </tr>
            </thead>
            <tbody>
                @foreach ($restriction as $item)
                <tr>
                    <td>{{ $item->name }}</td>
                    <td>
                        <a href="{{ route('restrictions.edit', $item->id) }}">Edit</a>
                        <form action="
                                {{ route('restrictions.destroy', $item->id) }}"
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