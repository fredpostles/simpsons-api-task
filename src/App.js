import React, { Component } from "react";
import Character from "./components/Character";
import axios from "axios";
import Simpsons from "./simpsons.json"; // backup
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.userInput = React.createRef();
  }

  state = { liked: 0, isActive: false, userInput: "" };

  async componentDidMount() {
    try {
      const apiData = await axios.get(
        "https://thesimpsonsquoteapi.glitch.me/quotes?count=50"
      );

      apiData.data.forEach((element, index) => {
        element.id = index;
      });

      apiData.data.sort((characterOne, characterTwo) => {
        if (characterOne.character > characterTwo.character) return 1;
        if (characterOne.character < characterTwo.character) return -1;

        return 0;
      });

      this.setState({ apiData: apiData.data });

      this.userInput.current.focus();
    } catch (error) {
      this.setState({ apiData: Simpsons });
    }
  }

  onLike = (id) => {
    //like a character/quote
    const index = this.state.apiData.findIndex((item) => {
      return item.id === id;
    });

    const apiData = [...this.state.apiData];

    apiData[index].liked === true
      ? (apiData[index].liked = false)
      : (apiData[index].liked = true);

    this.setState({ apiData });
    this.setState({ isActive: !this.state.isActive });
  };

  onDelete = (id) => {
    // delete a character/quote
    const index = this.state.apiData.findIndex((item) => {
      return item.id === id;
    });

    const apiData = [...this.state.apiData];
    apiData.splice(index, 1);

    this.setState({ apiData });
  };

  onInput = (e) => {
    let searchTerm = e.target.value.toLowerCase();
    this.setState({ userInput: searchTerm });
  };

  render() {
    const { apiData, userInput } = this.state;

    if (apiData === undefined) {
      return <h1>Loading...</h1>;
    }

    let total = 0;
    apiData.forEach((item) => {
      if (item.liked === true) {
        total += 1;
      }
    });

    let filteredData = [...apiData];
    filteredData = filteredData.filter((item) => {
      return item.character.toLowerCase().includes(userInput);
    });

    return (
      <>
        <h1 className="centered">50 Simpsons Quotes</h1>
        <h2 className="centered">You have liked {total} quotes</h2>
        <div className="centered search">
          <label forhtml="userInput">Search:</label>
          <input
            ref={this.userInput}
            id="userInput"
            name="userInput"
            type="text"
            value={userInput}
            onInput={this.onInput}
            placeholder="Type character name"
          ></input>
        </div>
        <div className="main_container">
          {userInput
            ? filteredData.map((item) => (
                <Character
                  onLike={this.onLike}
                  onDelete={this.onDelete}
                  key={item.id}
                  item={item}
                />
              ))
            : apiData.map((item) => (
                <Character
                  onLike={this.onLike}
                  onDelete={this.onDelete}
                  key={item.id}
                  item={item}
                />
              ))}
        </div>
      </>
    );
  }
}

export default App;
