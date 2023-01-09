import React, { Component } from "react";
import Character from "./components/Character";
import axios from "axios";
import "./App.css";
import {
  addIndex,
  removeDuplicates,
  sortDataAlphabetically,
  sortDataReverseAlphabetically,
} from "./utils";

class App extends Component {
  constructor() {
    super();
    this.userInput = React.createRef();
  }

  state = { isActive: false, userInput: "" };

  async componentDidMount() {
    try {
      const apiData = await axios.get(
        "https://thesimpsonsquoteapi.glitch.me/quotes?count=25"
      );

      const deDuplicated = removeDuplicates(apiData);

      addIndex(deDuplicated);

      this.setState({ apiData: deDuplicated });

      this.userInput.current.focus();
    } catch (error) {
      console.log(error);
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

  onSortAlphabetical = () => {
    const sorted = sortDataAlphabetically(this.state.apiData);
    if (sorted) {
      this.setState({ apiData: sorted });
    }

    this.setState({
      sorted: true,
      reverseSorted: false,
    });
  };

  onSortReverseAlphabetical = () => {
    const reverseSorted = sortDataReverseAlphabetically(this.state.apiData);
    if (reverseSorted) {
      this.setState({ apiData: reverseSorted });
    }
    this.setState({
      reverseSorted: true,
      sorted: false,
    });
  };

  onDecideSort = () => {
    this.state.sorted && !this.state.reverseSorted
      ? this.onSortReverseAlphabetical()
      : this.onSortAlphabetical();
  };

  render() {
    const { apiData, userInput, sorted, reverseSorted } = this.state;
    console.log(this.state);

    if (apiData === undefined) {
      return <h1 className="centered">Loading...</h1>;
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
        <div className="headerContainer centered">
          <h1>25 Simpsons Quotes</h1>
          <h2>You have liked {total} quotes</h2>
          <button onClick={this.onDecideSort} className="sortBtn">
            {sorted && !reverseSorted
              ? "Sort Z to A"
              : "Sort A to Z" || (reverseSorted && !sorted)
              ? "Sort A to Z"
              : "Sort Z to A" || (!sorted && !reverseSorted)
              ? "Sort A to Z"
              : "Sort Z to A"}
          </button>
        </div>
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
          {filteredData.length
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
