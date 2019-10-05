import React from 'react';
import Plot from 'react-plotly.js';
import RecentCommits from './Table';
import './App.css';


// Global variables that will be used
const ROUTES = [
  'http://localhost/commits/users',
  'http://localhost/commits/repos',
  'http://localhost/commits/commit-tags',
];
const changeSeconds = 3;
let routeInt = 0;


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      layout: {
        title: 'Starting title',
        width: 800,
        height: 600,
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
      }, {
        dataField: 'name',
        text: 'Name',
      }, {
        dataField: 'repoName',
        text: 'Repository Name',
      }, {
        dataField: 'commitMessage',
        text: 'Commit Message',
      }],
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
    } catch (error) { // While going through the function, catch any errors
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
    const commitsKey = partialKey + '_commits';
    const commitsInfo = partialKey + '_info';

    Object.keys(json[commitsKey]).forEach((id) => {
      const tempName = json[commitsInfo][id];
      const tempX = json[commitsKey][id];
      const tempY = [];
      for (let i = 0; i < json[commitsKey][id].length; i++) {
        tempY.push(i);
      }
      temp.push({
        name: tempName,
        x: tempX,
        y: tempY,
        type: 'scatter',
        mode: 'lines+markers',
      });
    });
    this.setState({
      layout: { title: 'This is a set state title ---TODO--- ' },
      data: temp,
      // Run a callback through setState to ensure next function has access to data
    });
    // }, () => console.log('Callback console log', this.state.fetchData));
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
    let render;
    if (routeInt !== ROUTES.length - 1) {
      render = <Plot data={this.state.data} layout={this.state.layout} />;
    } else {
      render = <RecentCommits data={this.state.tableData} columns={this.state.tableColumn} />;
    }
    return (
      <div>
        {render}
      </div>
      // <div>
      //   <div>
      //     <Plot
      //       data={this.state.data}
      //       layout={this.state.layout}
      //       // frames={this.state.frames}
      //       // config={this.state.config}
      //       onInitialized={(figure) => this.setState(figure)}
      //       onUpdate={(figure) => this.setState(figure)}
      //     />
      //   </div>
      //   <RecentCommits data={this.state.tableData} columns={this.state.tableColumn} />
      // </div>
    );
  }
}

export default App;
