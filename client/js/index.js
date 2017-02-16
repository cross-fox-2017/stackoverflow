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
