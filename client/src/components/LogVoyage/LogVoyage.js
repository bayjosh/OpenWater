import "./LogVoyage.css";
import React, { Component } from "react";
import { Button, Icon, Modal, Row, Input } from 'react-materialize'
import axios from "axios";

class LogVoyage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            voyageName: "",
            voyageDate: "",
            voyageDescription: "",
            voyageFuel: "",
            voyageMileageStart: 0,
            voyageMileageEnd: 0,
            voyageDistance: 0,
            totalDistance: 0
        };
    }

    saveVoyage = event => {
        event.preventDefault();

        setTimeout(() => {
            this.setState({ isOpen: false, voyageDistance: this.state.voyageMileageEnd - this.state.voyageMileageStart })
            setTimeout(() => {
                this.setState({ totalDistance: this.state.totalDistance + this.state.voyageDistance })
                axios.post("http://localhost:5000/saveVoyage", {
                    name: this.state.voyageName,
                    date: this.state.voyageDate,
                    description: this.state.voyageDescription,
                    fuel: this.state.voyageFuel,
                    mileageStart: this.state.voyageMileageStart,
                    mileageEnd: this.state.voyageMileageEnd,
                    voyageDistance: this.state.voyageDistance
                });

            }, 1);
        }, 0);





    };

    render() {

        let distance = parseInt(this.state.voyageMileageEnd - this.state.voyageMileageStart)

        return (


            // <Modal
            //     trigger={<Button className="blue lighten-2">Log A Voyage</Button>}
            // >
            // </Modal>

            <Modal
                header='Log A Voyage'
                trigger={<Button className="blue lighten-2">Log A Voyage</Button>}
                actions={<Button modal="close" onClick={this.saveVoyage}
                ><Icon left>check_circle</Icon>Save This Voyage</Button>} modalOptions={{ complete: () => document.querySelector('body').style.overflow = "scroll" }}>


                <Row >
                    <br />
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
                    <Input s={3} label="Starting Mileage" onChange={(e, value) => { this.setState({ voyageMileageStart: value }) }} />
                    <Input s={3} label="Ending Mileage" onChange={(e, value) => {
                        this.setState({ voyageMileageEnd: value })
                    }} />

                </Row>
                {distance < 0 ? <p className="right-align">Voyage distance: 0</p> : <p className="right-align">Voyage distance: {distance}</p>}


                <Button s={12}>Upload Photos<Icon left>add_a_photo</Icon></Button>


            </Modal>
            // <div className="voyageInfo">
            // <span>
            //     <button
            //         className="btn waves-effect modal-trigger waves-light"
            //         style={{ width: `42vh`, margin: `0 10px 0 20px` }}
            //         data-target="#voyageModal"
            //     >
            //         Log a Voyage
            //       </button>
            // </span>
            //     <div id="voyageModal" className="modal">
            //         <div className="modal-content">
            //             <h4>Log A Voyage</h4>
            //             <p>A bunch of text</p>
            //         </div>
            //         <div className="modal-footer">
            //             <a href="#!" className="modal-action modal-close waves-effect waves-green btn-flat">Close</a>
            //         </div>
            //     </div>
            // </div>

        )
    }
}

export default LogVoyage;