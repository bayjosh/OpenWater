import React, { Component } from 'react';
import Modal from 'react-modal';
import "./LoadingModal.css";
import LoadingWheel from "../LoadingWheel"
import API from "../../utils/API";

const customStyles = {
    overlay: {
    },
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        overflow: 'hidden',
        borderRadius: '25px'
    }
};

class LoadingModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            modalIsOpen: false,
            city: "",
            lState: ""
        };
    }

    componentDidUpdate(prevProps, prevState) {
        //Only get location and launch modal if new user click on map registered
        if (this.props.zipCode !== 0 && prevProps.zipCode !== this.props.zipCode) {
            this.getLocation();
            this.openModal();
            //Once forecastTime is different from previous, marine data is ready, close modal
        } else if (this.props.forecastTime !== prevProps.forecastTime) {
            this.closeModal();
        }
    }

    //Method to display loading messages
    modalMessageLoad = () => {
        const messageArr = ["...Forecasting Marine Conditions...", "...Assembling Weather Forecast...", "...Gathering Docking Options...", "...Finding Nautical Charts...", "...Running Out of Excuses..."];
        //Frequent checks to see if modal is still open (data still loading); If so, display next loading message
        //Initial setTimeout of zero to ensure that fires first
        if (this.state.modalIsOpen) {
            setTimeout(() => {
                if (this.state.modalIsOpen) {
                    document.getElementById('modal-message').innerHTML = messageArr[0];
                    setTimeout(() => {
                        if (this.state.modalIsOpen) {
                            document.getElementById('modal-message').innerHTML = messageArr[1];
                            setTimeout(() => {
                                if (this.state.modalIsOpen) {
                                    document.getElementById('modal-message').innerHTML = messageArr[2]
                                    setTimeout(() => {
                                        if (this.state.modalIsOpen) {
                                            document.getElementById('modal-message').innerHTML = messageArr[3]
                                            setTimeout(() => {
                                                if (this.state.modalIsOpen) {
                                                    document.getElementById('modal-message').innerHTML = messageArr[4]
                                                }
                                            }, 4000)
                                        }
                                    }, 4000)
                                }
                            }, 4000)
                        }
                    }, 4000)
                }
            }, 0)
        }
    }

    getLocation = () => {
        let zip = this.props.zipCode
        //API call to get "city, state" from zipcode
        API.getLocation(zip).then(res => {
            this.setState({ city: res.data[0].LocalizedName, lState: res.data[0].AdministrativeArea.ID })
        })
    }

    openModal = () => {
        this.setState({ modalIsOpen: true });
    }

    afterOpenModal = () => {
        //?????
        // references are now sync'd and can be accessed.
        // this.subtitle.style.color = '#f00';
        this.modalMessageLoad();
    }


    closeModal = () => {
        this.setState({ modalIsOpen: false });
    }

    render() {
        return (
            <div id="loadModal">
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onAfterOpen={this.afterOpenModal}
                    onRequestClose={this.closeModal}
                    style={customStyles}
                    shouldCloseOnOverlayClick={true}
                    shouldCloseOnEsc={true}
                    //To appease react-modal error
                    ariaHideApp={false}>

                    <div className="right-align">
                        <button style={{ height: `29px`, width: `29px`, padding: `1px` }} onClick={this.closeModal}><i className="material-icons">close</i></button>
                    </div>

                    <div className="center-align">
                        <LoadingWheel />
                        {/* We're using refs???? */}
                        <h4 ref={subtitle => this.subtitle = subtitle}>Fetching info for {this.state.city}, {this.state.lState}</h4>
                        <hr />
                        {/* h5 where loading messages appear */}
                        <h5 id="modal-message"></h5>
                    </div>
                </Modal>
            </div>
        );
    }
}

export default LoadingModal;