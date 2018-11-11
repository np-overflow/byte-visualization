/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

// returns commits[0], commits[1]
// commits[0] - users
// commits[1] - commits for user

// Functions order at the moment
/*
order - look at the mainLoop() function - functionArray

TODO: make new colourschemes
- for x amoutn  less use y palette
make for a few colours

- disable zoom for ccertain charts
*/

// GLOBAL VARIALBES TO SET THINGS
const fadeIn = 3000
const fadeOut = 3000

// TODO : set the timer correctly on the day itself
// 1000 - 1 seconds
const startWaitTime = 1000 // 1 seconds
const waitingTime = 2000 // 5 seconds

// fairly useless thing
const animationTime = 1000

// const divWidth = 1248
// const divHeight = 648

// const divWidth = 1061
// const divHeight = 842

const divWidth = 1555
const divHeight = 917

// colours
// default backgruond colours
const bgColor = 'rgb(253,255,252)'
// dont think the hex color will be needed but just here in case
const hexBgColor = 'FDFFFC'

// fonts related stuff
const fontFamily = 'Nunito'
// const fontFamily = 'Mali'
const fontColor = '#354050'
const fontSize = 16

// API PINGS
function getAllOverTimeCumulative () {
  var returnValue
  $.ajax({
    type: 'GET',
    url: 'getallovertimecumulative',
    async: false,
    success: function (data) {
      returnValue = data
    }
  })
  return returnValue
}
// return {'time_frame' : time_frame, 'total' : total, 'groups' : groups, 'users' : users}

function getAllOverTimeNonCumulative () {
  var returnValue
  $.ajax({
    type: 'GET',
    url: 'getallovertimenoncumulative',
    async: false,
    success: function (data) {
      returnValue = data
    }
  })
  return returnValue
}

function getGroupsOverTimeDifference () {
  var returnValue
  $.ajax({
    type: 'GET',
    url: 'getgroupsovertimedifference',
    async: false,
    success: function (data) {
      returnValue = data
    }
  })
  return returnValue
}

function getMultiOverTimeDifference () {
  var returnValue
  $.ajax({
    type: 'GET',
    url: 'getmultiovertimedifference',
    async: false,
    success: function (data) {
      returnValue = data
    }
  })
  return returnValue
}

function getLangMultiOvertime () {
  var returnValue
  $.ajax({
    type: 'GET',
    url: 'getlangovertime',
    async: false,
    success: function (data) {
      returnValue = data
    }
  })
  return returnValue
}

function testGetAllOverTimeNonCumulative () {
  returnValue = getAllOverTimeNonCumulative()
  console.log(returnValue['time_frame'])
  console.log(returnValue['commits'])
  console.log(returnValue['additions'])
  console.log(returnValue['deletions'])
}

// COLOUR FUNCTIONS - TODO
function colourGradientRed (number) {
  // rgb - (255, 0, 0)
  // split_numbers - total numbers of the colour intervals
  var splitNumbers = Math.floor(255 / number)
  console.log('split_numbers', split_numbers)
  var returnArray = []
  var counter = 0

  for (var i = 0; i < number; i++) {
    counter += splitumbers
    returnArray.push(counter)
  }

  return returnArray
}

function colourGradientGreen (number) {
  // rgb - (0, 255, 0)
}

