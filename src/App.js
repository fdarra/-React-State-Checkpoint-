// import "./App.css";
// import myimg from "../src/logo.png";

// function App() {
//   return (
//     <div className="App">
//       <h1>Welcome to GomyCode Bootcamp</h1>
//       <p>This is a simple React application.</p>
//       <img class ='app-img' src={myimg} alt="Logo" />
//     </div>
//   );
// }

// export default App;

import { React, Component } from "react";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,

      Person: {
        name: "John",
        age: 30,
        city: "New York",
      },
      startTime: Date.now(), // Initialize start time when component mounts
      elapsedTime: 0, // To store the elapsed time
    };

    this.timer = null;
    this.array = [];
  }
  componentDidMount() {
    // Start the timer when the component mounts
    this.timer = setInterval(() => {
      this.updateElapsedTime();
    }, 1000); // Update every second
  }
  componentWillUnmount() {
    // Clear the timer when the component unmounts
    clearInterval(this.timer);
    this.ShowHistorical();
  }

  updateElapsedTime() {
    // Calculate the elapsed time in seconds
    const currentTime = Date.now();
    const elapsedTime = Math.floor((currentTime - this.state.startTime) / 1000);
    this.setState({ elapsedTime });
  }

  toggle = () => {
    let date = new Date(this.state.startTime);
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let start = hours.toString() + "h:" + minutes.toString() + "m";
    let timelapsed = 0;
    this.setState({ show: !this.state.show });
    if (this.state.show) {
      this.componentWillUnmount();
      timelapsed = this.state.elapsedTime;
      const arrayEntry = { start, timelapsed };
      this.array.push(arrayEntry);
    } else {
      this.componentDidMount();

      this.setState({ startTime: Date.now() }); // Reset start time when toggling
    }
  };

  ShowHistorical = () => {
    // Get the list element, assuming you want the first element with the class 'ShowHistoric'
    let listHistorical = document.getElementsByClassName("ShowHistoric")[0];

    // Check if the list element exists
    if (listHistorical) {
      // Clear any previous entries if needed
      listHistorical.innerHTML = "";

      // Iterate over each element in the array
      this.array.forEach((el) => {
        // Create a new list item
        let li = document.createElement("li");
        // Set the content of the list item
        li.innerHTML = `The show started at ${el.start} for ${el.timelapsed} seconds`;

        // Append the list item to the list element
        listHistorical.appendChild(li);
      });
    } else {
      console.error("Element with class 'ShowHistoric' not found.");
    }
  };

  render() {
    const { elapsedTime } = this.state;
    this.ShowHistorical();
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignContent: "center",
        }}
      >
        <button onClick={this.toggle}>
          {this.state.show ? "HIDE" : "SHOW"}
        </button>
        {this.state.show && (
          <>
            <div>
              <h2>Name: {this.state.Person.name}</h2>
              <p>Age: {this.state.Person.age}</p>
              <p>City: {this.state.Person.city}</p>
            </div>
            <div>
              <h1>Time Since Mount:</h1>
              <p>{elapsedTime} seconds</p>
            </div>
          </>
        )}

        <div>
          <h2>Historic of shows</h2>
          <ul
            className="ShowHistoric"
            style={{ display: " flex", flexDirection: "column-reverse" }}
          ></ul>
        </div>
      </div>
    );
  }
}
