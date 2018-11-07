/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

// returns commits[0], commits[1]
// commits[0] - users
// commits[1] - commits for user


// Functions order at the moment
/*
commits - bar vertical
commits - bar horizontal
commits over time - line graph
additions over time - line graph
deletions over time - line graph
lines of code over time - line graph
*/

// const values
const fadeIn = 3000
const fadeOut = 3000
const waitingTime = 1500000
const animationTime = 1000
const divWidth = 1248
const divHeight = 648

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

// return {'time_frame' : time_frame, 'total' : total, 'groups' : groups, 'users' : users}

function getAllOverTime() {
  var returnValue
  $.ajax({
    type: 'GET',
    url: 'getallovertime',
    async: false,
    success: function (data) {
      returnValue = data
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

function getDeletionsOverTime () {
  var returnValue
  $.ajax({
    type: 'GET',
    url: '/deletionsovertime',
    async: false,
    success: function (data) {
      returnValue = data
    }
  })
  return returnValue
}

function getLocOverTime () {
  var returnValue
  $.ajax({
    type: 'GET',
    url: '/locovertime',
    async: false,
    success: function (data) {
      returnValue = data
    }
  })
  return returnValue
}

function getLocLangOverTime () {
  var returnValue
  $.ajax({
    type: 'GET',
    url: '/loclangovertime',
    async: false,
    success: function (data) {
      returnValue = data
    }
  })
  return returnValue
}

// MISC FUNCTIONS -------------
// SLEEP Function
function sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time))
}

function clearGraph () {
  Plotly.purge('myDiv')
}

function animateOut () {
  $('#myDiv').addClass('animated fadeOut')
}

function animateOutIn () {
  $('#myDiv').removeClass('animated fadeOut')
  $('#myDiv').addClass('animated fadeIn')
}

function graphOut (firstclassfunction) {
  // waiting time
  sleep(waitingTime).then(() => {
    // animate fading out the graph
    animateOut()
    // this sleep is to wait for the animation out to complete
    sleep(animationTime).then(() => {
      firstclassfunction()
    })
  })
}

function notNull (thing) {
  if (thing === null) {
    return 0
  } else {
    return thing
  }
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

// PLOTTING FUNCTIONS - PLOTTING  - SOFT-CODED

// --------------------------------------
function manipulateOverTimeGroupsCommits() {

  // do some processing of the data i get from the getAllOverTime() function
  // put them into the flexibleOverTimeGroups(with alot of parameters)
  // call that

  var title = 'Over Time Commits - Groups'
  var xAxisTitle = 'Groups'
  var yAxisTitle = 'Commits'
  var dataArray = []

  myData = getAllOverTime()
  console.log("from manipulateOverTimeGroupsCommits : ", myData)

  timeData = myData['time_frame']
  timeDataInt = []

  // make all my timeData into an Int
  for (var i = 0; i < timeData.length; i++) {
    timeDataInt.push(parseInt(timeData[i]))
  }

  groupKeys = Object.keys(myData['groups']['commits'])
  for (var j = 0; j < Object.keys(myData['groups']['commits']).length; j++) {
    eachVarObject = {}

    yValues = myData['groups']['commits'][groupKeys[j]]
    console.log(yValues)

    eachVarObject['x'] = timeDataInt
    eachVarObject['y'] = yValues
    eachVarObject['type'] = 'lines+markers'
    eachVarObject['name'] = String(groupKeys[j])
    // randomise the colours
    eachVarObject['marker'] = { color: String(randomColours(1)), size: 8}
    // make the line thicker
    eachVarObject['line'] = { 'width': 4 }

    dataArray.push(eachVarObject)
  }

  flexibleOverTimeGroups(title, xAxisTitle, yAxisTitle, dataArray)
}

function manipulateOverTimeGroupsAdditions() {
  var title = 'Over Time Additions - Groups'
  var xAxisTitle = 'Groups'
  var yAxisTitle = 'Additions'
  var dataArray = []

  myData = getAllOverTime()
  console.log('from manipulateOverTimeGroupsAdditions : ', myData)

  timeData = myData['time_frame']
  timeDataInt = []

  // make all my timeData into an Int
  for (var i = 0; i < timeData.length; i++) {
    timeDataInt.push(parseInt(timeData[i]))
  }

  groupKeys = Object.keys(myData['groups']['additions'])
  for (var j = 0; j < Object.keys(myData['groups']['additions']).length; j++) {
    eachVarObject = {}

    yValues = myData['groups']['additions'][groupKeys[j]]
    console.log(yValues)

    eachVarObject['x'] = timeDataInt
    eachVarObject['y'] = yValues
    eachVarObject['type'] = 'lines+markers'
    eachVarObject['name'] = String(groupKeys[j])
    // randomise the colours
    eachVarObject['marker'] = { color: String(randomColours(1)), size: 8}
    // make the line thicker
    eachVarObject['line'] = { 'width': 4 }

    dataArray.push(eachVarObject)
  }

  flexibleOverTimeGroups(title, xAxisTitle, yAxisTitle, dataArray)
}

function manipulateOverTimeGroupsDeletions() {
  var title = 'Over Time Deletions - Groups'
  var xAxisTitle = 'Groups'
  var yAxisTitle = 'Deletions'
  var dataArray = []

  myData = getAllOverTime()
  console.log('from manipulateOverTimeGroupsDeletions : ', myData)

  timeData = myData['time_frame']
  timeDataInt = []

  // make all my timeData into an Int
  for (var i = 0; i < timeData.length; i++) {
    timeDataInt.push(parseInt(timeData[i]))
  }

  groupKeys = Object.keys(myData['groups']['deletions'])
  for (var j = 0; j < Object.keys(myData['groups']['deletions']).length; j++) {
    eachVarObject = {}

    yValues = myData['groups']['deletions'][groupKeys[j]]
    console.log(yValues)

    eachVarObject['x'] = timeDataInt
    eachVarObject['y'] = yValues
    eachVarObject['type'] = 'lines+markers'
    eachVarObject['name'] = String(groupKeys[j])
    // randomise the colours
    eachVarObject['marker'] = { color: String(randomColours(1)), size: 8}
    // make the line thicker
    eachVarObject['line'] = { 'width': 4 }

    dataArray.push(eachVarObject)
  }


  flexibleOverTimeGroups(title, xAxisTitle, yAxisTitle, dataArray)
}

function flexibleOverTimeGroups (titleInput, xInput, yInput, graphData) {

  var data = graphData

  var layout = {
    title: titleInput,
    width: divWidth,
    height: divHeight,
    hovermode: 'none',
    xaxis: {
      title: xInput,
      autotick: false
    },
    yaxis: {
      title: yInput,
      autotick: true
    },
    font: {
      family: 'Mali',
      size: 18,
      color: '#7f7f7f'
    }
  }

  Plotly.newPlot('myDiv', data, layout)

  animateOutIn()

  // waiting time
  sleep(waitingTime).then(() => {
    // animate fading out the graph
    animateOut()
    // this sleep is to wait for the animation out to complete
    sleep(animationTime).then(() => {
      additionsOverTime()
    })
  })
}

// --------------------------------------

function manipulateOverTimeMultiCommits () {

  var title = 'Over Time Commits - Users'
  var xAxisTitle = 'Users'
  var yAxisTitle = 'Commits'
  var dataArray = []

  myData = getAllOverTime()
  console.log('from manipulateOverTimeMultiCommits : ', myData)

  timeData = myData['time_frame']
  timeDataInt = []

  // make all my timeData into an Int
  for (var i = 0; i < timeData.length; i++) {
    timeDataInt.push(parseInt(timeData[i]))
  }

  userKeys  = Object.keys(myData['users']['commits'])
  for (var j = 0; j < Object.keys(myData['users']['commits']).length; j++) {
    eachVarObject = {}

    yValues = myData['users']['commits'][userKeys[j]]
    console.log(yValues)

    eachVarObject['x'] = timeDataInt
    eachVarObject['y'] = yValues
    eachVarObject['type'] = 'lines+markers'
    eachVarObject['name'] = String(userKeys[j])
    // randomise the colours
    eachVarObject['marker'] = { color: String(randomColours(1)), size: 8}
    // make the line thicker
    eachVarObject['line'] = { 'width': 4 }

    dataArray.push(eachVarObject)
  }


  flexibleOverTimeMulti(title, xAxisTitle, yAxisTitle, dataArray)
}

function manipulateOverTimeMultiAdditions () {

  var title = 'Over Time Additions - Users'
  var xAxisTitle = 'Users'
  var yAxisTitle = 'Additions'
  var dataArray = []

  myData = getAllOverTime()
  console.log('from manipulateOverTimeGroupsAdditions : ', myData)

  timeData = myData['time_frame']
  timeDataInt = []

  // make all my timeData into an Int
  for (var i = 0; i < timeData.length; i++) {
    timeDataInt.push(parseInt(timeData[i]))
  }

  userKeys  = Object.keys(myData['users']['additions'])
  for (var j = 0; j < Object.keys(myData['users']['additions']).length; j++) {
    eachVarObject = {}

    yValues = myData['users']['additions'][userKeys[j]]
    console.log(yValues)

    eachVarObject['x'] = timeDataInt
    eachVarObject['y'] = yValues
    eachVarObject['type'] = 'lines+markers'
    eachVarObject['name'] = String(userKeys[j])
    // randomise the colours
    eachVarObject['marker'] = { color: String(randomColours(1)), size: 8}
    // make the line thicker
    eachVarObject['line'] = { 'width': 4 }

    dataArray.push(eachVarObject)
  }

  flexibleOverTimeMulti(title, xAxisTitle, yAxisTitle, dataArray)
}

function manipulateOverTimeMultiDeletions () {

  var title = 'Over Time Deletions - Users'
  var xAxisTitle = 'Users'
  var yAxisTitle = 'Deletions'
  var dataArray = []

  myData = getAllOverTime()
  console.log('from manipulateOverTimeGroupsAdditions : ', myData)

  timeData = myData['time_frame']
  timeDataInt = []

  // make all my timeData into an Int
  for (var i = 0; i < timeData.length; i++) {
    timeDataInt.push(parseInt(timeData[i]))
  }

  userKeys  = Object.keys(myData['users']['deletions'])
  for (var j = 0; j < Object.keys(myData['users']['deletions']).length; j++) {
    eachVarObject = {}

    yValues = myData['users']['deletions'][userKeys[j]]
    console.log(yValues)

    eachVarObject['x'] = timeDataInt
    eachVarObject['y'] = yValues
    eachVarObject['type'] = 'lines+markers'
    eachVarObject['name'] = String(userKeys[j])
    // randomise the colours
    eachVarObject['marker'] = { color: String(randomColours(1)), size: 8}
    // make the line thicker
    eachVarObject['line'] = { 'width': 4 }

    dataArray.push(eachVarObject)
  }

  flexibleOverTimeMulti(title, xAxisTitle, yAxisTitle, dataArray)
}

function flexibleOverTimeMulti (titleInput, xInput, yInput, graphData) {

  var data = graphData

  var layout = {
    title: titleInput,
    width: divWidth,
    height: divHeight,
    hovermode: 'none',
    xaxis: {
      title: xInput,
      autotick: false
    },
    yaxis: {
      title: yInput,
      autotick: true
    },
    font: {
      family: 'Mali',
      size: 18,
      color: '#7f7f7f'
    }
  }

  Plotly.newPlot('myDiv', data, layout)

  animateOutIn()

  // waiting time
  sleep(waitingTime).then(() => {
    // animate fading out the graph
    animateOut()
    // this sleep is to wait for the animation out to complete
    sleep(animationTime).then(() => {
      additionsOverTime()
    })
  })

}

// PLOTTING FUNCTIONS - PLOTTING  - HARD-CODED
function commitsBarChartVertical () {
  var coords = getCommits()
  // console.log(coords)

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
    title: 'Commits per user',
    width: divWidth,
    height: divHeight,
    xaxis: {
      title: 'Users',
      automargin: true
    },
    yaxis: {
      title: 'Amount of Commits',
      automargin: true
    },
    bargap: 0.1,
    font: {
      family: 'Mali',
      size: 18,
      color: '#7f7f7f'
    }
  }

  Plotly.newPlot('myDiv', data, layout)

  animateOutIn()

  // waiting time

  sleep(waitingTime).then(() => {
    // animate fading out the graph
    animateOut()
    // this sleep is to wait for the animation out to complete
    sleep(animationTime).then(() => {
      clearGraph()
      commitsBarChartHorizontal()
    })
  })
}

function commitsBarChartHorizontal () {
  var coords = getCommits()
  // console.log(coords)

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
    title: 'Commits per user',
    width: divWidth,
    height: divHeight,
    bargap: 0.1,
    xaxis: {
      title: 'Users',
      automargin: true
    },
    yaxis: {
      title: 'Amount of Commits',
      automargin: true
    },
    font: {
      family: 'Mali',
      size: 18,
      color: '#7f7f7f'
    }
  }

  Plotly.newPlot('myDiv', data, layout)

  // animateOutIn()
  animateOutIn()

  // waiting time
  sleep(waitingTime).then(() => {
    // animate fading out the graph
    animateOut()
    // this sleep is to wait for the animation out to complete
    sleep(animationTime).then(() => {
      commitsOverTime()
    })
  })
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
    title: 'Commits Over Time / Commits 𝚫 Time',
    width: divWidth,
    height: divHeight,
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

  animateOutIn()
  // graphOut(additionsOverTime())

  // waiting time
  sleep(waitingTime).then(() => {
    // animate fading out the graph
    animateOut()
    // this sleep is to wait for the animation out to complete
    sleep(animationTime).then(() => {
      additionsOverTime()
    })
  })
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
    width: divWidth,
    height: divHeight,
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

  animateOutIn()
  // graphOut(deletionsOverTime())

  // waiting time
  sleep(waitingTime).then(() => {
    // animate fading out the graph
    animateOut()
    // this sleep is to wait for the animation out to complete
    sleep(animationTime).then(() => {
      deletionsOverTime()
    })
  })
}

