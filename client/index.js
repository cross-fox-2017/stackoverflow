$(document).ready(function(){
})

$('#login-form').on('submit', function(e){
  e.preventDefault()
  let username = $('input[name=username]').val()
  let password = $('input[name=password]').val()
  $.ajax({
    method: 'POST',
    url: 'http://localhost:3000/api/users/login',
    data: {username: username, password: password},
    dataType: 'json',
    success: function (data) {
      sessionStorage.setItem('token', data.token)
      window.location.href = `${location}main.html`
    }
  })
})