function colourGradientBlue (number) {
  // rgb - (0, 0, 255)
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

function randomColors (amount) {
  colorArray = []
  for (var j = 0; j < amount; j++) {
    number1 = Math.floor((Math.random() * 255) + 1)
    number2 = Math.floor((Math.random() * 255) + 1)
    number3 = Math.floor((Math.random() * 255) + 1)
    colorArray.push('rgb(' + number1 + ',' + number2 + ',' + number3 + ')')
  }

  return colorArray
}

function colorPalette (amount) {
  var colorArray = []

  var colorPaletteArray = [
    // #011627 - (1, 22, 39) - darkblue?
    'rgb(' + String(1) + ',' + String(22) + ',' + String(39) + ')',
    // #F71735 - (247, 23, 53) - brightred?
    'rgb(' + String(247) + ',' + String(23) + ',' + String(53) + ')',
    // #7FB069 - (127, 176, 105) - bright-green?
    'rgb(' + String(127) + ',' + String(176) + ',' + String(105) + ')',
    // #7D82B8 - (125, 130, 184) - somewhat light purple
    'rgb(' + String(125) + ',' + String(130) + ',' + String(184) + ')',
    // #2E4057 - (46, 64, 87) - navyblue?
    'rgb(' + String(46) + ',' + String(64) + ',' + String(87) + ')',
    // #DA4167 - (218, 65, 103) - somewhatpink/red?
    'rgb(' + String(218) + ',' + String(65) + ',' + String(103) + ')',
    // 55D6BE - (85, 214, 198) - teal?
    'rgb(' + String(85) + ',' + String(214) + ',' + String(198) + ')',
    // #582B11 - (88, 43, 17) - brown?
    'rgb(' + String(88) + ',' + String(43) + ',' + String(17) + ')',
    // #A1A3F - (161, 161, 63) - somewhat yellow?
    'rgb(' + String(161) + ',' + String(161) + ',' + String(63) + ')',
    // #2F195F - (47, 25, 25) - darkpurple?
    'rgb(' + String(47) + ',' + String(25) + ',' + String(25) + ')',
    // #9E2B25 - (158, 43, 37) - vermillion red or so
    'rgb(' + String(158) + ',' + String(43) + ',' + String(37) + ')'
  ]

  if (amount < colorPaletteArray.length) {
    // do something to colorArray
    for (var i = 0; i < amount; i++) {
      colorArray[i] = colorPaletteArray[i]
    }
  } else {
    // randomise the colors
    for (var j = 0; j < amount; j++) {
      number1 = Math.floor((Math.random() * 255) + 1)
      number2 = Math.floor((Math.random() * 255) + 1)
      number3 = Math.floor((Math.random() * 255) + 1)
      colorArray.push('rgb(' + number1 + ',' + number2 + ',' + number3 + ')')
    }
  }

  console.log(colorArray)

  return colorArray
}

// PLOTTING FUNCTIONS - PLOTTING  - SOFT-CODED

function manipulateTotalAddDel () {
  var title = 'Over Time Total Additions/Deletions'
  var xAxisTitle = 'Time of the day'
  var yAxisTitle = 'Total'
  var dataArray = []

  myData = getAllOverTimeCumulative()
  console.log('from manipulateTotalAddDel : ', myData)

  timeData = myData['time_frame']
  timeDataInt = []

  // make all my timeData into an Int
  for (var i = 0; i < timeData.length; i++) {
    timeDataInt.push(parseInt(timeData[i]))
  }

  var additionYValue = myData['total']['additions']
  var deletionYValue = myData['total']['deletions']

  var colorArray = colorPalette(2)

  // array to store everything and push things in
  dataArray = []
  additionVarObject = {}
  additionVarObject['x'] = timeDataInt
  additionVarObject['y'] = additionYValue
  additionVarObject['type'] = 'lines+markers'
  // additionVarObject['name'] = String(groupKeys[j])
  additionVarObject['name'] = 'Additions'
  // randomise the colours
  additionVarObject['marker'] = { color: String(colorArray[0]), size: 8 }
  // additionVarObject['marker'] = { color: String(colorPalette(1)), size: 8 }
  // make the line thicker
  additionVarObject['line'] = { 'width': 4 }

  deletionVarObject = {}
  deletionVarObject['x'] = timeDataInt
  deletionVarObject['y'] = deletionYValue
  deletionVarObject['type'] = 'lines+markers'
  // deletionVarObject['name'] = String(groupKeys[j])
  deletionVarObject['name'] = 'Deletions'
  // randomise the colours
  deletionVarObject['marker'] = { color: String(colorArray[1]), size: 8 }
  // deletionVarObject['marker'] = { color: String(colorPalette(1)), size: 8 }
  // make the line thicker
  deletionVarObject['line'] = { 'width': 4 }

  dataArray.push(additionVarObject)
  dataArray.push(deletionVarObject)

  flexibleTotalAddDel(title, xAxisTitle, yAxisTitle, dataArray)
}

function manipulateTotalCommits () {
  var title = 'Over Time Total Commits'
  var xAxisTitle = 'Time of the day'
  var yAxisTitle = 'Total'
  var dataArray = []

  myData = getAllOverTimeCumulative()
  console.log('from manipulateTotalCommits : ', myData)

  timeData = myData['time_frame']
  timeDataInt = []

  // make all my timeData into an Int
  for (var i = 0; i < timeData.length; i++) {
    timeDataInt.push(parseInt(timeData[i]))
  }

  yValues = myData['total']['commits']

  // bar chart
  commitVarObject = {}
  commitVarObject['x'] = timeDataInt
  commitVarObject['y'] = yValues
  commitVarObject['type'] = 'bar'
  // commitVarObject['type'] = 'lines+markers'
  // commitVarObject['name'] = String(groupKeys[j])
  commitVarObject['name'] = 'Commits'
  // randomise the colours - colorPalette must be equals to amount of time
  // using timeData.length - it scales with the amount
  commitVarObject['marker'] = { color: colorPalette(timeData.length), size: 8 }
  // make the line thicker
  commitVarObject['line'] = { 'width': 4 }
  dataArray.push(commitVarObject)

  // line chart
  commitVarObjectScatter = {}
  commitVarObjectScatter['x'] = timeDataInt
  commitVarObjectScatter['y'] = yValues
  commitVarObjectScatter['type'] = 'Scatter'
  // commitVarObjectScatter['type'] = 'lines+markers'
  // commitVarObjectScatter['name'] = String(groupKeys[j])
  commitVarObjectScatter['name'] = 'Commits'
  // randomise the colours - colorPalette must be equals to amount of time
  // uses randomColours so that the colors wont conflict with eachother
  commitVarObjectScatter['marker'] = { color: String(randomColors(1)), size: 8 }
  // make the line thicker
  commitVarObjectScatter['line'] = { 'width': 4 }
  dataArray.push(commitVarObjectScatter)

  // difference is that this doesnt have legend while AddDel has legend
  flexibleTotalCommits(title, xAxisTitle, yAxisTitle, dataArray)
}

function flexibleTotalCommits (titleInput, xInput, yInput, graphData) {
  animateOut()

  var data = graphData

  var layout = {
    title: titleInput,
    width: divWidth,
    height: divHeight,
    hovermode: 'none',
    paper_bgcolor: bgColor,
    plot_bgcolor: bgColor,
    showlegend: false,
    xaxis: {
      title: xInput,
      autotick: false
    },
    yaxis: {
      title: yInput,
      autotick: true
    },
    font: {
      family: fontFamily,
      size: fontSize,
      color: fontColor
    }
  }

  Plotly.newPlot('myDiv', data, layout)

  animateOutIn()
}

function flexibleTotalAddDel (titleInput, xInput, yInput, graphData) {
  animateOut()

  var data = graphData

  var layout = {
    title: titleInput,
    width: divWidth,
    height: divHeight,
    hovermode: 'none',
    paper_bgcolor: bgColor,
    plot_bgcolor: bgColor,
    showlegend: true,
    xaxis: {
      title: xInput,
      autotick: false
    },
    yaxis: {
      title: yInput,
      autotick: true
    },
    font: {
      family: fontFamily,
      size: fontSize,
      color: fontColor
    }
  }

  Plotly.newPlot('myDiv', data, layout)

  animateOutIn()
}

// --------------------------------------
function manipulateOverTimeGroupsCommits () {
  // do some processing of the data i get from the getAllOverTime() function
  // put them into the flexibleOverTimeGroups(with alot of parameters)
  // call that

  // var title = 'Over Time Commits - Groups'
  var title = 'Groups - Commits Over Time'
  var xAxisTitle = 'Groups'
  var yAxisTitle = 'Commits'
  var dataArray = []

  myData = getAllOverTimeCumulative()
  console.log('from manipulateOverTimeGroupsCommits : ', myData)

  timeData = myData['time_frame']
  timeDataInt = []

  // make all my timeData into an Int
  for (var i = 0; i < timeData.length; i++) {
    timeDataInt.push(parseInt(timeData[i]))
  }

  var colorArray = colorPalette(Object.keys(myData['groups']['commits']).length)

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
    eachVarObject['marker'] = { color: String(colorArray[j]), size: 8 }
    // eachVarObject['marker'] = { color: String(colorPalette(1)), size: 8 }
    // make the line thicker
    eachVarObject['line'] = { 'width': 4 }

    dataArray.push(eachVarObject)
  }

  flexibleOverTimeGroups(title, xAxisTitle, yAxisTitle, dataArray)
}

