let index = 0
let subIndex = 0
$.ajax({
  type: 'GET',
  url: 'http://localhost:3000/api/questions/',
  dataType: 'json',
  success: function (data) {
    for (let i = 0; i < data.length; i++) {
      $('#table_content').append(
        `
          <tr>
            <td id="total_vote_${i}">${data[i].upvote.length + data[i].downvote.length}</td>
            <td id="total_answer_${i}">${data[i].answers.length}</td>
            <td><a href="#answer" onclick="questionDetail(${data[i]._id}, ${index})" style="cursor:pointer">${data[i].title}</a></td>
          </tr>
        `
      )
      index++
    }
  }
})
