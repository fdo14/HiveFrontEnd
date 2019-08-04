import React, { Component } from "react";
import cross from "./css/icons/cross.png";
import { connect } from "react-redux";
import { buyTokens } from "../actions";

class TokenPopup extends Component {
  state = { tokenAmount: 0 };
  chooseAmount = e => {
    this.setState({ tokenAmount: parseInt(e.target.value) });
  };

  submitTokenForm = () => {
    this.props.buyTokens(this.state.tokenAmount);
  };

  render() {
    return (
      <div className="token-popup" id="token-popup">
        <div className="token-popup__close">
          <img src={cross} alt="cross" className="token-popup__close-img" />
        </div>
        <div className="token-popup__options">
          <div>
            <button
              className="token-popup__options-single token-popup__options-button"
              id="singleToken"
              onClick={this.chooseAmount}
              value="1"
            />
            <p>1 Token</p>
          </div>
          <div>
            <button
              className="token-popup__options-button token-popup__options-middle"
              id="middleToken"
              onClick={this.chooseAmount}
              value="10"
            />
            <p>1 Token</p>
          </div>
          <div>
            <button
              className="token-popup__options-button token-popup__options-multi"
              id="multiToken"
              onClick={this.chooseAmount}
              value="100"
            />
            <p>1 Token</p>
          </div>
        </div>
        <button className="token-popup__confirm" onClick={this.submitTokenForm}>
          Confirm
        </button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    tokens: state.user.tokens
  };
};

export default connect(
  mapStateToProps,
  { buyTokens }
)(TokenPopup);
