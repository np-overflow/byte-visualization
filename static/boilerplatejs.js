/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

function getCommits () {
  var userArray = []
  var commitsArray = []
  $.ajax({
    type: 'GET',
    url: '/usercommits',
    async: false,
    success: function (data) {
      keys = Object.keys(data)

      for (i = 0; i < Object.keys(data).length; i++) {
        userArray.push(keys[i])
        commitsArray.push(data[keys[i]])
      }

      var returnArray = [userArray, commitsArray]
      returnValue = returnArray
    }
  })
  return returnValue
}

function plotLine () {
  var trace1 = {
    x: [1, 2, 3, 4],
    y: [10, 15, 13, 17],
    type: 'scatter'
  }

  var trace2 = {
    x: [1, 2, 3, 4],
    y: [16, 5, 11, 9]
  }

  var data = [trace1, trace2]

  Plotly.newPlot('myDiv', data)
}

function testArray() {
  $.ajax({
     type: 'GET',
     url: 'loclangovertime',
     async: false,
     success: function (data) {
      console.log(data)
     }
  })
}

// testArray()

// plotLine()
