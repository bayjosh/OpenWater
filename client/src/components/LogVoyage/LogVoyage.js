import "./LogVoyage.css";
import React, { Component } from "react";
import { Button, Icon, Modal, Row, Input, NavItem } from 'react-materialize'
import axios from "axios";

class LogVoyage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            voyageName: "",
            voyageDate: "",
            voyageDescription: "",
            voyageFuel: "",
            voyageHoursStart: 0,
            voyageHoursEnd: 0,
            voyageHours: 0,
            totalHours: 0,
            selectedFile: null,
            pictures: []
        };
    }

    fileChangedHandler = (event) => {
        const file = event.target.files[0]
        this.setState({ selectedFile: event.target.files[0] })
    }

    uploadHandler = () => {
        console.log(this.state.selectedFile)
        this.setState({ pictures: [...this.state.pictures, this.state.selectedFile] })
        // onUploadProgress: progressEvent => {
        //     console.log(progressEvent.loaded / progressEvent.total)
        // }
    }

    //Method to handle click of "Save Voyage" button
    saveVoyage = event => {
        event.preventDefault()
        //Close modal and calculate voyage hours
        //Initial setTimeout of zero to ensure that fires first
        setTimeout(() => {
            this.setState({ isOpen: false, voyageHours: this.state.voyageHoursEnd - this.state.voyageHoursStart })
            setTimeout(() => {
                //Calcuate total hours of all voyages user has logged????
                this.setState({ totalHours: this.state.totalHours + this.state.voyageHours })
                axios.post("http://localhost:5000/saveVoyage", {
                    name: this.state.voyageName,
                    date: this.state.voyageDate,
                    description: this.state.voyageDescription,
                    fuel: this.state.voyageFuel,
                    hoursStart: this.state.voyageHoursStart,
                    hoursEnd: this.state.voyageHoursEnd,
                    voyageHours: this.state.voyageHours,
                    pictures: this.state.pictures,
                    userId: this.props.userId
                    // the line below refreshes the page if youre on /dashboard to see the newly added voyage
                }).then(() => { if (window.location.pathname === '/voyages') {
                        window.location.reload()
                    }
                })
            }, 1);
        }, 0);
        
    };

    render() {
        //Global variable to calculate voyage dours as integer
        let hours = parseInt(this.state.voyageHoursEnd - this.state.voyageHoursStart, 10)

        return (
            <Modal
                header='Log a Voyage'
                trigger={<NavItem style={{textAlign: `center`, color: `black`}}>Log A Voyage</NavItem>}
                actions={<Button modal="close" onClick={this.saveVoyage}>
                    <Icon left>check_circle</Icon>Save This Voyage</Button>}
                modalOptions={{ complete: () => document.querySelector('body').style.overflow = "scroll" }}
                fixedFooter
                style={{ borderRadius: `25px` }}>

                <Row className="right-align">
                    <input type="file" onChange={this.fileChangedHandler} />
                    <Button onClick={this.uploadHandler} className="left-align" s={12}>Upload Photos<Icon left>add_a_photo</Icon></Button>
                </Row>

                <Row >
                    <br />
                    {/* Form inputs and setting state with each value */}
                    <Input type="hidden" value={this.props.userId} />
                    <Input validate placeholder="Name your voyage here" s={12} label="Name" onChange={(e, value) => { this.setState({ voyageName: value }) }}><Icon>directions_boat</Icon></Input>
                    <Input label="Date" name='on' type='date' onChange={(e, value) => { this.setState({ voyageDate: value }) }}><Icon>date_range</Icon></Input>
                    <Input type="textarea" placeholder="Add a brief summary of your voyage here" label="Description" s={12} onChange={(e, value) => { this.setState({ voyageDescription: value }) }}><Icon>create</Icon></Input>
                    <Input validate s={6} type='select' icon="local_gas_station" label="Ending Fuel Level" defaultValue='' onChange={(e, value) => { this.setState({ voyageFuel: value }) }}>
                        <option value="" disabled>Pick One</option>
                        <option value='3/4 - Full'>3/4 - Full</option>
                        <option value='1/2 - 3/4'>1/2 - 3/4</option>
                        <option value='1/4 - 1/2'>1/4 - 1/2</option>
                        <option value='Empty - 1/4'>Empty - 1/4 </option>
                    </Input>
                    <Input s={3} label="Starting Hours" onChange={(e, value) => { this.setState({ voyageHoursStart: value }) }} />
                    <Input s={3} label="Ending Hours" onChange={(e, value) => { this.setState({ voyageHoursEnd: value }) }} />
                </Row>

                {/* If voyage hours calculates less than zero, display zero */}
                {hours < 0 ? <p className="right-align">Voyage length: 0 hrs</p> : <p className="right-align">Voyage length: {hours} hrs</p>}
            </Modal>
        )
    }
}

export default LogVoyage;