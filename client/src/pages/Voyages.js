import React, { Component } from "react";
import { Link } from "react-router-dom";
import Modal from "react-modal";
import Nav from "../components/Nav"

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

class Voyages extends Component {
    constructor(props) {
        super(props);
        this.state = {
            voyages: [],
            totalHours: 0,
            isRemoveModalOpen: false,
            deleteID: ""
            // updateNote: false,
            // insertNoteId: "",
            // insertNoteHeadline: "",
            // insertNoteURL: "",
            // insertNoteDate: ""
        };
    }

    componentDidMount() {
        //Call voyages ajax request and set state with response
        this.loadVoyages().then(voyages => this.setState({ voyages }));
        //Allow page to scroll
        document.querySelector('body').style.overflow = "scroll"
    }

    loadVoyages = () => {
        //Get request to display all voyages in database
        return fetch("http://localhost:5000/api/voyages").then(res => res.json());
    };

    openRemoveModal = event => {
        event.preventDefault();
        //On click, open modal to confirm delete
        this.setState({ isRemoveModalOpen: true })
        let deleteID;

        //If user clicks on delete button ICON, grab id of selected voyage and update state
        if (event.target.tagName === "I") {
            deleteID = event.target.parentElement.parentElement.parentElement.getAttribute("data-id")
            this.setState({ deleteID: deleteID })

            //If user clicks on delete BUTTON, grab id of selected voyage and update state
        } else if (event.target.tagName === "BUTTON") {
            deleteID = event.target.parentElement.parentElement.getAttribute("data-id")
            this.setState({ deleteID: deleteID })

        }
    }

    deleteVoyage = () => {
        //Delete method to remove selected voyage from database
        fetch(`http://localhost:5000/api/voyages/delete/${this.state.deleteID}`, {
            method: "DELETE"
        })
            .then(res => res.json())
            //Filter out deleted voyage from display 
            .then(oldVoyageID => {
                let voyages = this.state.voyages.filter((voyage, i) => voyage._id !== oldVoyageID);
                this.setState({ voyages });
            })
            //Close modal
            .then(this.setState({ isRemoveModalOpen: false }));

    }

    render() {
        return (
            <div>
                <Nav loggedIn={this.props.loggedIn} handleLogOut={this.props.handleLogOut} />
                <div className="container">

                    <Link to="/dashboard">
                        <button style={{ width: `42vh` }} className="btn waves-effect waves-light"> Back to Dash</button>
                    </Link>

                    <p>Total Time on the Boat: {this.state.totalHours}</p>

                    <Modal isOpen={this.state.isRemoveModalOpen} onRequestClose={this.closeModal} shouldCloseOnOverlayClick={true} shouldCloseOnEsc={true} style={customStyles}>
                        <div className="center-align">
                            <h3>Permanently cast this voyage to the bottom of the ocean???</h3>
                            <button onClick={this.deleteVoyage} className="btn red">Yes</button>
                            <button onClick={() => this.setState({ isRemoveModalOpen: false })} className="btn">No, take me back</button>
                        </div>
                    </Modal>

                    {/* Loop through voyages array to display all data */}
                    {this.state.voyages.map(v => (
                        <div className="vCard" data-id={v._id} key={v._id}>
                            <h5>Voyage: {v.name}</h5>
                            <h5>Sailing date: {v.date}</h5>
                            <h5>Description: {v.description}</h5>
                            <h5>Fuel remaining: {v.fuel}</h5>
                            <h5>Starting Hours: {v.hoursStart}</h5>
                            <h5>Ending Hours: {v.hoursEnd}</h5>
                            <h5>Total Trip Length: {v.voyageHours} hrs</h5>
                            <div className="right-align">
                                <button className="btn red" onClick={this.openRemoveModal}><i className="material-icons" onClick={this.openRemoveModal}>delete</i> </button>
                            </div>
                        </div>
                    ))}

                </div>
            </div>
        )
    }
}
export default Voyages;


//===================
//POTENTIAL UPDATE METHODS
//==================

    // loadNoteForm = id => {
    //     this.setState({ updateNote: true }, () => {
    //         this.setState({
    //             insertNoteId: id
    //         });

    //         let form = document.querySelector("#noteForm");

    //         let input = form.children[0];

    //         this.findArticle(id).then(res => input.value = (res[0].notes.length === 0 ? "" : res[0].notes[res[0].notes.length - 1])) //so last note shows up in input when the note form loads;
    //     });
    // };

    // cancelNoteForm = event => {
    //     event.preventDefault();
    //     this.setState({ updateNote: false });
    // };

    // insertNote = event => {
    //     // event.preventDefault();

    //     let notes = event.target.children[0].value;
    //     let id = event.target.children[1].value;

    //     axios
    //         .put(`http://localhost:4025/api/articles/${id}`, {
    //             notes: notes
    //         })
    //         .then(res => console.log(res));
    //     //   .then(res => {
    //     //     let articles = this.state.articles.map(a => {
    //     //       if (a._id !== id) return a;
    //     //       else return res;
    //     //     });
    //     // this.setState({ articles });
    //     //   });

    //     // fetch(`http://localhost:4025/api/articles/note/${id}`, {
    //     //   method: "PUT",
    //     //   body: { test: "test" }
    //     // })
    //     //   .then(res => res.json())
    //     //   .then(res => {
    //     //     console.log("line 71", res);
    //     //     let articles = this.state.articles.map(a => {
    //     //       if (a._id !== id) return a;
    //     //         else return res;
    //     //     });
    //     //     this.setState({ articles });
    //     //   });
    // };

    // findArticle = id => {
    //     return fetch(`http://localhost:4025/api/articles/${id}`).then(res => res.json());
    // }


//===================
//OLD REMOVE METHODS
//==================

// removeVoyage = event => {
    //     event.preventDefault();
    //     let deleteID = event.target.parentElement.parentElement.getAttribute("data-id")
    //     fetch(`http://localhost:5000/api/voyages/delete/${deleteID}`, {
    //         method: "DELETE"
    //     })
    //         .then(res => res.json())
    //         .then(oldVoyageID => {
    //             let voyages = this.state.voyages.filter(
    //                 (voyage, i) => voyage._id !== oldVoyageID
    //             );
    //             this.setState({ voyages });
    //         });
    // };

    // iconRemoveVoyage = event => {
    //     event.preventDefault();
    //     let deleteID = event.target.parentElement.parentElement.parentElement.getAttribute("data-id")
    //     fetch(`http://localhost:5000/api/voyages/delete/${deleteID}`, {
    //         method: "DELETE"
    //     })
    //         .then(res => res.json())
    //         .then(oldVoyageID => {
    //             let voyages = this.state.voyages.filter(
    //                 (voyage, i) => voyage._id !== oldVoyageID
    //             );
    //             this.setState({ voyages });
    //         });
    // };
