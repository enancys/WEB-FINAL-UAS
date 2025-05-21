<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\UserDietaryResctriction;
use Illuminate\Http\Request;

class UserDietaryRestrictionController extends Controller
{
        public function index() {
        $userDietaryRestriction = UserDietaryResctriction::all();
        return view('UserDietaryRestrictions.UserDietaryRestrictionsIndex', compact('userDietaryRestriction'));
    }

    public function create() {
        return view('UserDietaryRestrictions.UserDietaryRestrictionsCreate');
    }

    public function store(Request $request) {
        $request->validate([
            'user_preference_id' => 'required|integer|exists:user_preferences,id',
            'restriction_id' => 'required|integer|exists:restrictions,id'
        ]);
        $userDietaryRestriction = UserDietaryResctriction::create([
            'user_preference_id' => $request->user_preference_id,
            'restriction_id' => $request->restriction_id
        ]);
        return redirect('user_dietary_restrictions')->with('success', 'User Dietary Restriction Berhasil Dibuat');
    }

    public function edit($id) {
        $userDietaryRestriction = UserDietaryResctriction::findOrFail($id);
        return view('UserDietaryRestrictions.UserDietaryRestrictionsEdit', compact('userDietaryRestriction'));
    }

    public function update(Request $request, $id) {
        $request->validate([
            'user_preference_id' => 'required|integer|exists:user_preferences,id',
            'restriction_id' => 'required|integer|exists:restrictions,id'
        ]);
        $userDietaryRestriction = UserDietaryResctriction::findOrFail($id);
        $userDietaryRestriction->update([
            'user_preference_id' => $request->user_preference_id,
            'restriction_id' => $request->restriction_id
        ]);
        return redirect('user_dietary_restrictions')->with('success', 'User Dietary Restriction Berhasil Diperbarui');
    }

    public function destroy($id) {
        $userDietaryRestriction = UserDietaryResctriction::findOrFail($id);
        $userDietaryRestriction->delete();
        redirect('user_dietary_restrictions')->with('success', 'User Dietary Restriction Berhasil Dihapus');
    }
}
