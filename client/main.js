$(document).ready(function(){
  getAllQuestion()
  $('#create-new-question').on('click', function(e){createQuestion(e)})
})
function getAllQuestion(){
  $.ajax({
    method: "GET",
    url: 'http://localhost:3000/api/questions',
    beforeSend: function(request) {
      request.setRequestHeader("token", sessionStorage.getItem('token'));
    },
    success: function(data){
      if(data == 'please-login'){
        window.location.href = '../'
      } else {
        $('#list-of-questions').empty()
        data.forEach(function(item){
          $('#list-of-questions').append(
            `<tr>
              <td>
              <div class="ui left labeled button" tabindex="0" onclick="detail('${item._id}')">
                <p class="ui basic label">
                  ${item.title}
                </p>
                <div class="ui button blue">
                  <i class="reply icon"></i> Answer
                </div>
              </div>
              </td>
              <td>${item.content}</td>
              <td>${item.answer.length}</td>
              <td>${item.upvote.length}</td>
              <td>${item.downvote.length}</td>
            </tr>`
          )
        })
      }
    }
  })
}
function createQuestion(e){
  e.preventDefault()
  let title = $('#createForm input[name=question-title]').val()
  let content = $('#createForm textarea[name=question-content]').val()
  let userid = sessionStorage.getItem('userid')
  $.ajax({
    method: 'POST',
    url: 'http://localhost:3000/api/questions',
    beforeSend: function(request) {
      request.setRequestHeader("token", sessionStorage.getItem('token'));
    },
    data: {title: title, content: content, userid: userid},
    success: function(data){
      console.log(data);
      getAllQuestion()
    }
  })
}
function detail(questionid){
  $('.long.modal')
  .modal('show')
}
