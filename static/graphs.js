/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

// returns commits[0], commits[1]
// commits[0] - users
// commits[1] - commits for user

// API PINGS
function getCommits () {
  var userArray = []
  var commitsArray = []
  var returnValue
  $.ajax({
    type: 'GET',
    url: '/usercommits',
    async: false,
    success: function (data) {
      keys = Object.keys(data)

      for (var i = 0; i < Object.keys(data).length; i++) {
        userArray.push(keys[i])
        commitsArray.push(data[keys[i]])
      }

      var returnArray = [userArray, commitsArray]
      returnValue = returnArray
    }
  })
  return returnValue
}

function getCommitsOverTime () {
  var returnValue
  $.ajax({
    type: 'GET',
    url: '/commitsovertime',
    async: false,
    success: function (data) {
      returnValue = data
    }
  })
  return returnValue
}

function getAdditionsOverTime () {
  var returnValue
  $.ajax({
    type: 'GET',
    url: '/additionsovertime',
    async: false,
    success: function (data) {
      returnValue = data
    }
  })
  return returnValue
}

// MISC FUNCTIONS
function sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time))
}

function sortNumberDescMethod (a, b) {
  return b - a
}

function sortNumberAscMethod (a, b) {
  return a - b
}

function sortedArrayDesc (number, limit) {
  totalAmount = number
  totalLimit = limit
  y = []

  for (var i = 0; i < totalAmount; i++) {
    y.push(Math.floor((Math.random() * totalLimit) + 1))
  }

  sortedArray = y.sort(sortNumberDescMethod)
  return sortedArray
}

function sortedArrayAsc (number, limit) {
  totalAmount = number
  totalLimit = limit
  y = []

  for (var i = 0; i < totalAmount; i++) {
    y.push(Math.floor((Math.random() * totalLimit) + 1))
  }

  console.log(y)

  sortedArray = y.sort(sortNumberAscMethod)
  return sortedArray
}

function getStudentArray (amount) {
  totalAmount = amount
  string = 'student'
  studentArray = []

  for (var i = 1; i < totalAmount; i++) {
    studentArray.push(string + i)
  }
  console.log(studentArray)
  return studentArray
}

function randomColours (amount) {
  colourArray = []
  for (var i = 0; i < amount; i++) {
    number1 = Math.floor((Math.random() * 255) + 1)
    number2 = Math.floor((Math.random() * 255) + 1)
    number3 = Math.floor((Math.random() * 255) + 1)
    colourArray.push('rgb(' + number1 + ',' + number2 + ',' + number3 + ')')
  }
  return colourArray
}

// TODO : do gradient randomColours

// PLOTTING FUNCTIONS - PLOTTING
function commitsBarChartVertical () {
  var coords = getCommits()
  console.log(coords)

  var trace1 = {
    // x: getStudentArray(20),
    // y: sortedArrayDesc(20, 30),
    x: coords[0],
    y: coords[1],
    name: 'User Commits',
    // marker: { color: ['rgb(55, 83, 109)', 'rgb(120, 120, 120)', 'rgb(255, 255, 255)'] },
    marker: { color: randomColours(coords[0].length) },
    type: 'bar'
  }

  var data = [trace1]

  var layout = {
    title: 'Test User Commits Layout',
    width: 800,
    height: 800,
    xaxis: {
      title: 'Users'
    },
    yaxis: {
      title: 'Amount of Commits'
    },
    bargap: 0.1,
    font: {
      family: 'Mali',
      size: 18,
      color: '#7f7f7f'
    }
  }

  Plotly.newPlot('myDiv', data, layout)
}

