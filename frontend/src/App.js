import React from 'react';
import Plot from 'react-plotly.js';
// import logo from './logo.svg';

import './App.css';
import LeaderBoard from './Table';

const ROUTES = [
  'http://localhost/commits/users',
  'http://localhost/commits/repos',
  'http://localhost/commits/commit-tags',
];
let routeInt = 0;
const changeSeconds = 3;

// Utility functions
// ---
// A proper sleep function that uses promises, only works in async functions

// function sleep(ms) {
//   return new Promise((resolve) => setTimeout(resolve, ms));
// }

// class Item {
//   constructor(name, x, y) {
//     this.name = name;
//     this.x = x;
//     this.y = y;
//   }
// }

function randomColor() {
  const colorArray = [];
  const number1 = Math.floor((Math.random() * 255) + 1);
  const number2 = Math.floor((Math.random() * 255) + 1);
  const number3 = Math.floor((Math.random() * 255) + 1);
  colorArray.push('rgb(' + number1 + ',' + number2 + ',' + number3 + ')');
  return colorArray;
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      layout: {
        title: 'This is a title',
      },
      data: [{
        x: [1, 2, 3],
        y: [1, 2, 3],
        type: 'scatter',
        mode: 'lines+markers',
        marker: { color: 'red' },
      }],
      fetchData: [],
    };
  }

  // When the component is mounted, start the interval with a tick of every second
  // It will also start the async function getGraphData
  componentDidMount() {
    console.log('---componentDidMount---');

    this.interval = setInterval(() => this.tick(), changeSeconds * 1000);
    // this.getGraphData();
  }

  componentWillUnmount() {
    // To avoid memory leaking issues, clear the interval that is set
    // during componentDidMount
    clearInterval(this.interval);
  }

  // routeIndex here refers to the index, routeInt -> declared in the global scope
  // will be passed through here
  async getGraphData(routeIndex) {
    console.log('---getGraphData---');

    try {
      // Temporary, trying to get the first one to work first
      // const response = await fetch('http://localhost/commits/users');
      // const response = await fetch('http://localhost/commits/repos');
      const response = await fetch(ROUTES[routeIndex]);

      // If the fetch function immediately throws a error
      // Probably a 404 of such, throw an error
      if (!response.ok) {
        throw Error(response.statusText);
      }
      const json = await response.json();

      // temp is a constant variable for any of the cases
      // this will then be used to set state
      const temp = [];

      console.log(`Currently the index is ${routeInt} which heres to ${ROUTES[routeInt]}`);
      console.log(json);

      if (routeIndex === 0) {
        Object.keys(json.user_commits).forEach((id) => {
          const tempName = json.users_info[id];
          console.log(`tempName is ${tempName}`);
          const tempX = json.user_commits[id];
          const tempY = [];
          for (let i = 0; i < json.user_commits[id].length; i++) {
            tempY.push(i);
          }
          // There may be future problems coming from this
          // As changing state is async and not immediate
          // this.state.data.push(new Item(tempName, tempX, tempY));

          const generatedColor = randomColor();
          console.log(generatedColor);

          temp.push({
            name: tempName,
            x: tempX,
            y: tempY,
            type: 'scatter',
            mode: 'lines+markers',
            // This is currently commented out as plotly generates colours for them
            // albeit not random, but works well enough
            // line: {
            //   color: generatedColor,
            // },
            // marker: {
            //   color: 'rgb(0, 0, 0)',
            // },
          });
        });
      } else if (routeIndex === 1) {
        Object.keys(json.repo_commits).forEach((id) => {
          const tempName = json.repo_info[id];
          const tempX = json.repo_commits[id];
          const tempY = [];
          for (let i = 0; i < json.repo_commits[id].length; i++) {
            tempY.push(i);
          }
          // There may be future problems coming from this
          // As changing state is async and not immediate
          // this.state.data.push(new Item(tempName, tempX, tempY));

          const generatedColor = randomColor();
          console.log(generatedColor);

          temp.push({
            name: tempName,
            x: tempX,
            y: tempY,
            type: 'scatter',
            mode: 'lines+markers',
            // This is currently commented out as plotly generates colours for them
            // albeit not random, but works well enough
            // line: {
            //   color: generatedColor,
            // },
            // marker: {
            //   color: 'rgb(0, 0, 0)',
            // },
          });
        });
      }

      this.setState({
        layout: { title: 'This is a set state title ---TODO--- ' },
        data: temp,
        // Run a callback through setState to ensure next function has access to data
      }, () => console.log('Callback console log', this.state.fetchData));
    } catch (error) { // While going through the function, catch any errors
      console.log(error);
    }

    // Reference for how setting state affects the graph
    // this.setState({
    //   data: [{
    //     x: [1, 2, 3, 4, 5],
    //     y: [1, 2, 3, 4, 5],
    //     type: 'scatter',
    //     mode: 'lines+markers',
    //     marker: { color: 'blue' },
    //   }],
    // });

    // Add a count to routeInt at the end of every iteration
    // This also resets it to 0 when it is over the amount the length of the array
    if (routeInt === (ROUTES.length - 1)) {
      routeInt = 0;
    } else {
      routeInt++;
    }
  }

  tick() {
    // This is used for when the interval that was set was for one second
    // this.setState((prevState) => ({
    //   // changeSeconds + 1 as original state is 1
    //   // This is because 0 / n == 0
    //   // To avoid having it be infinitely 0, og. value is set to 0
    //   seconds: prevState.seconds % (changeSeconds + 1) === 0 ? 1 : prevState.seconds + 1,
    // }));

    // Run the getGraphData Function every iteration of tick()
    this.getGraphData(routeInt);
  }

  render() {
    return (
      <div>
        {/* <div>
          <Plot
            data={this.state.data}
            layout={this.state.layout}
            // frames={this.state.frames}
            // config={this.state.config}
            onInitialized={(figure) => this.setState(figure)}
            onUpdate={(figure) => this.setState(figure)}
          />
        </div> */}
        <LeaderBoard />
      </div>
    );
  }
}

export default App;
