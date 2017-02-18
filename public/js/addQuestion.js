$('#submit_question_add').click(function (e) {
  e.preventDefault()
  $.ajax({
    type: 'POST',
    url: 'http://localhost:3000/api/questions',
    dataType: 'json',
    data: {
      userId: userId,
      title: $('#title_question').val(),
      content: $('#content_question').val()
    },
    success: function (data) {
      resetForm($('#add_question'))
      $('#table_content').append(
        `
          <tr>
            <td>${data.upvote.length + data.downvote.length}</td>
            <td>${data.answers.length}</td>
            <td><a href="#answer" onclick="questionDetail(${data._id})" style="cursor:pointer">${data.title}</a></td>
          </tr>
        `
      )
      index++

      // SET global message
      $('#global_message').html(
        `
          <div id='question_success' class="card-panel teal lighten-2 col s12 message white-text">Post Question Success!</div>
        `
      )
      setTimeout(function () {
        $('#question_success').attr('style', 'opacity:0; visibility:hidden')
      }, 2000)
      setTimeout(function () {
        $('#question_success').attr('style', 'display:none')
        $('#question_success').html(``)
      }, 3000)
    }
  })
})