function deletionsOverTime () {
  var data = []
  jsonCommits = getDeletionsOverTime()
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
    title: 'Deletions Over Time',
    width: divWidth,
    height: divHeight,
    hovermode: 'none',
    xaxis: {
      title: 'Time of the Day',
      autotick: false
    },
    yaxis: {
      title: 'Amount of Deletions',
      autotick: true
    },
    font: {
      family: 'Mali',
      size: 18,
      color: '#7f7f7f'
    }
  }

  Plotly.newPlot('myDiv', data, layout)

  animateOutIn()
  // graphOut(locOverTime())

  // waiting time
  sleep(waitingTime).then(() => {
    // animate fading out the graph
    animateOut()
    // this sleep is to wait for the animation out to complete
    sleep(animationTime).then(() => {
      locOverTime()
    })
  })
}

function locOverTime () {
  var data = []
  jsonLoc = getLocOverTime()
  console.log(jsonLoc)

  jsonKeys = Object.keys(jsonLoc['users'])
  var timeValue = jsonLoc['time']
  testArray = []

  for (var j = 0; j < timeValue.length; j++) {
    testArray.push(parseInt(timeValue[j]))
  }

  for (var i = 0; i < Object.keys(jsonLoc['users']).length; i++) {
    tempData = {}

    var yvalue = jsonLoc['users'][jsonKeys[i]]

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
    title: 'Lines of Code Over Time',
    width: divWidth,
    height: divHeight,
    hovermode: 'none',
    xaxis: {
      title: 'Time of the Day',
      autotick: false
    },
    yaxis: {
      title: 'Lines of Code',
      autotick: true
    },
    font: {
      family: 'Mali',
      size: 18,
      color: '#7f7f7f'
    }
  }

  Plotly.newPlot('myDiv', data, layout)

  animateOutIn()

  // waiting time
  sleep(waitingTime).then(() => {
    // animate fading out the graph
    animateOut()
    // this sleep is to wait for the animation out to complete
    sleep(animationTime).then(() => {
      locLanguageOverTimeBar()
    })
  })
}