function manipulateOverTimeGroupsAdditions () {
  // var title = 'Over Time Additions - Groups'
  var title = 'Groups - Additions Over Time'
  var xAxisTitle = 'Groups'
  var yAxisTitle = 'Additions'
  var dataArray = []

  myData = getAllOverTimeCumulative()
  console.log('from manipulateOverTimeGroupsAdditions : ', myData)

  timeData = myData['time_frame']
  timeDataInt = []

  // make all my timeData into an Int
  for (var i = 0; i < timeData.length; i++) {
    timeDataInt.push(parseInt(timeData[i]))
  }

  var colorArray = colorPalette(Object.keys(myData['groups']['additions']).length)
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
    eachVarObject['marker'] = { color: String(colorArray[j]), size: 8 }
    // eachVarObject['marker'] = { color: String(colorPalette(1)), size: 8 }
    // make the line thicker
    eachVarObject['line'] = { 'width': 4 }

    dataArray.push(eachVarObject)
  }

  flexibleOverTimeGroups(title, xAxisTitle, yAxisTitle, dataArray)
}

function manipulateOverTimeGroupsDeletions () {
  // var title = 'Over Time Deletions - Groups'
  var title = 'Groups - Deletions Over Time'
  var xAxisTitle = 'Groups'
  var yAxisTitle = 'Deletions'
  var dataArray = []

  myData = getAllOverTimeCumulative()
  console.log('from manipulateOverTimeGroupsDeletions : ', myData)

  timeData = myData['time_frame']
  timeDataInt = []

  // make all my timeData into an Int
  for (var i = 0; i < timeData.length; i++) {
    timeDataInt.push(parseInt(timeData[i]))
  }

  var colorArray = colorPalette(Object.keys(myData['groups']['deletions']).length)
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
    eachVarObject['marker'] = { color: String(colorArray[j]), size: 8 }
    // eachVarObject['marker'] = { color: String(colorPalette(1)), size: 8 }
    // make the line thicker
    eachVarObject['line'] = { 'width': 4 }

    dataArray.push(eachVarObject)
  }

  flexibleOverTimeGroups(title, xAxisTitle, yAxisTitle, dataArray)
}

function flexibleOverTimeGroups (titleInput, xInput, yInput, graphData) {
  animateOut()

  var data = graphData

  var layout = {
    title: titleInput,
    width: divWidth,
    height: divHeight,
    paper_bgcolor: bgColor,
    plot_bgcolor: bgColor,
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
      family: fontFamily,
      size: fontSize,
      color: '#7f7f7f'
    }
  }

  Plotly.newPlot('myDiv', data, layout)

  animateOutIn()
}

// --------------------------------------

