import React from 'react';
import Plot from 'react-plotly.js';
import ListGroup from 'react-bootstrap/ListGroup';
import RecentCommits from './Table';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// Global variables that will be used
const ROUTES = [
  'http://localhost/commits/users',
  'http://localhost/commits/repos',
  'http://localhost/commit-tags/1',
];

const TITLES = [
  'User Commits Over Time',
  'Repository Commits Over Time',
  'Recent Commits',
];

const changeSeconds = 10;
let routeInt = 0;


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      layout: {
        title: 'Starting title',
        width: 800,
        height: 600,
        xaxis: {
          type: 'date',
          title: 'Time',
        },
        yaxis: {
          title: 'Number of commits',
        },
      },
      data: [{
        x: [1, 2, 3],
        y: [1, 2, 3],
        type: 'scatter',
        mode: 'lines+markers',
        marker: { color: 'red' },
      }],
      tableData: [],
      tableColumn: [{
        dataField: 'id',
        text: 'No.',
        sort: true,
      }, {
        dataField: 'name',
        text: 'Name',
        sort: true,
      }, {
        dataField: 'repoName',
        text: 'Repository Name',
        sort: true,
      }, {
        dataField: 'commitMessage',
        text: 'Commit Message',
      }],
    };

    // event handler binds
    this.testClick = this.handleClick.bind(this);
  }

  // When the component is mounted, start the interval with a tick of every second
  // It will also start the async function getGraphData
  componentDidMount() {
    console.log('Mounted');

    this.interval = setInterval(() => this.tick(), changeSeconds * 1000);
  }

  componentWillUnmount() {
    // To avoid memory leaking issues, clear the interval that is set
    // during componentDidMount
    clearInterval(this.interval);
  }

  // routeIndex here refers to the index, routeInt -> declared in the global scope
  // will be passed through here
  async getGraphData(routeIndex) {
    try {
      const response = await fetch(ROUTES[routeIndex]);

      // If the fetch function immediately throws a error
      // Probably a 404 of such, throw an error for debugging purposes
      if (!response.ok) {
        throw Error(response.statusText);
      }
      const json = await response.json();

      console.log(`Currently the index is ${routeInt} which heres to ${ROUTES[routeInt]}`);
      // Parse result differently based on the different apis being used
      if (routeIndex === 0) {
        this.parseGenerics(json, 'user');
      } else if (routeIndex === 1) {
        this.parseGenerics(json, 'repo');
      } else if (routeIndex === 2) {
        const temp = [];
        for (let i = 0; i < json.logs.length; i++) {
          temp.push({
            id: i,
            name: json.logs[i][0],
            repoName: json.logs[i][1],
            commitMessage: json.logs[i][2],
          });
        }

        this.setState({
          tableData: temp,
        });
      }
    } catch (error) { // Attempt to catch any problems while fetching resource
      console.log(error);
    }

    // Add a count to routeInt at the end of every iteration
    // This also resets it to 0 when it is over the amount the length of the array
    if (routeInt === (ROUTES.length - 1)) {
      routeInt = 0;
    } else {
      routeInt++;
    }
  }

  parseGenerics(json, partialKey) {
    const temp = [];
    // Hacky generics key parsing
    // as they are consistent in key names except for [users/repos]
    const commitsKey = partialKey + '_commits';
    const commitsInfo = partialKey + '_info';

    Object.keys(json[commitsKey]).forEach((id) => {
      // Name of each graph, labelled through the legend
      const tempName = json[commitsInfo][id];
      // x-axis is the time
      const tempX = json.time_intervals;
      // y-axis is the amount of commits
      const tempY = json[commitsKey][id];
      temp.push({
        name: tempName,
        x: tempX,
        y: tempY,
        type: 'scatter',
        mode: 'lines+markers',
      });
    });

    // Set state of the graph data
    this.setState({
      data: temp,
    });

    // Separately set state of the layout title
    this.setState((prevState) => ({
      layout: { // object that we want to update
        ...prevState.layout, // keep all other key-value pairs
        title: TITLES[routeInt], // update the value of specific key
      },
    }));
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

  handleClick(index) {
    routeInt = index;
    this.getGraphData(routeInt);
  }

  render() {
    let render;
    if (routeInt !== ROUTES.length - 1) {
      render = <Plot data={this.state.data} layout={this.state.layout} />;
    } else {
      render = <RecentCommits data={this.state.tableData} columns={this.state.tableColumn} />;
    }
    return (
      // id=main is set here to flex the children in this div
      // so that are side by side
      <div id="main">
        <ListGroup>
          <ListGroup.Item onClick={() => this.handleClick(0)}>User Commits Over Time</ListGroup.Item>
          <ListGroup.Item onClick={() => this.handleClick(1)}>Repository Commits Over Time</ListGroup.Item>
          <ListGroup.Item onClick={() => this.handleClick(2)}>Recent Commits</ListGroup.Item>
        </ListGroup>
        {render}
      </div>
    );
  }
}

export default App;