function locLanguageOverTimeBar () {
  var data = []
  jsonLoc = getLocLangOverTime()
  console.log(jsonLoc)

  jsonKeys = Object.keys(jsonLoc['language'])
  var timeValue = jsonLoc['time']
  testArray = []

  for (var j = 0; j < timeValue.length; j++) {
    testArray.push(parseInt(timeValue[j]))
  }

  for (var i = 0; i < Object.keys(jsonLoc['language']).length; i++) {
    tempData = {}

    var yvalue = jsonLoc['language'][jsonKeys[i]]

    console.log(timeValue)

    tempData['x'] = testArray
    tempData['y'] = yvalue
    tempData['type'] = 'bar'
    tempData['name'] = String(jsonKeys[i])
    tempData['marker'] = { color: String(randomColours(1)), size: 2 }
    // line thickness
    tempData['line'] = { 'width': 4 }

    data.push(tempData)
  }

  var layout = {
    title: 'Lines of Code Per Language Over Time - Bar',
    width: divWidth,
    height: divHeight,
    hovermode: 'none',
    xaxis: {
      title: 'Time of the Day',
      autotick: false
    },
    yaxis: {
      title: 'Lines of Code Per Language',
      autotick: true
    },
    font: {
      family: 'Mali',
      size: 18,
      color: '#7f7f7f'
    }
  }

  Plotly.newPlot('myDiv', data, layout)
  animateOutIn()

  // waiting time
  sleep(waitingTime).then(() => {
    // animate fading out the graph
    animateOut()
    // this sleep is to wait for the animation out to complete
    sleep(animationTime).then(() => {
      commitsBarChartVertical()
    })
  })
}

