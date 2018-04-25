import React, { Component } from 'react';
import Modal from 'react-modal';
import "./LoadingModal.css";
import LoadingWheel from "../LoadingWheel"
import API from "../../utils/API";

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
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



    getLocation = () => {
        let zip = this.props.zipCode
        API.getLocation(zip).then(res => {
            this.setState({ city: res.data[0].LocalizedName, wState: res.data[0].AdministrativeArea.ID })
        })
    }

    openModal = () => {
        this.setState({ modalIsOpen: true });
    }

    // afterOpenModal = () => {
    //     // references are now sync'd and can be accessed.
    //     this.subtitle.style.color = '#f00';
    // }


    closeModal = () => {
        this.setState({ modalIsOpen: false });
    }

    render() {
        return (
            <div>
                {/* <button onClick={this.openModal}>Open Modal</button> */}
                <Modal
                    isOpen={this.state.modalIsOpen}
                    // onAfterOpen={this.afterOpenModal}
                    // onRequestClose={this.closeModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                    ariaHideApp={false}
                >
                    <LoadingWheel />

                    <h2 ref={subtitle => this.subtitle = subtitle}>Fetching info for {this.state.city}, {this.state.lState}</h2>
                </Modal>
            </div>
        );
    }
}

export default LoadingModal;