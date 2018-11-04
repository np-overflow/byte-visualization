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

function testTuple () {
  return String(12, 13)
}

var test = testTuple()
console.log(test)