function manipulateOverTimeMultiCommits () {
  // var title = 'Over Time Commits - Users'
  var title = 'Users - Commits Over Time'
  var xAxisTitle = 'Users'
  var yAxisTitle = 'Commits'
  var dataArray = []

  myData = getAllOverTimeCumulative()
  console.log('from manipulateOverTimeMultiCommits : ', myData)

  timeData = myData['time_frame']
  timeDataInt = []

  // make all my timeData into an Int
  for (var i = 0; i < timeData.length; i++) {
    timeDataInt.push(parseInt(timeData[i]))
  }

  var colorArray = colorPalette(Object.keys(myData['users']['commits']).length)
  userKeys = Object.keys(myData['users']['commits'])
  for (var j = 0; j < Object.keys(myData['users']['commits']).length; j++) {
    eachVarObject = {}

    yValues = myData['users']['commits'][userKeys[j]]
    console.log(yValues)

    eachVarObject['x'] = timeDataInt
    eachVarObject['y'] = yValues
    eachVarObject['type'] = 'lines+markers'
    eachVarObject['name'] = String(userKeys[j])
    // randomise the colours
    eachVarObject['marker'] = { color: String(colorArray[j]), size: 8 }
    // eachVarObject['marker'] = { color: String(colorPalette(1)), size: 8 }
    // make the line thicker
    eachVarObject['line'] = { 'width': 4 }

    dataArray.push(eachVarObject)
  }

  flexibleOverTimeMulti(title, xAxisTitle, yAxisTitle, dataArray)
}

function manipulateOverTimeMultiAdditions () {
  // var title = 'Over Time Additions - Users'
  var title = 'Users - Additions Over Time'
  var xAxisTitle = 'Users'
  var yAxisTitle = 'Additions'
  var dataArray = []

  myData = getAllOverTimeCumulative()
  console.log('from manipulateOverTimeMultiAdditions : ', myData)

  timeData = myData['time_frame']
  timeDataInt = []

  // make all my timeData into an Int
  for (var i = 0; i < timeData.length; i++) {
    timeDataInt.push(parseInt(timeData[i]))
  }

  var colorArray = colorPalette(Object.keys(myData['users']['additions']).length)
  userKeys = Object.keys(myData['users']['additions'])
  for (var j = 0; j < Object.keys(myData['users']['additions']).length; j++) {
    eachVarObject = {}

    yValues = myData['users']['additions'][userKeys[j]]
    console.log(yValues)

    eachVarObject['x'] = timeDataInt
    eachVarObject['y'] = yValues
    eachVarObject['type'] = 'lines+markers'
    eachVarObject['name'] = String(userKeys[j])
    // randomise the colours
    eachVarObject['marker'] = { color: String(colorArray[j]), size: 8 }
    // eachVarObject['marker'] = { color: String(colorPalette(1)), size: 8 }
    // make the line thicker
    eachVarObject['line'] = { 'width': 4 }

    dataArray.push(eachVarObject)
  }

  flexibleOverTimeMulti(title, xAxisTitle, yAxisTitle, dataArray)
}

function manipulateOverTimeMultiDeletions () {
  // var title = 'Over Time Deletions - Users'
  var title = 'Users - Deletions Over Time'
  var xAxisTitle = 'Users'
  var yAxisTitle = 'Deletions'
  var dataArray = []

  myData = getAllOverTimeCumulative()
  console.log('from manipulateOverTimeMultiDeletions : ', myData)

  timeData = myData['time_frame']
  timeDataInt = []

  // make all my timeData into an Int
  for (var i = 0; i < timeData.length; i++) {
    timeDataInt.push(parseInt(timeData[i]))
  }

  var colorArray = colorPalette(Object.keys(myData['users']['deletions']).length)
  userKeys = Object.keys(myData['users']['deletions'])
  for (var j = 0; j < Object.keys(myData['users']['deletions']).length; j++) {
    eachVarObject = {}

    yValues = myData['users']['deletions'][userKeys[j]]
    console.log(yValues)

    eachVarObject['x'] = timeDataInt
    eachVarObject['y'] = yValues
    eachVarObject['type'] = 'lines+markers'
    eachVarObject['name'] = String(userKeys[j])
    // randomise the colours
    eachVarObject['marker'] = { color: String(colorArray[j]), size: 8 }
    // eachVarObject['marker'] = { color: String(colorPalette(1), size: 8 }
    // make the line thicker
    eachVarObject['line'] = { 'width': 4 }

    dataArray.push(eachVarObject)
  }

  flexibleOverTimeMulti(title, xAxisTitle, yAxisTitle, dataArray)
}

function flexibleOverTimeMulti (titleInput, xInput, yInput, graphData) {
  animateOut()

  var data = graphData

  var layout = {
    title: titleInput,
    width: divWidth,
    height: divHeight,
    paper_bgcolor: bgColor,
    plot_bgcolor: bgColor,
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
      family: fontFamily,
      size: fontSize,
      color: '#7f7f7f'
    }
  }

  Plotly.newPlot('myDiv', data, layout)

  animateOutIn()
}

