import React, { Component } from "react";

class Image extends Component {
  render() {
    return <img src={this.props.image} alt={this.props.name}></img>;
  }
}

export default Image;
