let userId = Number(localStorage.getItem('userId'))
$(document).ready(function () {
  // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
  $('.modal').modal({
    complete: function () {
      $('#answers_list').html('')
    }
  })
})

// Redirect to login page if jwt-token not exist!
if (!localStorage.getItem('jwt-token')) {
  window.location.href = 'http://localhost:3000'
}

// clear the storage after logout
$('.logout').click(function () {
  localStorage.clear()
  window.location.href = 'http://localhost:3000'
})
