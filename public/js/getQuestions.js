let index = 0
$.ajax({
  type: 'GET',
  url: 'http://localhost:3000/api/questions/',
  dataType: 'json',
  success: function (data) {
    for (let i = 0; i < data.length; i++) {
      $('#table_content').append(
        `
          <tr>
            <td>${data[i].upvote.length + data[i].downvote.length}</td>
            <td>${data[i].answers.length}</td>
            <td><a href="#answer" onclick="questionDetail(${data[i]._id})" style="cursor:pointer">${data[i].title}</a></td>
          </tr>
        `
      )
      index++
    }
  }
})
