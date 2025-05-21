<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta 
            name="viewport"
            content="width = device-width, initial-scale = 1.0"
        >
        <title>User Favorite Category List</title>
    </head>
    <body>
        <h1>User Favorite Category List</h1>
        <!-- Create -->
        <a href="{{ route('user_favorite_categories.create') }}">Add New Data</a>
        <table border="1">
            <thead>
                <tr>
                    <th>Category ID: </th>
                    <th>Category Name: </th>
                    <th>User Preference ID: </th>
                    <th>User Preference Name: </th>
                </tr>
            </thead>
            <tbody>
                @foreach ($userFavoriteCategory as $item)
                <tr>
                    <td>{{ $item->category_id }}</td>
                    <td>{{ $item->Category->name }}</td>
                    <td>{{ $item->user_preference_id }}</td>
                    <td>{{ $item->userPreference->user->name }}</td>
                    <td>
                        <a href="{{ route('user_favorite_categories.edit', $item->id) }}">Edit</a>
                        <form action="
                                {{ route('user_favorite_categories.destroy', $item->id) }}"
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