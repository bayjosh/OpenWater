import "./LogVoyage.css";
import React, { Component } from "react";
import { Button, Icon, Modal, Row, Input } from 'react-materialize'

class LogVoyage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false
        };
    }

    render(){
        return (

            <Modal
                header='Log A Voyage'
                trigger={<Button className="blue lighten-2">Log A Voyage</Button>}
                actions={<Button><Icon left>check_circle</Icon>Save This Voyage</Button>}>
            
                <Row >
                    <br/>
                    <Input validate placeholder="Name your voyage here" s={12} label="Name"><Icon>directions_boat</Icon></Input>
                    <Input label="Date" name='on' type='date' onChange={function (e, value) { console.log(value)}}><Icon>date_range</Icon></Input>
                    <Input type="textarea" placeholder="Add a brief summary of your voyage here" label="Description" s={12}><Icon>create</Icon></Input>
                    <Input validate s={6} type='select' icon="local_gas_station" label="Ending Fuel Level" defaultValue=''>
                        <option value="" disabled>Pick One</option>
                        <option value='1'>3/4 - Full</option>
                        <option value='2'>1/2 - 3/4</option>
                        <option value='3'>1/4 - 1/2</option>
                        <option value='4'>Empty - 1/4 </option>
                    </Input>
                    <Input s={3} label="Starting Mileage" />
                    <Input s={3} label="Ending Mileage" />
                </Row>
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