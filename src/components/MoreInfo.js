import React, { Component } from "react";
import { connect } from "react-redux";
import IMDB from "./css/icons/imdb.png";
import RT from "./css/icons/RT.png";

import { fetchMovieInformation } from "../actions";

class MoreInfo extends Component {
  componentWillReceiveProps(nextProps) {
    if (this.props.movie.movieID !== nextProps.movie.movieID) {
      this.props.fetchMovieInformation(nextProps.movie.movieID);
    }
  }

  render() {
    if (this.props.movie.movieInformation) {
      let {
        Actors,
        Director,
        Genre,
        Plot,
        Rated,
        Ratings,
        Runtime,
        Title,
        Writer,
        Released
      } = this.props.movie.movieInformation;
      let actorsArray = Actors.split(",");
      let actorsJSXArray = [];
      for (let actor of actorsArray) actorsJSXArray.push(<p>{actor}</p>);
      var date = new Date(Released);
      return (
        <div className="more-info">
          <div className="more-info__title">{Title}</div>
          <div className="more-info__information">
            <div className="more-info__runtime">{Runtime}</div>
            <div className="more-info__rating">{Rated}</div>
            <div className="more-info__rating">{date.getFullYear()}</div>
          </div>
          <div className="more-info__reviews">
            <div className="more-info__IMDB">
              <img className="more-info__img" src={IMDB} alt="IMDB" />
              <p className="more-info__score">{Ratings[0].Value}</p>
            </div>
            <div className="more-info__RT">
              <img src={RT} alt="RT" className="more-info__img" />
              <p className="more-info__score">{Ratings[1].Value}</p>
            </div>
          </div>
          <div className="more-info__synopsis">{Plot}</div>
          <div className="more-info__genre">{Genre}</div>
          <div className="more-info__actors">{actorsJSXArray}</div>
          <div className="more-info__directors">Directed By: {Director}</div>
          <div className="more-info__writers">Written By: {Writer}</div>
        </div>
      );
    } else {
      return <div />;
    }
  }
}

const mapStateToProps = state => {
  return {
    movie: state.movie
  };
};

export default connect(
  mapStateToProps,
  { fetchMovieInformation }
)(MoreInfo);
