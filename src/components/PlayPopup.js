import React, { Component } from "react";
import cross from "./css/icons/cross.png";
import singleCredit from "./css/icons/singlecredit.png";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { buyMovie } from "../actions";

class PlayPopup extends Component {
  state = {
    redirect: false
  };
  handleBuyMovie = () => {
    let { Finder } = this.props.movie.movieInformation;
    this.props.buyMovie(Finder);
    document.getElementById("play-popup__confirm").style.visibility = "hidden";
    document.getElementById("play-popup__watch").style.visibility = "visible";
  };

  handleWatchMovie = () => {
    document.getElementById("play-popup__watch").style.visibility = "hidden";
    document.getElementById("play-popup__confirm").style.visibility = "visible";
  };

  render() {
    if (this.props.movie.movieInformation) {
      let { Title, Finder } = this.props.movie.movieInformation;
      return (
        <div className="play-popup" id="play-popup">
          <div className="play-popup__close">
            <img src={cross} alt="cross" className="play-popup__close-img" />
          </div>
          <div>
            <h1 className="play-popup__header">Rent {Title}</h1>
          </div>
          <div className="play-popup__options">
            <img
              className="play-popup__options-single"
              id="singleplay"
              src={singleCredit}
              alt="single play"
            />
            <h3>2 Credits</h3>
          </div>
          <button
            className="play-popup__confirm"
            onClick={this.handleBuyMovie}
            id="play-popup__confirm"
            value="Confirm"
          >
            Confirm
          </button>
          <Link
            className="play-popup__confirm"
            style={{ textDecoration: "none", visibility: "hidden" }}
            to="/watch"
            onClick={this.handleWatchMovie}
            id="play-popup__watch"
            params={{ movieID: Finder }}
          >
            Watch Now!
          </Link>
        </div>
      );
    } else return <div />;
  }
}

const mapStateToProps = state => {
  return {
    movie: state.movie
  };
};

export default connect(
  mapStateToProps,
  { buyMovie }
)(PlayPopup);
