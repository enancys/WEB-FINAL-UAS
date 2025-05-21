import React from "react";
import { NavLink } from "react-router-dom";

function ComponentSideBar() {

  const masterMenu = [
    {title: "User", path: "/admin/user"},
    {title: "Categories", path: "/admin/categories"},
    {title: "Cuisines", path: "/admin/cuisines"},
    {title: "Ratings", path: "/admin/ratings"},
    {title: "Tags", path: "/admin/tags"},
    {title: "Restrictions", path: "/admin/restrictions"},
  ];

  const foodManagement = [
    {title: "Ingredients", path: "/admin/ingredients"},
    {title: "Ingredients Restrictions", path: "/admin/ingredient_restrictions"},
    {title: "Cuisines Food", path: "/admin/cuisine_food"},
    {title: "Categories Foods", path: "/admin/category_food"},
    {title: "Foods", path: "/admin/foods"},
    {title: "Foods ingredients", path: "/admin/food_ingredients"},
    {title: "Food Tags", path: "/admin/food_tags"},
  ];

  const restaurantManagement = [
    {title: "Restaurants", path: "/admin/restaurants"},
    {title: "Retaurant Foods", path: "/admin/restaurant_foods"},
  ];
  
  const userPreferences = [
    {title: "User Preferences", path: "/admin/user_preferences"},
    {title: "User Favorite Category", path: "/admin/user_favorite_categories"},
    {title: "User Disliked Ingredients", path: "/admin/user_disliked_ingredients"},
    {title: "User Favorite Ingredients", path: "/admin/user_favorite_ingredients"},
    {title: "User Dietary Restrictions", path: "/admin/user_dietary_restrictions"},
    {title: "User Favorite Cuisines", path: "/admin/user_favorite_cuisines"},
  ];

  return (
    <ul
      className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
      id="accordionSidebar"
    >
      <a
        className="sidebar-brand d-flex align-items-center justify-content-center"
        href="/#"
      >
        <div className="sidebar-brand-text mx-3">Admin WannaEAT</div>
      </a>

      <li className="nav-item">
        <NavLink to="/" className="nav-link">
          <i className="fas fa-fw fa-tachometer-alt"></i>
          <span>Dashboard</span>
        </NavLink>
      </li>

      <li className="nav-item">
        <a
          className="nav-link collapsed"
          href="/#"
          data-toggle="collapse"
          data-target="#masterSection"
          aria-expanded="true"
          aria-controls="masterSection"
        >
          <i className="fas fa-database"></i>
          <span>Master Data</span>
        </a>
        <div
          id="masterSection"
          className="collapse"
          aria-labelledby="headingTwo"
          data-parent="#accordionSidebar"
        >
          <div className="bg-white py-2 collapse-inner rounded">
            {masterMenu.map((item, index) => (
              <NavLink
                key={index}
                to={item.path}
                className={({ isActive }) => 
                  "collapse-item" + (isActive ? " active" : "")
                }
              >
                {item.title}
              </NavLink>
            ))}
          </div>
        </div>
      </li>

      <li className="nav-item">
        <a
          className="nav-link collapsed"
          href="/#"
          data-toggle="collapse"
          data-target="#foodData"
          aria-expanded="true"
          aria-controls="foodData"
        >
          <i className="fas fa-hamburger"></i>
          <span>Food Data</span>
        </a>
        <div
          id="foodData"
          className="collapse"
          aria-labelledby="headingTwo"
          data-parent="#accordionSidebar"
        >
          <div className="bg-white py-2 collapse-inner rounded">
            {foodManagement.map((item, index) => (
              <NavLink
                key={index}
                to={item.path}
                className={({ isActive }) => 
                  "collapse-item" + (isActive ? " active" : "")
                }
              >
                {item.title}
              </NavLink>
            ))}
          </div>
        </div>
      </li>

      <li className="nav-item">
        <a
          className="nav-link collapsed"
          href="/#"
          data-toggle="collapse"
          data-target="#restaurantData"
          aria-expanded="true"
          aria-controls="restaurantData"
        >
          <i className="fas fa-store"></i>
          <span>Restaurant Data</span>
        </a>
        <div
          id="restaurantData"
          className="collapse"
          aria-labelledby="headingTwo"
          data-parent="#accordionSidebar"
        >
          <div className="bg-white py-2 collapse-inner rounded">
            {restaurantManagement.map((item, index) => (
              <NavLink
                key={index}
                to={item.path}
                className={({ isActive }) => 
                  "collapse-item" + (isActive ? " active" : "")
                }
              >
                {item.title}
              </NavLink>
            ))}
          </div>
        </div>
      </li>

      <li className="nav-item">
        <a
          className="nav-link collapsed"
          href="/#"
          data-toggle="collapse"
          data-target="#userPreferencesData"
          aria-expanded="true"
          aria-controls="userPreferencesData"
        >
          <i className="fas fa-sliders-h"></i>
          <span>User Preferences Data</span>
        </a>
        <div
          id="userPreferencesData"
          className="collapse"
          aria-labelledby="headingTwo"
          data-parent="#accordionSidebar"
        >
          <div className="bg-white py-2 collapse-inner rounded">
            {userPreferences.map((item, index) => (
              <NavLink
                key={index}
                to={item.path}
                className={({ isActive }) => 
                  "collapse-item" + (isActive ? " active" : "")
                }
              >
                {item.title}
              </NavLink>
            ))}
          </div>
        </div>
      </li>
    </ul>
  );
}

export default ComponentSideBar;
