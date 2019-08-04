import React, { Component } from "react";
import { connect } from "react-redux";
import { history } from "react-router-dom";
var banners = require.context("./css/banners", true);

class Watch extends Component {
  handleClick = () => {
    this.props.history.push("/");
  };

  render() {
    return (
      <div className="watch" id="watch">
        <div className="watch__container">
          <div className="watch__back" onClick={this.handleClick} />
          <video className="watch__video" id="video" controls autoPlay>
            <source
              src={`http://localhost:4000/video?id=${
                this.props.movie.movieInformation.Finder
              }`}
              type="video/mp4"
            />
          </video>
          {/* <div className="watch__controls">
            <div className="watch__progress">
              <input
                type="range"
                min="1"
                max="100"
                className="watch__progress-bar"
                id="progress-bar"
              />
              <div className="watch__progress-time">{this.renderTime()}</div>
            </div>
            <div className="watch__buttons">
              <div className="watch__buttons-plause">Play</div>
              <div className="watch__buttons-volume">Volume</div>
              <div className="watch__buttons-Title">Title</div>
              <div className="watch__buttons-screen">Fullscreen</div>
            </div>
          </div> */}
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

export default connect(mapStateToProps)(Watch);
