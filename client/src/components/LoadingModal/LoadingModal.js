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

// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
// Modal.setAppElement('#yourAppElement')

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
        if (this.props.zipCode !== 0 && prevProps.zipCode !== this.props.zipCode) {
            this.getLocation();
            this.openModal();

        } else if (this.props.forecastTime !== prevProps.forecastTime) {
            this.closeModal();
        }
    }

    modalMessageLoad = () => {
        console.log('hello')
        const messageArr = ["...Forecasting Marine Conditions...", "...Assembling Weather Forecast...", "...Gathering Docking Options...", "...Finding Nautical Charts...", "...Running Out of Excuses..."];
        // document.getElementById('modal-message').innerText = messageArr[0]
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
        API.getLocation(zip).then(res => {
            this.setState({ city: res.data[0].LocalizedName, lState: res.data[0].AdministrativeArea.ID })
        })
    }

    openModal = () => {
        this.setState({ modalIsOpen: true });
    }

    afterOpenModal = () => {
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
                {/* <button onClick={this.openModal}>Open Modal</button> */}
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onAfterOpen={this.afterOpenModal}
                    onRequestClose={this.closeModal}
                    style={customStyles}
                    // ariaHideApp={false}
                    /*
                      Boolean indicating if the overlay should close the modal
                    */
                    shouldCloseOnOverlayClick={true}
                    /*
                      Boolean indicating if pressing the esc key should close the modal
                      Note: By disabling the esc key from closing the modal you may introduce an accessibility issue.
                    */
                    shouldCloseOnEsc={true}

                >
                    <div className="right-align">
                        <button onClick={this.closeModal}>x</button>
                    </div>
                    <div className="center-align">
                        <LoadingWheel />
                        <h4 ref={subtitle => this.subtitle = subtitle}>Fetching info for {this.state.city}, {this.state.lState}</h4>
                        <hr />
                        <h5 id="modal-message"></h5>
                    </div>

                </Modal>
            </div>
        );
    }
}

export default LoadingModal;