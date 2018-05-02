import React, { Component } from "react";
import { Link } from "react-router-dom";
// import "../App.css";
// import axios from "axios";

class Voyages extends Component {
    constructor(props) {
        super(props);
        this.state = {
            voyages: [],
            // updateNote: false,
            // insertNoteId: "",
            // insertNoteHeadline: "",
            // insertNoteURL: "",
            // insertNoteDate: ""
        };
    }

    componentDidMount() {
        this.loadVoyages().then(voyages => this.setState({ voyages }));
        document.querySelector('body').style.overflow = "scroll"

    }

    loadVoyages = () => {
        return fetch("http://localhost:5000/api/voyages").then(res => res.json());
    };

    // findArticle = id => {
    //     return fetch(`http://localhost:4025/api/articles/${id}`).then(res => res.json());
    // };

    // removeArticle = event => {
    //     event.preventDefault();
    //     let deleteID = event.target.parentElement.getAttribute("data-id");
    //     fetch(`http://localhost:4025/api/articles/${deleteID}`, {
    //         method: "DELETE"
    //     })
    //         .then(res => res.json())
    //         .then(oldArticleID => {
    //             let articles = this.state.articles.filter(
    //                 (article, i) => article._id !== oldArticleID
    //             );
    //             this.setState({ articles });
    //         });
    // };

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

    render() {
        return (
            <div className="container">
                <Link to="/dashboard"><button
                    style={{ width: `42vh` }}
                    className="btn waves-effect waves-light"
                >
                    Back to Dash
                  </button>
                </Link>

                {this.state.voyages.map(v => (
                    <div className="card blue-grey darken-1" data-id={v._id} key={v._id}>
                        <h5>{v.name}</h5>
                        <h5>{v.date}</h5>
                        <h5>{v.description}</h5>
                        <h5>{v.fuel}</h5>
                        <h5>{v.mileageStart}</h5>
                        <h5>{v.mileageEnd}</h5>
                    </div>
                ))}
            </div>
        )
    }
}
export default Voyages;
