<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\Restriction;
use Illuminate\Http\Request;

class RestrictionController extends Controller
{
    public function index() {
        $restriction = Restriction::all();
        return view('Restrictions.RestrictionsIndex', compact('restriction'));
    }

    public function create() {
        return view('Restrictions.RestrictionsCreate');
    }

    public function store(Request $request) {
        $request->validate([
            'name' => 'required|string',
        ]);

        $restriction = Restriction::create([
            'name' => $request->name,
        ]);

        return redirect('restrictions')->with('success', 'Restriction berhasil ditambahkan');
    }

    public function edit($id) {
        $restriction = Restriction::findOrFail($id);
        return view('Restrictions.RestrictionsEdit', compact('restriction'));
    }

    public function update(Request $request, $id) {
        $request->validate([
            'name' => 'required|string',
        ]);
        $restriction = Restriction::findOrFail($id);
        $restriction->update([
            'name' => $request->name,
        ]);
        return redirect('restrictions')->with('success', 'Restriction berhasil diperbarui');
    }
    public function destroy($id) {
        $restriction = Restriction::findOrFail($id);
        $restriction->delete();

        return redirect('restrictions')->with('success', 'Restriction berhasil dihapus'); 
    }
}
