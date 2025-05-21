<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta 
            name="viewport"
            content="width = device-width, initial-scale = 1.0"
        >
        <title>User Dietary Restriction List</title>
    </head>
    <body>
        <h1>Ingredients Dietary Restriction List</h1>
        <!-- Create -->
        <a href="{{ route('user_dietary_restrictions.create') }}">Add New Data</a>
        <table border="1">
            <thead>
                <tr>
                    <th>Restriction ID: </th>
                    <th>Restriction Name: </th>
                    <th>User Preference ID: </th>
                    <th>User Preference Name: </th>
                </tr>
            </thead>
            <tbody>
                @foreach ($userDietaryRestriction as $item)
                <tr>
                    <td>{{ $item->restriction_id }}</td>
                    <td>{{ $item->restriction->name }}</td>
                    <td>{{ $item->user_preference_id }}</td>
                    <td>{{ $item->userPreference->user->name }}</td>
                    <td>
                        <a href="{{ route('user_dietary_restrictions.edit', $item->id) }}">Edit</a>
                        <form action="
                                {{ route('user_dietary_restrictions.destroy', $item->id) }}"
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