$(document).ready(function () {
  getQuestions()
  let userName = localStorage.getItem('Username')
  $('#nav-username').text('Username: ' + userName)
})

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
          window.location.assign('http://localhost:8080/home.html')
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
          `<tr>
            <td>${vote}</td>
            <td><a href="/question.html?id=${questions.id}">${questions.title}</a></td>
            <td>User ID: ${questions.userid}</td>
            <td style="max-width:50%"><button onclick="upVote(${questions.id}, ${vote}, ${voteId})" type="button" class="btn light-green darken-3" style="padding: 0px 8px;">Upvote</button> <button type="button" class="btn red darken-4" onclick="downVote(${questions.id}, ${vote}, ${voteId})" style="padding: 0px 8px;">Downvote</button></td>
          </tr>`
        )
      }
    },
    error: function () {
      console.log('GET Questions Response Error')
    }
  })
}

function upVote (questId, voteValue, voteId) {
  let userId = localStorage.getItem('UserId')
  voteValue++
  $('#posts').empty()
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
      console.log('PUT Up Vote Questions Request Error')
    }
  })
}

function downVote (questId, voteValue, voteId) {
  let userId = localStorage.getItem('UserId')
  if (voteValue === 0) {
    voteValue
  }else {
    voteValue--
  }
  $('#posts').empty()
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
      console.log('PUT Down Vote Questions Request Error')
    }
  })
}