function manipulateTotalAllDifference () {
  // var title = 'Over Time Total Additions/Commits/Deletions - Difference'
  var title = 'Non-cumulative Total Additions/Commits/Deletions'
  var xAxisTitle = 'Time of the day'
  var yAxisTitle = 'Total'
  var dataArray = []

  myData = getAllOverTimeNonCumulative()
  console.log('from manipulateTotalAllDifference : ', myData)

  timeData = myData['time_frame']
  timeDataInt = []

  // make all my timeData into an Int
  for (var i = 0; i < timeData.length; i++) {
    timeDataInt.push(parseInt(timeData[i]))
  }

  var colorArray = colorPalette(3)

  // commits
  commitsObject = {}
  commitsY = myData['commits']
  commitsObject['x'] = timeDataInt
  commitsObject['y'] = commitsY
  commitsObject['type'] = 'lines+markers'
  // hardcoded the data in so theres no actual name
  commitsObject['name'] = 'Commits'
  // randomise the colours
  commitsObject['marker'] = { color: String(colorArray[0]), size: 8 }
  // make the line thicker
  commitsObject['line'] = { 'width': 4 }
  dataArray.push(commitsObject)

  // additions
  additionsObject = {}
  additionsY = myData['additions']
  additionsObject['x'] = timeDataInt
  additionsObject['y'] = additionsY
  additionsObject['type'] = 'lines+markers'
  // hardcoded the data in so theres no actual name
  additionsObject['name'] = 'Additions'
  // randomise the colours
  additionsObject['marker'] = { color: String(colorArray[1]), size: 8 }
  // make the line thicker
  additionsObject['line'] = { 'width': 4 }
  dataArray.push(additionsObject)

  // deletions
  deletionsObject = {}
  deletionsY = myData['deletions']
  deletionsObject['x'] = timeDataInt
  deletionsObject['y'] = deletionsY
  deletionsObject['type'] = 'lines+markers'
  // hardcoded the data in so theres no actual name
  deletionsObject['name'] = 'Deletions'
  // randomise the colours
  deletionsObject['marker'] = { color: String(colorArray[2]), size: 8 }
  // make the line thicker
  deletionsObject['line'] = { 'width': 4 }
  dataArray.push(deletionsObject)

  flexibleTotalAllDifference(title, xAxisTitle, yAxisTitle, dataArray)
}

function flexibleTotalAllDifference (titleInput, xInput, yInput, graphData) {
  animateOut()

  var data = graphData

  var layout = {
    title: titleInput,
    width: divWidth,
    height: divHeight,
    paper_bgcolor: bgColor,
    plot_bgcolor: bgColor,
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
      family: fontFamily,
      size: fontSize,
      color: '#7f7f7f'
    }
  }

  Plotly.newPlot('myDiv', data, layout)
  animateOutIn()
}

function manipulateOverTimeGroupsCommitsDifference () {
  // var title = 'Over Time Group Commits - Difference'
  var title = 'Non-cumulative Group Commits'
  var xAxisTitle = 'Time of the day'
  var yAxisTitle = 'Total'
  var dataArray = []

  myData = getGroupsOverTimeDifference()
  console.log('from manipulateOverTimeGroupsCommitsDifference : ', myData)

  timeData = myData['time_frame']
  timeDataInt = []

  // make all my timeData into an Int
  for (var i = 0; i < timeData.length; i++) {
    timeDataInt.push(parseInt(timeData[i]))
  }

  var colorArray = colorPalette(Object.keys(myData['commits']).length)
  groupKeys = Object.keys(myData['commits'])
  for (var j = 0; j < Object.keys(myData['commits']).length; j++) {
    eachVarObject = {}

    yValues = myData['commits'][groupKeys[j]]
    console.log(yValues)

    eachVarObject['x'] = timeDataInt
    eachVarObject['y'] = yValues
    eachVarObject['type'] = 'lines+markers'
    eachVarObject['name'] = String(groupKeys[j])
    // randomise the colours
    eachVarObject['marker'] = { color: String(colorArray[j]), size: 8 }
    // eachVarObject['marker'] = { color: String(colorPalette(1)), size: 8 }
    // make the line thicker
    eachVarObject['line'] = { 'width': 4 }

    dataArray.push(eachVarObject)
  }

  flexibleOverTimeGroupsDifference(title, xAxisTitle, yAxisTitle, dataArray)
}

function manipulateOverTimeGroupsAdditionsDifference () {
  // var title = 'Over Time Group Additions - Difference'
  var title = 'Non-cumulative Group Additions'
  var xAxisTitle = 'Time of the day'
  var yAxisTitle = 'Total'
  var dataArray = []

  myData = getGroupsOverTimeDifference()
  console.log('from manipulateOverTimeGroupsAdditionsDifference : ', myData)

  timeData = myData['time_frame']
  timeDataInt = []

  // make all my timeData into an Int
  for (var i = 0; i < timeData.length; i++) {
    timeDataInt.push(parseInt(timeData[i]))
  }

  var colorArray = colorPalette(Object.keys(myData['additions']).length)
  groupKeys = Object.keys(myData['additions'])
  for (var j = 0; j < Object.keys(myData['additions']).length; j++) {
    eachVarObject = {}

    yValues = myData['additions'][groupKeys[j]]
    console.log(yValues)

    eachVarObject['x'] = timeDataInt
    eachVarObject['y'] = yValues
    eachVarObject['type'] = 'lines+markers'
    eachVarObject['name'] = String(groupKeys[j])
    // randomise the colours
    eachVarObject['marker'] = { color: String(colorArray[j]), size: 8 }
    // eachVarObject['marker'] = { color: String(colorPalette(1)), size: 8 }
    // make the line thicker
    eachVarObject['line'] = { 'width': 4 }

    dataArray.push(eachVarObject)
  }

  flexibleOverTimeGroupsDifference(title, xAxisTitle, yAxisTitle, dataArray)
}

