<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta 
            name="viewport"
            content="width = device-width, initial-scale = 1.0"
        >
        <title>User Favorite Cuisine List</title>
    </head>
    <body>
        <h1>User Favorite Cuisine List</h1>
        <!-- Create -->
        <a href="{{ route('user_favorite_cuisines.create') }}">Add New Data</a>
        <table border="1">
            <thead>
                <tr>
                    <th>Cuisine ID: </th>
                    <th>Cuisine Name: </th>
                    <th>User Preference ID: </th>
                    <th>User Preference Name: </th>
                </tr>
            </thead>
            <tbody>
                @foreach ($userFavoriteCuisine as $item)
                <tr>
                    <td>{{ $item->cuisine_id }}</td>
                    <td>{{ $item->cuisine->name }}</td>
                    <td>{{ $item->user_preference_id }}</td>
                    <td>{{ $item->userPreference->user->name }}</td>
                    <td>
                        <a href="{{ route('user_favorite_cuisines.edit', $item->id) }}">Edit</a>
                        <form action="
                                {{ route('user_favorite_cuisines.destroy', $item->id) }}"
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