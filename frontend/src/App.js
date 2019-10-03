import React from 'react';
import Plot from 'react-plotly.js';
// import logo from './logo.svg';

import './App.css';

class App extends React.Component {
  componentDidMount() {
    fetch('http://localhost/test')
      .then((response) => {
        if (response.status !== 200) {
          console.log(
            'Looks like there was a problem. Status Code: ' + response.status,
          );
          return;
        }

        // Examine the text in the response
        response.json().then((data) => {
          console.log(data);
        });
      })
      .catch((err) => {
        console.log('Fetch Error :-S', err);
      });
  }

  render() {
    return (
      <Plot
        data={[
          {
            x: [1, 2, 3],
            y: [2, 6, 3],
            type: 'scatter',
            mode: 'lines+points',
            marker: { color: 'red' },
          },
          { type: 'bar', x: [1, 2, 3], y: [2, 5, 3] },
        ]}
        layout={{ width: 800, height: 600, title: 'A Fancy Plot' }}
      />
    );
  }
}

// class App extends React.Component {
//   componentDidMount() {
//     fetch('http://localhost/test')
//       .then((response) => {
//         if (response.status !== 200) {
//           console.log(
//             'Looks like there was a problem. Status Code: ' + response.status,
//           );
//           return;
//         }

//         // Examine the text in the response
//         response.json().then((data) => {
//           console.log(data);
//         });
//       })
//       .catch((err) => {
//         console.log('Fetch Error :-S', err);
//       });
//   }

//   render() {
//     return (
//       <div className="App">
//         <header className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//           <p>
//             Edit
//             <code>src/App.js</code>
//             and save to reload.
//           </p>

//           <a
//             className="App-link"
//             href="https://reactjs.org"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             Learn React
//           </a>
//         </header>
//       </div>
//     );
//   }
// }

export default App;
