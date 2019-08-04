import React, { Component } from "react";
import $ from "jquery";
import { fetchMovie } from "../actions";
import { connect } from "react-redux";
import { arrayCompare } from "./utilities/arrayCompare";

var trailers = require.context("../trailers", true);
var banners = require.context("./css/banners", true);

var timer;

class SideBar extends Component {
  state = {
    trailerKey: null,
    filter: "",
    activeMovie: "",
    searchFilter: ""
  };

  componentDidMount() {
    document.onkeydown = this.checkKey;

    if (this.props.movies.length) {
      let pic = banners(`./${this.props.movies[0].Finder}.jpg`);
      document.getElementById("main").style.backgroundImage = `url(${pic})`;
    }

    var mousewheelevt = /Firefox/i.test(navigator.userAgent)
      ? "DOMMouseScroll"
      : "mousewheel";
    document
      .getElementById("front")
      .addEventListener(mousewheelevt, this.displaywheel, false);

    document.getElementById("search").addEventListener("focus", function() {
      document
        .getElementById("dropdown")
        .classList.add("side-bar__dropdown-hidden");
    });
    document.getElementById("search").addEventListener("blur", function() {
      document
        .getElementById("dropdown")
        .classList.remove("side-bar__dropdown-hidden");
    });
  }

  componentWillReceiveProps(nextProps) {
    if (!arrayCompare(this.props.movies, nextProps.movies)) {
      let pic = banners(`./${nextProps.movies[0].Finder}.jpg`);
      document.getElementById("main").style.backgroundImage = `url(${pic})`;
      this.props.fetchMovie(nextProps.movies[0].Finder);
    }
  }

  selectCurrentMovie = () => {
    clearTimeout(timer);
    this.setState({ trailerKey: null });

    let currentMovie = document.activeElement.id;
    console.log(currentMovie);
    this.props.fetchMovie(currentMovie);

    const pattern = /(?:^|\s)move(?:\s|$)/;
    if (document.activeElement.className.match(pattern)) {
      let pic = banners(`./${currentMovie}.jpg`);
      document.getElementById("main").style.backgroundImage = `url(${pic})`;
    }

    timer = setTimeout(() => {
      this.setState({ trailerKey: null });
      if (document.activeElement.className.match(pattern)) {
        this.setState({
          trailerKey: trailers(`./${currentMovie}.mov`)
        });
      }
    }, 4000);
  };

  displaywheel = e => {
    var evt = window.event || e; //equalize event object
    var delta = evt.detail ? evt.detail * -120 : evt.wheelDelta; //check for detail first so Opera uses that instead of wheelDelta
    const pattern = /(?:^|\s)move(?:\s|$)/;
    if (document.activeElement.className.match(pattern)) {
      if (delta === -120) {
        $(".move:focus")
          .next()
          .focus();
        this.selectCurrentMovie();
      } else {
        $(".move:focus")
          .prev()
          .focus();
        this.selectCurrentMovie();
      }
      if (evt.preventDefault)
        //disable default wheel action of scrolling page
        evt.preventDefault();
      else return false;
    }
  };

  checkKey = e => {
    const pattern = /(?:^|\s)move(?:\s|$)/;
    if (document.activeElement.className.match(pattern)) {
      switch (e.keyCode) {
        case 38:
          $(".move:focus")
            .prev()
            .focus();
          this.selectCurrentMovie();
          break;
        case 40:
          $(".move:focus")
            .next()
            .focus();
          this.selectCurrentMovie();
          break;
        default:
          break;
      }
    }
  };

  selectFilter = event => {
    this.setState({ filter: event.target.value });
  };

  handleSearchInput = event => {
    this.setState({ searchFilter: event.target.value });
  };

  renderCategories = () => {
    let genreHash = {};
    for (let movie of this.props.movies) {
      let genres = movie.Genre.split(",");
      for (let genre of genres) {
        if (!genreHash[genre]) genreHash[genre] = true;
      }
    }
    let returnArray = [];
    for (let genre in genreHash) {
      returnArray.push(
        <option
          className="side-bar__dropdown-options"
          onClick={() => this.selectFilter()}
          href="#"
          value={genre}
          key={genre}
        >
          {genre}
        </option>
      );
    }
    return returnArray;
  };

  renderMovieList = () => {
    let returnArray = [];
    let counter = 0;
    for (let movie of this.props.movies) {
      let genres = movie.Genre.split(",");
      if (
        (!this.state.filter || genres.includes(this.state.filter)) &&
        movie.Title.toLowerCase().includes(
          this.state.searchFilter.toLowerCase()
        )
      ) {
        if (counter === 0) {
          counter++;
          returnArray.push(
            <button
              className="side-bar__list-item move"
              id={movie.Finder}
              onClick={this.selectCurrentMovie}
              autoFocus
              key={movie.Finder}
            >
              {movie.Title}
            </button>
          );
        } else {
          returnArray.push(
            <button
              className="side-bar__list-item move"
              id={movie.Finder}
              onClick={this.selectCurrentMovie}
              key={movie.Finder}
            >
              {movie.Title}
            </button>
          );
        }
      }
    }
    return returnArray;
  };

  render() {
    return (
      <div>
        <video
          autoPlay
          loop
          id="myVideo"
          className="main__video"
          key={this.state.trailerKey}
        >
          <source type="video/mp4" id="source" src={this.state.trailerKey} />
        </video>
        <div className="side-bar" id="side-bar">
          <div className="side-bar__forms">
            <select
              className="side-bar__dropdown"
              id="dropdown"
              onChange={this.selectFilter}
            >
              <option value="" disabled defaultValue hidden>
                {this.state.filter}
              </option>
              <option
                className="side-bar__dropdown-options"
                onClick={() => this.selectFilter()}
                href="#"
                value=""
              >
                All
              </option>
              {this.renderCategories()}
            </select>
            <input
              type="text"
              id="search"
              className="side-bar__search"
              onChange={this.handleSearchInput}
              value={this.state.searchFilter}
            />
          </div>

          {this.renderMovieList()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    movie: state.movie
  };
};

export default connect(
  mapStateToProps,
  { fetchMovie }
)(SideBar);
