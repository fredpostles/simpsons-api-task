import React, { Component } from "react";
import heart from "../images/heart.png";

class Like extends Component {
  state = { liked: false };

  render() {
    return (
      <>
        <img
          className={this.props.liked ? "heart_icon_show" : "heart_icon_hide"}
          src={heart}
          alt="Heart icon"
        ></img>
        <button
          className="likeBtn"
          onClick={() => this.props.onLike(this.props.id)}
        >
          {this.props.liked ? "Dislike" : "Like"}
        </button>
      </>
    );
  }
}

export default Like;
