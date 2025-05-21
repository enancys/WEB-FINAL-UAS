<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta 
            name="viewport"
            content="width = device-width, initial-scale = 1.0"
        >
        <title>Category Foods List</title>
    </head>
    <body>
        <h1>Category Foods List</h1>
        <!-- Create -->
        <a href="{{ route('category_foods.create') }}">Add New Data</a>
        <table border="1">
            <thead>
                <tr>
                    <th>Food ID: </th>
                    <th>Food Name: </th>
                    <th>Category ID: </th>
                    <th>Category Name: </th>
                </tr>
            </thead>
            <tbody>
                @foreach ($categoryFoods as $catFoods)
                <tr>
                    <td>{{ $catFoods->food_id }}</td>
                    <td>{{ $catFoods->food->name }}</td>
                    <td>{{ $catFoods->category_id }}</td>
                    <td>{{ $catFoods->category->name }}</td>
                    <td>
                        <a href="{{ route('category_foods.edit', $catFoods->id) }}">Edit</a>
                        <form action="
                                {{ route('category_foods.destroy', $catFoods->id) }}"
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