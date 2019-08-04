import React, { Component } from "react";
import MainView from "./MainView";
import SideBar from "./SideBar";
import Footer from "./Footer";
import MoreInfo from "./MoreInfo";
import TokenPopup from "./TokenPopup";
import PlayPopup from "./PlayPopup";

import { fetchAllMovies } from "../actions";
import { connect } from "react-redux";

class FrontPage extends Component {
  componentDidMount() {
    this.props.fetchAllMovies();
  }

  render() {
    return (
      <div className="front-page" id="front">
        <div className="front-page__main">
          <MainView />
        </div>
        <div className="front-page__sidebar">
          <SideBar movies={this.props.moviesArray} />
        </div>
        <div className="front-page__footer">
          <Footer />
        </div>
        <div className="front-page__more-info" id="more-info">
          <MoreInfo />
        </div>
        <div>
          <TokenPopup />
        </div>
        <div>
          <PlayPopup />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    moviesArray: state.movie.moviesArray
  };
};

export default connect(
  mapStateToProps,
  { fetchAllMovies }
)(FrontPage);
