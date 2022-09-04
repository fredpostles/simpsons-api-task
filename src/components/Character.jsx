import React, { Component } from "react";
import Name from "./Name";
import Quote from "./Quote";
import Image from "./Image";
import Like from "./Like";
import Delete from "./Delete";

class Character extends Component {
  render() {
    const { character, quote, image, characterDirection, id, liked } =
      this.props.item;

    return characterDirection === "Right" ? (
      <div className="character_container">
        <div className="characterName_container">
          <Name name={character} />
        </div>
        <div className="quote_container">
          <Quote quote={quote} />
        </div>
        <div className="image_container">
          <Image image={image} name={character} />
        </div>
        <div className="buttons_container">
          <Like id={id} liked={liked} onLike={this.props.onLike} />
          <Delete id={id} onDelete={this.props.onDelete} />
        </div>
      </div>
    ) : (
      <div className="character_container">
        <div className="characterName_container">
          <Name name={character} />
        </div>
        <div className="image_container">
          <Image image={image} name={character} />
        </div>
        <div className="quote_container">
          <Quote quote={quote} />
        </div>
        <div className="buttons_container">
          <Like id={id} liked={liked} onLike={this.props.onLike} />
          <Delete id={id} onDelete={this.props.onDelete} />
        </div>
      </div>
    );
  }
}
export default Character;