function manipulateOverTimeGroupsDeletionsDifference () {
  // var title = 'Over Time Group Deletions - Difference'
  var title = 'Non-cumulative Group Deletions'
  var xAxisTitle = 'Time of the day'
  var yAxisTitle = 'Total'
  var dataArray = []

  myData = getGroupsOverTimeDifference()
  console.log('from manipulateOverTimeGroupsDeletionsDifference : ', myData)

  timeData = myData['time_frame']
  timeDataInt = []

  // make all my timeData into an Int
  for (var i = 0; i < timeData.length; i++) {
    timeDataInt.push(parseInt(timeData[i]))
  }

  var colorArray = colorPalette(Object.keys(myData['deletions']).length)
  groupKeys = Object.keys(myData['deletions'])
  for (var j = 0; j < Object.keys(myData['deletions']).length; j++) {
    eachVarObject = {}

    yValues = myData['deletions'][groupKeys[j]]
    console.log(yValues)

    eachVarObject['x'] = timeDataInt
    eachVarObject['y'] = yValues
    eachVarObject['type'] = 'lines+markers'
    eachVarObject['name'] = String(groupKeys[j])
    // randomise the colours
    eachVarObject['marker'] = { color: String(colorArray[j]), size: 8 }
    // eachVarObject['marker'] = { color: String(colorPalette(1)), size: 8 }
    // make the line thicker
    eachVarObject['line'] = { 'width': 4 }

    dataArray.push(eachVarObject)
  }

  flexibleOverTimeGroupsDifference(title, xAxisTitle, yAxisTitle, dataArray)
}

function flexibleOverTimeGroupsDifference (titleInput, xInput, yInput, graphData) {
  animateOut()

  var data = graphData

  var layout = {
    title: titleInput,
    width: divWidth,
    height: divHeight,
    paper_bgcolor: bgColor,
    plot_bgcolor: bgColor,
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
      family: fontFamily,
      size: fontSize,
      color: '#7f7f7f'
    }
  }

  Plotly.newPlot('myDiv', data, layout)
  animateOutIn()
}

function manipulateOverTimeMultiCommitsDifference () {
  // var title = 'Over Time Multi Commits - Difference'
  var title = 'Non-cumulative Individual Commits'
  var xAxisTitle = 'Time of the day'
  var yAxisTitle = 'Total'
  var dataArray = []

  myData = getMultiOverTimeDifference()
  console.log('from manipulateOverTimeMultiCommitsDifference : ', myData)

  timeData = myData['time_frame']
  timeDataInt = []

  // make all my timeData into an Int
  for (var i = 0; i < timeData.length; i++) {
    timeDataInt.push(parseInt(timeData[i]))
  }

  var colorArray = colorPalette(Object.keys(myData['commits']).length)
  groupKeys = Object.keys(myData['commits'])
  for (var j = 0; j < Object.keys(myData['commits']).length; j++) {
    eachVarObject = {}

    yValues = myData['commits'][groupKeys[j]]
    console.log(yValues)

    eachVarObject['x'] = timeDataInt
    eachVarObject['y'] = yValues
    eachVarObject['type'] = 'lines+markers'
    eachVarObject['name'] = String(groupKeys[j])
    // randomise the colours
    eachVarObject['marker'] = { color: String(colorArray[j]), size: 8 }
    // eachVarObject['marker'] = { color: String(colorPalette(1)), size: 8 }
    // make the line thicker
    eachVarObject['line'] = { 'width': 4 }

    dataArray.push(eachVarObject)
  }

  flexibleOverTimeGroupsDifference(title, xAxisTitle, yAxisTitle, dataArray)
}

function manipulateOverTimeMultiAdditionsDifference () {
  // var title = 'Over Time Multi Additions - Difference'
  var title = 'Non-cumulative Individual Additions'
  var xAxisTitle = 'Time of the day'
  var yAxisTitle = 'Total'
  var dataArray = []

  myData = getMultiOverTimeDifference()
  console.log('from manipulateOverTimeMultiAdditionsDifference : ', myData)

  timeData = myData['time_frame']
  timeDataInt = []

  // make all my timeData into an Int
  for (var i = 0; i < timeData.length; i++) {
    timeDataInt.push(parseInt(timeData[i]))
  }

  var colorArray = colorPalette(Object.keys(myData['additions']).length)
  groupKeys = Object.keys(myData['additions'])
  for (var j = 0; j < Object.keys(myData['additions']).length; j++) {
    eachVarObject = {}

    yValues = myData['additions'][groupKeys[j]]
    console.log(yValues)

    eachVarObject['x'] = timeDataInt
    eachVarObject['y'] = yValues
    eachVarObject['type'] = 'lines+markers'
    eachVarObject['name'] = String(groupKeys[j])
    // randomise the colours
    eachVarObject['marker'] = { color: String(colorArray[j]), size: 8 }
    // eachVarObject['marker'] = { color: String(colorPalette(1)), size: 8 }
    // make the line thicker
    eachVarObject['line'] = { 'width': 4 }

    dataArray.push(eachVarObject)
  }

  flexibleOverTimeGroupsDifference(title, xAxisTitle, yAxisTitle, dataArray)
}

