$(document).ready(function () {
  getQuestions()
  let userName = localStorage.getItem('Username')
  $('#nav-username').text('Username: ' + userName)
  $('.modal').modal()
})

let questionId = ''

function setId (id) {
  questionId = id
  return questionId
}

$('#login-form').on('submit', (e) => {
  e.preventDefault()
  let usernameVal = $('input[name=username]').val()
  let passwordVal = $('input[name=password]').val()
  $.ajax({
    type: 'POST',
    url: 'http://localhost:3000/auth/users/login',
    data: {username: usernameVal, password: passwordVal},
    success: function (resp) {
      if (resp.token) {
        localStorage.setItem('Authorization', resp.token)
        localStorage.setItem('Username', usernameVal)
        localStorage.setItem('UserId', resp.id)
        window.location.assign('http://localhost:8080/home.html')
      }else {
        window.location.assign('http://localhost:8080/index.html')
      }
    },
    error: function (err) {
      console.log('LOGIN Request Error')
      window.location.assign('http://localhost:8080/index.html')
    }
  })
})

$('#register-form').on('submit', (e) => {
  e.preventDefault()
  let usernameVal = $('input[name=username_reg]').val()
  let passwordVal = $('input[name=password_reg]').val()
  $.ajax({
    type: 'POST',
    url: 'http://localhost:3000/auth/users/register',
    data: {username: usernameVal, password: passwordVal},
    success: function (resp) {
      window.location.assign('http://localhost:8080/index.html')
    },
    error: function (err) {
      console.log('REGISTER Request Error')
      window.location.assign('http://localhost:8080/index.html')
    }
  })
})

$('#logout').click(function () {
  window.localStorage.clear()
  window.location.assign('http://localhost:8080/index.html')
})

$('#add-question').click(function () {
  let titleVal = $('input[name=title_create]').val()
  let contentVal = $('textarea[name=content_create]').val()
  let userId = localStorage.getItem('UserId')
  $('#posts').empty()
  $('#posts-content').empty()
  $.ajax({
    type: 'POST',
    url: 'http://localhost:3000/api/questions',
    data: {title: titleVal, content: contentVal, userid: userId},
    success: function (resp) {
      $('input[name=title_create]').val('')
      $('textarea[name=content_create]').val('')
      $.ajax({
        type: 'POST',
        url: 'http://localhost:3000/api/votequestions',
        data: {questionid: resp.id, value: 0},
        success: function () {
          getQuestions()
        },
        error: function (err) {
          console.log('CREATE Vote Questions Request Error')
        }
      })
    },
    error: function (err) {
      console.log('CREATE Questions Request Error')
    }
  })
})

function getQuestions () {
  $.ajax({
    type: 'GET',
    url: 'http://localhost:3000/api/questions',
    success: function (resp) {
      for (var i = 0; i < resp.length; i++) {
        let questions = resp[i]
        let vote = questions.Vote_Questions[0].value
        let voteId = questions.Vote_Questions[0].id
        $('#posts').append(
          `<tr id="question-${i+1}">
            <td>${vote}</td>
            <td>${questions.title}</td>
            <td>User ID: ${questions.userid}</td>
            <td style="max-width:50%"><button type="button" data-target="modal1" onclick="setId(${questions.id})" class="waves-effect waves-light btn cyan darken-3" style="padding: 0px 8px;">Reply</button> <button onclick="upVote(${questions.id}, ${vote}, ${voteId}, ${i+1})" type="button" class="waves-effect waves-light btn light-blue darken-3" style="padding: 0px 8px;">Upvote</button> <button type="button" class="waves-effect waves-light btn red darken-4" onclick="downVote(${questions.id}, ${vote}, ${voteId}, ${i+1})" style="padding: 0px 8px;">Downvote</button></td>
          </tr>`
        )
        $('#posts-content').append(
          `<div name="question_content" style="height: 200px; padding:10px; margin: 10px 0px; border-radius: 4px; border: 1px solid grey;">${questions.content}</div>`
        )
      }
    },
    error: function () {
      console.log('GET Questions Response Error')
    }
  })
}

function upVote (questId, voteValue, voteId, i) {
  let userId = localStorage.getItem('UserId')
  voteValue++
  $('#posts').empty()
  $('#posts-content').empty()
  $.ajax({
    type: 'PUT',
    url: `http://localhost:3000/api/votequestions/${voteId}`,
    data: {
      questionid: questId,
      userid: userId,
      value: voteValue
    },
    success: function (resp) {
      getQuestions()
    },
    error: function (err) {
      console.log('CREATE Vote Questions Request Error')
    }
  })
}

function downVote (questId, voteValue, voteId, i) {
  let userId = localStorage.getItem('UserId')
  if (voteValue === 0) {
    voteValue
  }else {
    voteValue--
  }
  $('#posts').empty()
  $('#posts-content').empty()
  $.ajax({
    type: 'PUT',
    url: `http://localhost:3000/api/votequestions/${voteId}`,
    data: {
      questionid: questId,
      userid: userId,
      value: voteValue
    },
    success: function (resp) {
      getQuestions()
    },
    error: function (err) {
      console.log('CREATE Vote Questions Request Error')
    }
  })
}

function addAnswer () {
  let contentVal = $('textarea[name=content_reply]').val()
  let userId = localStorage.getItem('UserId')
  $('#posts').empty()
  $('#posts-content').empty()
  $.ajax({
    type: 'POST',
    url: `http://localhost:3000/api/answers`,
    data: {
      content: contentVal,
      userid: userId,
      questionid: `${questionId}`
    },
    success: function (resp) {
      getQuestions()
    },
    error: function () {
      console.log('DELETE Response Error')
    }
  })
}
