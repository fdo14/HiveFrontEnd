import React, { Component } from "react";
import movieImg from "./css/icons/movie.png";
import moreImg from "./css/icons/more.png";
import { getTokens } from "../actions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class Footer extends Component {
  state = { moreClicked: false };

  componentDidMount() {
    this.props.getTokens();
  }

  showMoreInfo = () => {
    if (!this.state.moreClicked) {
      document
        .getElementById("side-bar")
        .setAttribute(
          "style",
          "transform:translateX(90rem); transition:all .2s"
        );
      document
        .getElementById("more-info")
        .setAttribute("style", "transform:translateX(0rem);");
      document
        .getElementById("info-button")
        .setAttribute(
          "style",
          `background:url(${movieImg}); background-size: 4rem 4rem`
        );
      this.setState({ moreClicked: true });
    } else {
      document
        .getElementById("side-bar")
        .setAttribute(
          "style",
          "transform:translateX(0rem); transition:all .2s"
        );
      document
        .getElementById("more-info")
        .setAttribute("style", "transform:translateX(90rem);");
      document
        .getElementById("info-button")
        .setAttribute(
          "style",
          `background:url(${moreImg}) center center no-repeat; background-size: 4rem 1rem`
        );

      this.setState({ moreClicked: false });
    }
  };

  showTokenPopup = () => {
    document.getElementById("token-popup").style.zIndex = "1000";
    document.getElementById("token-popup").style.opacity = "1";
    document.getElementById("token-popup").style.height = "45rem";
    document.getElementById("token-popup").style.width = "45rem";
    document.addEventListener("click", this.hideTokenPopup);
  };

  hideTokenPopup = e => {
    if (
      e.target.id !== "token-popup" &&
      e.target.id !== "singleToken" &&
      e.target.id !== "middleToken" &&
      e.target.id !== "multiToken" &&
      e.target.id !== "watch"
    ) {
      document.getElementById("token-popup").style.height = "0rem";
      document.getElementById("token-popup").style.width = "0rem";
      document.getElementById("token-popup").style.opacity = "0";
      document.getElementById("token-popup").style.zIndex = "-1000";
      document.removeEventListener("click", this.hideTokenPopup);
    }
  };

  showPlayPopup = () => {
    document.getElementById("play-popup").style.zIndex = "1000";
    document.getElementById("play-popup").style.opacity = "1";
    document.getElementById("play-popup").style.height = "45rem";
    document.getElementById("play-popup").style.width = "45rem";
    document.addEventListener("click", this.hidePlayPopup);
  };

  hidePlayPopup = e => {
    if (
      e.target.id !== "play-popup" &&
      e.target.id !== "play-popup__confirm" &&
      e.target.id !== "play-popup__watch" &&
      e.target.id !== "video"
    ) {
      document.getElementById("play-popup").style.height = "0rem";
      document.getElementById("play-popup").style.width = "0rem";
      document.getElementById("play-popup").style.opacity = "0";
      document.getElementById("play-popup").style.zIndex = "-1000";

      document.getElementById("play-popup__watch").style.visibility = "hidden";
      document.getElementById("play-popup__confirm").style.visibility =
        "visible";
      document.removeEventListener("click", this.hidePlayPopup);
    }
  };

  render() {
    if (this.props.tokens && this.props.movie.movieInformation) {
      let { Rented, Finder } = this.props.movie.movieInformation;
      return (
        <div className="footer">
          <button className="footer__account">JN</button>
          <div className="footer__buttons">
            <button
              className="footer__button footer__button-credit"
              onClick={this.showTokenPopup}
            >
              {this.props.tokens}
            </button>

            {Rented ? (
              <Link
                className="footer__button footer__button-play"
                to="/watch"
                onClick={this.handleWatchMovie}
                params={{ movieID: Finder }}
              />
            ) : (
              <button
                className="footer__button footer__button-play"
                onClick={this.showPlayPopup}
              >
                2
              </button>
            )}

            <button
              className="footer__button footer__button-more"
              onClick={this.showMoreInfo}
              id="info-button"
            />
          </div>
        </div>
      );
    } else return <div />;
  }
}

const mapStateToProps = state => {
  return {
    tokens: state.user.tokens,
    movie: state.movie
  };
};

export default connect(
  mapStateToProps,
  { getTokens }
)(Footer);