function locLanguageOverTimeLine () {
  var data = []
  jsonLoc = getLocLangOverTime()
  console.log(jsonLoc)

  jsonKeys = Object.keys(jsonLoc['language'])
  var timeValue = jsonLoc['time']
  testArray = []

  for (var j = 0; j < timeValue.length; j++) {
    testArray.push(parseInt(timeValue[j]))
  }

  for (var i = 0; i < Object.keys(jsonLoc['language']).length; i++) {
    tempData = {}

    var yvalue = jsonLoc['language'][jsonKeys[i]]

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
    title: 'Lines of Code Per Language Over Time - Line',
    width: divWidth,
    height: divHeight,
    hovermode: 'none',
    xaxis: {
      title: 'Time of the Day',
      autotick: false
    },
    yaxis: {
      title: 'Lines of Code Per Language',
      autotick: true
    },
    font: {
      family: 'Mali',
      size: 18,
      color: '#7f7f7f'
    }
  }

  Plotly.newPlot('myDiv', data, layout)
  animateOutIn()

  // waiting time
  sleep(waitingTime).then(() => {
    // animate fading out the graph
    animateOut()
    // this sleep is to wait for the animation out to complete
    sleep(animationTime).then(() => {
      commitsBarChartVertical()
    })
  })
}


// START - display start
$(document).ready(function () {

  // locLanguageOverTimeBar()

  // manipulateOverTimeGroupsCommits()
  // manipulateOverTimeGroupsAdditions()
  // manipulateOverTimeGroupsDeletions()

  // manipulateOverTimeMultiCommits()
  // manipulateOverTimeMultiAdditions()
  manipulateOverTimeMultiDeletions()

  // getAllOverTime()

  // commitsBarChartVertical()
  // commitsOverTime()

  // method to run it, find a way to sleep each function
  // var functionArray = [
  //   function () { commitsBarChartVertical() },
  //   function () { commitsBarChartHorizontal() },
  //   function () { commitsOverTime() },
  //   function () { deletionsOverTime() },
  //   function () { locOverTime() }
  // ]

  // var length = functionArray.length
  // console.log(length)
  // var counter = 0

  // while (true) {
  //   if (counter === length - 1) {
  //     sleep(2000).then(() => {
  //       // setTimeout(functionArray[counter](), 5000)
  //       functionArray[counter]()
  //       counter = 0
  //       console.log('hello this is max')
  //     })
  //   } else {
  //     sleep(2000).then(() => {
  //       // setTimeout(functionArray[counter](), 5000)
  //       functionArray[counter]()
  //       counter++
  //       console.log('bye')
  //     })
  //   }
  // }
})
