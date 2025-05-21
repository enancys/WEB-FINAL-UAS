<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta 
            name="viewport"
            content="width = device-width, initial-scale = 1.0"
        >
        <title>User List</title>
    </head>
    <body>
        <h1>User List</h1>
        <!-- Create -->
        <a href="{{ route('user_preferences.create') }}">Add New Data</a>
        <table border="1">
            <thead>
                <tr>
                    <th>User ID: </th>
                    <th>User Name: </th>
                </tr>
            </thead>
            <tbody>
                @foreach ($userPreference as $item)
                <tr>
                    <td>{{ $item->id }}</td>
                    <td>{{ $item->user->name }}</td>
                    <td>
                        <a href="{{ route('user_preferences.edit', $item->id) }}">Edit</a>
                        <form action="
                                {{ route('user_preferences.destroy', $item->id) }}"
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