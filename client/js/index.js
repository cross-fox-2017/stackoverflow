function signIn () {
  $.ajax({
    type: 'POST',
    url: 'http://localhost:3000/signin',
    data: {
      username: $('#username').val(),
      password: $('#password').val()
    },
    success: function (data) {
      if(data.token){
        localStorage.setItem("token", data.token)
        window.location.href = 'http://127.0.0.1:8080/home.html'
      }else{
        window.location.href = 'http://127.0.0.1:8080/index.html'
      }
    },
    error: function (err) {
      console.log(err)
    }
  })
}

function signUp () {
  $.ajax({
    type: 'POST',
    url: 'http://localhost:3000/signup',
    data: {
      username: $('#username').val(),
      password: $('#password').val(),
      email: $('#email').val()
    },
    success: function (data) {
      if(data){
        alert("signup success");
        window.location.href = 'http://127.0.0.1:8080/index.html'
      }else{
        alert("signup failed");
      }
    },
    error: function (err) {
      console.log(err)
    }
  })
}

function signOut (){
  localStorage.removeItem("token");
  window.location.href = 'http://127.0.0.1:8080/index.html'
}

function getAllQuestion(){
  $.ajax({
    url: "http://localhost:3000/question",
    type: "get",
    success: function( result ) {
      var temp = '';
      for (var i = 0; i < result.length; i++) {
        temp +=
        `
        <div class="row z-depth-3" id="${result[i]._id}">
        <div class="col s12" >
        <h4>${result[i].title}</h4>
        <p>${result[i].question}</p>
        <p class="right blue-text">createdBy: ${result[i].postBy.username}</p>
        </div>
        </div>
        `
        $('#list-question').prepend(temp)
      }
    }
  });
}

getAllQuestion()
function postQuestion(){
  $.ajax({
    url: "http://localhost:3000/question",
    type: "POST",
    data: {
      title: $('#title').val(),
      question: $('#question').val(),
    },
    success: function( result ) {
      var temp =
      `
      <div class="row z-depth-3" id="${result._id}">
      <div class="col s12" >
      <h4>${result.title}</h4>
      <p>${result.question}</p>
      </div>
      </div>
      `
      $('#list-question').prepend(temp)
      $('#title').val('')
      $('#question').val('')
    }
  });
}