function commitsBarChartHorizontal () {
  var coords = getCommits()
  console.log(coords)

  var trace1 = {
    x: coords[1],
    y: coords[0],
    name: 'User Commits',
    marker: { color: randomColours(coords[0].length) },
    orientation: 'h',
    type: 'bar'
  }

  var data = [trace1]

  var layout = {
    title: 'Test User Commits Layout',
    width: 800,
    height: 800,
    bargap: 0.1,
    xaxis: {
      title: 'Users'
    },
    yaxis: {
      title: 'Amount of Commits'
    },
    font: {
      family: 'Mali',
      size: 18,
      color: '#7f7f7f'
    }
  }

  Plotly.newPlot('myDiv', data, layout)
}

function commitsOverTime () {
  var data = []
  jsonCommits = getCommitsOverTime()
  console.log(jsonCommits)

  jsonKeys = Object.keys(jsonCommits['users'])
  var timeValue = jsonCommits['time']
  testArray = []

  for (var j = 0; j < timeValue.length; j++) {
    testArray.push(parseInt(timeValue[j]))
  }

  for (var i = 0; i < Object.keys(jsonCommits['users']).length; i++) {
    tempData = {}

    var yvalue = jsonCommits['users'][jsonKeys[i]]

    console.log(timeValue)

    tempData['x'] = testArray
    tempData['y'] = yvalue
    tempData['type'] = 'scatter'
    tempData['name'] = String(jsonKeys[i])
    tempData['marker'] = { color: String(randomColours(1)), size: 2 }
    // line thickness
    tempData['line'] = { 'width': 4 }

    data.push(tempData)
  }

  var layout = {
    title: 'Commits Over Time',
    width: 800,
    height: 800,
    hovermode: 'none',
    xaxis: {
      title: 'Time of the Day',
      autotick: false
    },
    yaxis: {
      title: 'Amount of Commits',
      autotick: true
    },
    font: {
      family: 'Mali',
      size: 18,
      color: '#7f7f7f'
    }
  }

  Plotly.newPlot('myDiv', data, layout)
}

function additionsOverTime () {
  var data = []
  jsonCommits = getAdditionsOverTime()
  console.log(jsonCommits)

  jsonKeys = Object.keys(jsonCommits['users'])
  var timeValue = jsonCommits['time']
  testArray = []

  for (var j = 0; j < timeValue.length; j++) {
    testArray.push(parseInt(timeValue[j]))
  }

  for (var i = 0; i < Object.keys(jsonCommits['users']).length; i++) {
    tempData = {}

    var yvalue = jsonCommits['users'][jsonKeys[i]]

    console.log(timeValue)

    tempData['x'] = testArray
    tempData['y'] = yvalue
    tempData['type'] = 'scatter'
    tempData['name'] = String(jsonKeys[i])
    tempData['marker'] = { color: String(randomColours(1)), size: 2 }
    // line thickness
    tempData['line'] = { 'width': 4 }

    data.push(tempData)
  }

  var layout = {
    title: 'Additions Over Time',
    width: 800,
    height: 800,
    hovermode: 'none',
    xaxis: {
      title: 'Time of the Day',
      autotick: false
    },
    yaxis: {
      title: 'Amount of Additions',
      autotick: true
    },
    font: {
      family: 'Mali',
      size: 18,
      color: '#7f7f7f'
    }
  }

  Plotly.newPlot('myDiv', data, layout)
}

function showEmptyGraph () {
  var layout = {
    title: 'Empty Graph Hello',
    width: 800,
    height: 800,
    font: {
      family: 'Mali',
      size: 18,
      color: '#7f7f7f'
    }
  }
  Plotly.newPlot('myDiv', layout)
}

function clearGraph () {
  Plotly.purge('myDiv')
}

function fadeInOut (fadeOutTime, fadeInTime) {
  sleep(fadeOutTime).then(() => {
    $('#myDiv').addClass('animated fadeOut')
    sleep(fadeInTime).then(() => {
      // clear graph just in case
      clearGraph()
      additionsOverTime()
      $('#myDiv').removeClass('animated fadeOut')
      $('#myDiv').addClass('animated fadeIn')
    })
  })
}

// START - display start
$(document).ready(function () {
  commitsOverTime()
  fadeInOut(2000, 2000)
})
