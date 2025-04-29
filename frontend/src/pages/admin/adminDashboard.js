// pages/admin/adminDashboard.js
import React, { Component } from "react";
import ComponentSideBar from '../../components/admin/ComponentSideBar';
import ComponentHeader from '../../components/admin/ComponentHeader';
import ComponentFooter from '../../components/admin/ComponentFooter';
import { Outlet } from 'react-router-dom'; // Import Outlet

class AdminDashboard extends Component {
    render() {
        return (
            <div id="wrapper">
            <ComponentSideBar />
            <div id="content-wrapper" className="d-flex flex-column">
                <div id="content">
                <ComponentHeader />
                <div className="container-fluid">
                    <Outlet /> 
                </div>
                </div>
                <ComponentFooter />
            </div>
            </div>
        );
    }
}

export default AdminDashboard;