import React, { Component } from "react";
import ComponentSideBar from '../../components/admin/ComponentSideBar';
import ComponentHeader from '../../components/admin/ComponentHeader';
import ComponentFooter from '../../components/admin/ComponentFooter';
import { Outlet } from 'react-router-dom'; 

class AdminDashboard extends Component {
    render() {
        return (
            <div id="wrapper" className="bg-light">
            <ComponentSideBar />
            <div id="content-wrapper" className="d-flex flex-column">
                <div id="content">
                <ComponentHeader />
                <div className="container-fluid py-4">
                    <div className="card shadow-sm border-0 rounded-3 animate__animated animate__fadeIn">
                        <div className="card-body">
                            <Outlet /> 
                        </div>
                    </div>
                </div>
                </div>
                <ComponentFooter />
            </div>
            </div>
        );
    }
}

export default AdminDashboard;