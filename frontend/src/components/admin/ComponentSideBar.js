import React from "react";
import { NavLink } from "react-router-dom";

function ComponentSideBar() {
  return (
    <ul
      className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
      id="accordionSidebar"
    >
      {/* Sidebar - Brand */}
      <a
        className="sidebar-brand d-flex align-items-center justify-content-center"
        href="/#"
      >
        <div className="sidebar-brand-text mx-3">React Admin</div>
      </a>

      {/* Dashboard Link */}
      <li className="nav-item">
        <NavLink to="/" className="nav-link">
          <i className="fas fa-fw fa-tachometer-alt"></i>
          <span>Dashboard</span>
        </NavLink>
      </li>

      {/* Master Menu */}
      <li className="nav-item">
        <a
          className="nav-link collapsed"
          href="/#"
          data-toggle="collapse"
          data-target="#masterSection"
          aria-expanded="true"
          aria-controls="masterSection"
        >
          <i className="fas fa-fw fa-cog"></i>
          <span>Master</span>
        </a>
        <div
          id="masterSection"
          className="collapse"
          aria-labelledby="headingTwo"
          data-parent="#accordionSidebar"
        >
          <div className="bg-white py-2 collapse-inner rounded">
            <NavLink to="/admin/user" className="collapse-item">User</NavLink>
            <NavLink to="/admin/categories" className="collapse-item">Categories</NavLink>
            <NavLink to="/admin/cuisines" className="collapse-item">Cuisines</NavLink>
            <NavLink to="/admin/foods" className="collapse-item">Foods</NavLink>
            <NavLink to="/admin/restaurants" className="collapse-item">Restaurants</NavLink>
            <NavLink to="/admin/ingredients" className="collapse-item">Ingredients</NavLink>
            <NavLink to="/admin/food_ingredients" className="collapse-item">Food ingredients</NavLink>
            <NavLink to="/admin/restaurant_foods" className="collapse-item">Retaurant Foods</NavLink>
            <NavLink to="/admin/ratings" className="collapse-item">Ratings</NavLink>
            <NavLink to="/admin/food_tags" className="collapse-item">Food Tags</NavLink>
            <NavLink to="/admin/tags" className="collapse-item">Tags</NavLink>
            <NavLink to="/admin/restrictions" className="collapse-item">Restrictions</NavLink>
            <NavLink to="/admin/user_preferences" className="collapse-item">User Preferences</NavLink>
            <NavLink to="/admin/user_favorite_categories" className="collapse-item">Favorite Category</NavLink>
            <NavLink to="/admin/user_favorite_ingredients" className="collapse-item">User Favorite Ingredients</NavLink>
            <NavLink to="/admin/user_dietary_restrictions" className="collapse-item">User Dietary Restrictions</NavLink>
            <NavLink to="/admin/user_disliked_ingredients" className="collapse-item">User Disliked Ingredients</NavLink>
            <NavLink to="/admin/user_favorite_cuisines" className="collapse-item">User Favorite Cuisines</NavLink>
          </div>
        </div>
      </li>
    </ul>
  );
}

export default ComponentSideBar;
