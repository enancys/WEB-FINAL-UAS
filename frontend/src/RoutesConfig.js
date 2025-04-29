// import React from "react";
// import { Routes, Route } from "react-router-dom";


import Dashboard from "./pages/admin/adminDashboard.js";
import CategoriesPage from "./pages/admin/Categories/CategoriesPage.js"
import CuisinesPage from "./pages/admin/Cuisines/CuisinesPage.js"
import UserPage from "./pages/admin/User/UserPage.js"
import FoodsPage from "./pages/admin/Foods/FoodPage.js"
import FoodTagsPage from "./pages/admin/FoodTags/FoodTagsPage.js"
import RestaurantFoodsPage from "./pages/admin/RestaurantFoods/RestaurantFoodsPage.js"
import IngredientsPage from "./pages/admin/Ingredients/IngredientsPage.js";
import RatingPage from "./pages/admin/Ratings/RatingsPage.js";
import RestaurantPage from "./pages/admin/Resturants/RestaurantsPage.js";
import RestrictionsPage from "./pages/admin/Restrictions/RestrictionsPage.js"
import TagsPage from "./pages/admin/Tags/TagsPage.js"
import FoodIngredientsPage from "./pages/admin/FoodIngredients/FoodsIngredientPage.js"
import UserPreferencesPage from "./pages/admin/UserPreferences/UserPreferencesPage.js"
import UserFavoriteIngredientsPage from "./pages/admin/UserFavoriteIngredients/UserFavoriteIngredientsPage.js"
import UserDislikedIngredientsPage from "./pages/admin/UserDislikedIngredients/UserDislikedIngredientsPage.js"
import UserFavoriteCuisinesPage from "./pages/admin/UserFavoriteCuisines/UserFavoriteCuisinesPage.js"
import UserDietaryRestrictionsPage from "./pages/admin/UserDietaryRestrictions/UserDietrayRestrictionsPage.js"
import UserFavoriteCategoriesPage from "./pages/admin/UserFavoriteCategory/UserFavoriteCategoriesPage.js"



const routesConfig = [

    { path: "user", component: UserPage.UserIndex },
    { path: "user/create", component: UserPage.UserCreate },
    { path: "user/update/:id", component: UserPage.UserUpdate },

    { path: "categories", component: CategoriesPage.CategoriesIndex},
    { path: "categories/create", component: CategoriesPage.CategoriesCreate },
    { path: "categories/update/:id", component: CategoriesPage.CategoriesUpdate},

    { path: "cuisines", component: CuisinesPage.CuisinesIndex },
    { path: "cuisines/create", component: CuisinesPage.CuisinesCreate },
    { path: "cuisines/update/:id", component:  CuisinesPage.CuisinesUpdate},

    { path: "foods", component: FoodsPage.FoodsIndex },
    { path: "foods/create", component: FoodsPage.FoodsCreate },
    { path: "foods/update/:id", component:  FoodsPage.FoodsUpdate},

    { path: "ingredients", component: IngredientsPage.IngredientsIndex },
    { path: "ingredients/create", component: IngredientsPage.IngredientsCreate },
    { path: "ingredients/update/:id", component:  IngredientsPage.IngredientsUpdate},

    { path: "ratings", component: RatingPage.RatingsIndex },
    { path: "ratings/create", component: RatingPage.RatingsCreate },
    { path: "ratings/update/:id", component: RatingPage.RatingsUpdate},

    { path: "restaurants", component: RestaurantPage.RestaurantsIndex },
    { path: "restaurants/create", component: RestaurantPage.RestaurantsCreate },
    { path: "restaurants/update/:id", component:  RestaurantPage.RestaurantsUpdate},

    { path: "food_tags", component: FoodTagsPage.FoodTagsIndex},
    { path: "food_tags/create", component: FoodTagsPage.FoodTagsCreate},
    { path: "food_tags/update/:id", component: FoodTagsPage.FoodTagsUpdate},

    { path: "restaurant_foods", component: RestaurantFoodsPage.RestaurantFoodsIndex },
    { path: "restaurant_foods/create", component: RestaurantFoodsPage.RestaurantFoodsCreate },
    { path: "restaurant_foods/update/:id", component:  RestaurantFoodsPage.RestaurantFoodsUpdate},

    { path: "restrictions", component: RestrictionsPage.RestrictionsIndex},
    { path: "restrictions/create", component: RestrictionsPage.RestrictionsCreate},
    { path: "restrictions/update/:id", component: RestrictionsPage.RestrictionsUpdate},

    { path: "tags", component: TagsPage.TagsIndex},
    { path: "tags/create", component: TagsPage.TagsCreate},
    { path: "tags/update/:id", component: TagsPage.TagsUpdate},

    { path: "food_ingredients", component:  FoodIngredientsPage.FoodIngredientsIndex },
    { path: "food_ingredients/create", component: FoodIngredientsPage.FoodIngredientsCreate },
    { path: "food_ingredients/update/:id", component:  FoodIngredientsPage.FoodIngredientsUpdate },

    { path: "user_preferences", component: UserPreferencesPage.UserPreferencesIndex },
    { path: "user_preferences/create", component: UserPreferencesPage.UserPreferencesCreate },
    { path: "user_preferences/update/:id", component:  UserPreferencesPage.UserPreferencesUpdate},

    { path: "user_favorite_ingredients", component: UserFavoriteIngredientsPage.UserFavoriteIngredientsIndex},
    { path: "user_favorite_ingredients/create", component: UserFavoriteIngredientsPage.UserFavoriteIngredientsCreate },
    { path: "user_favorite_ingredients/update/:id", component: UserFavoriteIngredientsPage.UserFavoriteIngredientsUpdate},

    { path: "user_disliked_ingredients", component: UserDislikedIngredientsPage.UserDislikedIngredientsIndex},
    { path: "user_disliked_ingredients/create", component: UserDislikedIngredientsPage.UserDislikedIngredientsCreate},
    { path: "user_disliked_ingredients/update/:id", component: UserDislikedIngredientsPage.UserDislikedIngredientsUpdate},

    { path: "user_favorite_cuisines", component: UserFavoriteCuisinesPage.UserFavoriteCuisinesIndex},
    { path: "user_favorite_cuisines/create", component: UserFavoriteCuisinesPage.UserFavoriteCuisinesCreate},
    { path: "user_favorite_cuisines/update/:id", component: UserFavoriteCuisinesPage.UserFavoriteCuisinesUpdate},

    { path: "user_dietary_restrictions", component: UserDietaryRestrictionsPage.UserDietaryRestrictionsIndex},
    { path: "user_dietary_restrictions/create", component: UserDietaryRestrictionsPage.UserDietaryRestrictionsCreate},
    { path: "user_dietary_restrictions/update/:id", component: UserDietaryRestrictionsPage.UserDietaryRestrictionsUpdate},

    { path: "user_favorite_categories", component: UserFavoriteCategoriesPage.UserFavoriteCategoriesIndex},
    { path: "user_favorite_categories/create", component: UserFavoriteCategoriesPage.UserFavoriteCategoriesCreate },
    { path: "user_favorite_categories/update/:id", component: UserFavoriteCategoriesPage.UserFavoriteCategoriesUpdate},

    // ------------------------------------------------------ //


    { path: "dashboard", component: Dashboard },

];

export default routesConfig;

