import React, { Component } from "react";
import DashboardBackground from "../components/DashboardBackground";
import { Redirect } from "react-router-dom";

class Dashboard extends Component {
    constructor() {
        super();

        this.state = {
            fireRedirect: false
        };
    }
    render() {
        return (
            <DashboardBackground>
                <div className="dashboard">
                    <a id="saved-trips" href="#">
                        Saved Trips
                    </a>
                </div>
            </DashboardBackground>
        )
    }

}


export default Dashboard;