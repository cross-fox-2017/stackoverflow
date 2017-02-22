$('#loginform').submit(function (e) {
  e.preventDefault()
  $.ajax({
    url: 'http://localhost:3000/API/login',
    type: 'POST',
    data: $(this).serialize(),
    dataType: 'json',
    success: function (msg) {
      if (msg.err === 'wrong password') {
        swal('oops', 'your password is wrong !', 'warning')
      }else if (msg.err === "Username doesn't exist") {
        swal('oops', 'Username doesnt exist !' , 'warning')
      }else {
        localStorage.setItem('token', msg.token)
        window.location.href = 'http://127.0.0.1:8080/main.html'
      }
    },
    error: function (err) {
      console.log(err)
    }
  })
})

$('#registerform').submit(function (e) {
  e.preventDefault()
  $.ajax({
    url: 'http://localhost:3000/API/user',
    type: 'POST',
    data: $(this).serialize(),
    dataType: 'json'
  }).done(function (msg) {
    swal('Good job!', 'Successfull registered ! please login now', 'success')
  }).fail(function (err) {
    console.log(err)
  })
})

$('#storiesform').submit(function (e) {
  e.preventDefault()

  $.ajax({
    url: 'http://localhost:3000/stories',
    type: 'POST',
    data: {
      token: localStorage.getItem('token'),
      title: $('input[name=title]').val(),
      story: $('textarea[name=story]').val()
    },
    dataType: 'json',
    success: function (data) {
      console.log(data.success)
      swal('Good job!', 'Successfull registered ! please login now', 'success')
      swal({
        title: 'Good job!',
        text: 'Successfull post a Stories !',
        type: 'success',
        showCancelButton: true,
        confirmButtonColor: '#AEDEF4',
        confirmButtonText: 'See other stories !',
        closeOnConfirm: false
      },
        function () {
          window.location.href = 'http://127.0.0.1:8080/main.html'
        })
    },
    error: function (err) {
      console.log(err)
      if (err)
        swal('oops', 'something is wrong !', 'warning')
    }
  })
})

function stories () {
  $.ajax({
    url: 'http://localhost:3000/stories',
    type: 'GET',
    success: function (data) {
      console.log(data.success)
      data.success.forEach(function (item) {
        let table = `<div class="section">
               <h5>${item.story}</h5>
               <blockquote>
               <i class="material-icons">account_circle</i>
               ${item.user_id.name}
               </blockquote>
               <div class="row">
               <div class="col s4"><i class="material-icons">thumb_up</i><span>${item.votes.length}</span></div>
               <div class="col s4"><i class="material-icons">forum</i><span>${item.story_detail.length}</span></div>
               <div class="col s4"><a onclick="seeStory('${item._id}')" class="waves-effect waves-light btn"><i class="material-icons left">remove_red_eye</i>see this story</a></div>
               </div>

            </div>
            <div class="divider"></div>`
        $('#mainstories').append(table)
      })
    },
    error: function (err) {
      console.log(err)
    }
  })
}
function seeStory (value) {
  localStorage.setItem('story_id', value)
  window.location.href = 'http://127.0.0.1:8080/storydetail.html'
}

$('#saysomething').click(function (e) {
  e.preventDefault()
  swal({
    title: 'Say Something!',
    text: 'Write something interesting',
    type: 'input',
    showCancelButton: true,
    closeOnConfirm: true,
    animation: 'slide-from-top',
    inputPlaceholder: 'Write something'
  },
    function (inputValue) {
      if (inputValue === false) return false

      if (inputValue === '') {
        swal.showInputError('You need to write something!')
        return false
      }

      let storyid = localStorage.getItem('story_id')
      let token = localStorage.getItem('token')
      $.ajax({
        url: 'http://localhost:3000/details',
        type: 'POST',
        data: {
          token: token,
          story_id: storyid,
          comment: inputValue
        },
        dataType: 'json',
        success: function (data) {
          console.log(data)
        },
        error: function (err) {
          console.log(err)
        }
      })
    })
})

$(document).ready(function () {
  stories()
})
