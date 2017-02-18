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
      console.log(index)
    }
  })
})