function manipulateOverTimeMultiDeletionsDifference () {
  // var title = 'Over Time Multi Deletions - Difference'
  var title = 'Non-cumulative Individual Deletions'
  var xAxisTitle = 'Time of the day'
  var yAxisTitle = 'Total'
  var dataArray = []

  myData = getMultiOverTimeDifference()
  console.log('from manipulateOverTimeMultiDeletionsDifference : ', myData)

  timeData = myData['time_frame']
  timeDataInt = []

  // make all my timeData into an Int
  for (var i = 0; i < timeData.length; i++) {
    timeDataInt.push(parseInt(timeData[i]))
  }

  var colorArray = colorPalette(Object.keys(myData['additions']).length)
  groupKeys = Object.keys(myData['deletions'])
  for (var j = 0; j < Object.keys(myData['deletions']).length; j++) {
    eachVarObject = {}

    yValues = myData['deletions'][groupKeys[j]]
    console.log(yValues)

    eachVarObject['x'] = timeDataInt
    eachVarObject['y'] = yValues
    eachVarObject['type'] = 'lines+markers'
    eachVarObject['name'] = String(groupKeys[j])
    // randomise the colours
    eachVarObject['marker'] = { color: String(colorArray[j]), size: 8 }
    // eachVarObject['marker'] = { color: String(colorPalette(1)), size: 8 }
    // make the line thicker
    eachVarObject['line'] = { 'width': 4 }

    dataArray.push(eachVarObject)
  }

  flexibleOverTimeGroupsDifference(title, xAxisTitle, yAxisTitle, dataArray)
}

function flexibleOverTimeMultiDifference (titleInput, xInput, yInput, graphData) {
  animateOut()

  var data = graphData

  var layout = {
    title: titleInput,
    width: divWidth,
    height: divHeight,
    paper_bgcolor: bgColor,
    plot_bgcolor: bgColor,
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
      family: fontFamily,
      size: fontSize,
      color: '#7f7f7f'
    }
  }

  Plotly.newPlot('myDiv', data, layout)
  animateOutIn()
}

function manipulateAllMultiLanguageIterGroups () {
  dataLength = getLangMultiOvertime()
  // amount of languages - graphs i have to display
  var lang = Object.keys(dataLength['groups'])
  var length = lang.length
  var x = 0

  function langIterDelayLoop (i) {
    setTimeout(function () {
      myData = getLangMultiOvertime()

      // add functions here
      console.log('hello from manipulateallMultiLanguageIterGroups', myData)
      // call my graphs here and let loop do the function delay
      var title = 'Over Time Lines Of Code for - ' + lang[x]
      var xAxisTitle = 'Time of the day'
      var yAxisTitle = 'Lines Of Code'
      var dataArray = []

      // time function
      // time data
      timeData = myData['time_frame']
      timeDataInt = []
      // make all my timeData into an Int
      for (var j = 0; j < timeData.length; j++) {
        timeDataInt.push(parseInt(timeData[j]))
      }

      // find the amount of groups for this specific language
      var amountOfGroupsForLang = Object.keys(myData['groups'][lang[x]]['code']).length

      // console.log('pure amountOfGRoupsForLang - keys', myData['groups'][lang[x]]['code'])
      // console.log('amountOfGroupsForLang', amountOfGroupsForLang)
      // console.log('test', myData['groups']['Java']['code'])

      var colorArray = colorPalette(amountOfGroupsForLang)
      // get all my group names
      groupNames = Object.keys(myData['groups'][lang[x]]['code'])
      for (var k = 0; k < amountOfGroupsForLang; k++) {
        var eachVarObject = {}
        // get my y values for each specific group
        yValues = myData['groups'][lang[x]]['code'][groupNames[k]]

        // all x values are using the time function
        eachVarObject['x'] = timeDataInt
        eachVarObject['y'] = yValues
        eachVarObject['type'] = 'lines+markers'
        // change the name for eveyr single group
        eachVarObject['name'] = Object.keys(myData['groups'][lang[x]]['code'])[k]
        // randomise the colours
        eachVarObject['marker'] = { color: String(colorArray[k]), size: 8 }
        // eachVarObject['marker'] = { color: String(colorPalette(1)), size: 8 }
        // make the line thicker
        eachVarObject['line'] = { 'width': 4 }

        dataArray.push(eachVarObject)
      }

      console.log('this is dataArray', dataArray)

      flexibleOverTimeMultiLang(title, xAxisTitle, yAxisTitle, dataArray)
      // increment the counter after every function to go to the next language
      x++

      if (--i) { // If i > 0, keep going
        langIterDelayLoop(i) // Call the loop again, and pass it the current value of i
      }
    }, waitingTime)
  };

  // call the loop x amount of times
  langIterDelayLoop(length)
}

// show every language and the groups using it
// have to use this cause dont know amount of languages being used
function manipulateAllMultiLanguageTotal () {
  // only displaying code right now
  // use this to call all the languages through the template flexibleOverTimeMultiLang
  myData = getLangMultiOvertime()
  console.log('from manipulateAllMultiLanguageTotal', myData)
  // amount of graphs i have to display = amount of languages there is
  totalLang = Object.keys(myData['total'])
  amountOfLang = Object.keys(myData['total']).length
  // for every language i have to display

  for (var i = 0; i < amountOfLang; i++) {
    var language = totalLang[i]
    // var title = 'Over Time Lines Of Code Language - ' + language
    var title = 'Over Time Lines of Code Language'
    var xAxisTitle = 'Lines Of Code'
    var yAxisTitle = 'Total'
    var dataArray = []

    timeData = myData['time_frame']
    timeDataInt = []
    // make all my timeData into an Int
    for (var j = 0; j < timeData.length; j++) {
      timeDataInt.push(parseInt(timeData[j]))
    }

    var colorArray = colorPalette(amountOfLang)
    for (var k = 0; k < amountOfLang; k++) {
      eachVarObject = {}

      var loopedLanguage = String(totalLang[k])
      yValues = myData['total'][loopedLanguage]['code']
      console.log(yValues)

      eachVarObject['x'] = timeDataInt
      eachVarObject['y'] = yValues
      eachVarObject['type'] = 'lines+markers'
      eachVarObject['name'] = String(loopedLanguage)
      // randomise the colours
      eachVarObject['marker'] = { color: String(colorArray[k]), size: 8 }
      // eachVarObject['marker'] = { color: String(colorPalette(1)), size: 8 }
      // make the line thicker
      eachVarObject['line'] = { 'width': 4 }

      dataArray.push(eachVarObject)
    }

    flexibleOverTimeMultiLang(title, xAxisTitle, yAxisTitle, dataArray)
  }
}

function flexibleOverTimeMultiLang (titleInput, xInput, yInput, graphData) {
  animateOut()

  var data = graphData

  var layout = {
    title: titleInput,
    width: divWidth,

    height: divHeight,
    paper_bgcolor: bgColor,

    showlegend: true,

    plot_bgcolor: bgColor,
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
      family: fontFamily,
      size: fontSize,
      color: fontColor
    }
  }

  Plotly.newPlot('myDiv', data, layout)
  animateOutIn()
}

function callMainLoop () {
  var setCounter = 0
  var startCounter = 0
  var i = 0

  var functionArray = [
    function () { manipulateOverTimeGroupsCommits() },
    function () { manipulateOverTimeGroupsAdditions() },
    function () { manipulateOverTimeGroupsDeletions() },
    function () { manipulateOverTimeMultiCommits() },
    function () { manipulateOverTimeMultiAdditions() },
    function () { manipulateOverTimeMultiDeletions() },
    function () { manipulateTotalCommits() },
    function () { manipulateTotalAddDel() },
    function () { manipulateTotalAllDifference() },
    function () { manipulateOverTimeGroupsCommitsDifference() },
    function () { manipulateOverTimeGroupsAdditionsDifference() },
    function () { manipulateOverTimeGroupsDeletionsDifference() },
    function () { manipulateOverTimeMultiCommitsDifference() },
    function () { manipulateOverTimeMultiAdditionsDifference() },
    function () { manipulateOverTimeMultiDeletionsDifference() },
    function () { manipulateAllMultiLanguageTotal() },
    function () { manipulateAllMultiLanguageIterGroups() }
  ]

  function mainLoop () {
    // this if condition occurs only at the first graph
    // so you dont have to wait x waiting time to load the first graph
    if (startCounter === 0) {
      // check total amount of graphs
      console.log(functionArray.length)
      setTimeout(function () {
        functionArray[setCounter]()
        // increment both the setCounter and the startCounter
        setCounter++
        startCounter++
        if (--i) {
          mainLoop(i)
        }
      }, startWaitTime)
      // }, waitingTime)
    } else {
      if (setCounter === functionArray.length - 1) {
        // call the functions before setting a timeout
        functionArray[setCounter]()

        myData = getLangMultiOvertime()
        setTimeout(function () {
          // callsomefunctions here
          setCounter = 0
          if (--i) {
            mainLoop(i)
          }
          // every x seconds here
        }, waitingTime * Object.keys(myData['groups']).length)
      } else {
        setTimeout(function () {
          // callsomefunctions here
          functionArray[setCounter]()
          // setCounter === functionARray.length - 1 should also reset the function
          setCounter++
          if (--i) {
            mainLoop(i)
          }
          // every x seconds here
        }, waitingTime)
      }
    }
  }
  // amount of times this function is going to be called
  // just set it so high it doesnt really matter
  mainLoop(100000000000000000)
}

// START - display start
$(document).ready(function () {
  callMainLoop()
  // manipulateTotalCommits()
  // manipulateTotalAddDel()
  // manipulateAllMultiLanguageTotal()
  // manipulateAllMultiLanguageIterGroups()
})
