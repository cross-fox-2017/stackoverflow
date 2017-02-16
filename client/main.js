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
              <div>
                <label class="ui header">
                  ${item.title}
                </label>
              </div>
              <div class="ui icon buttons">
                <button class="ui primary button" onclick="detail('${item._id}')"><i class="expand icon"></i>Details</button>
                <button class="ui negative button"><i class="erase icon"></i>Delete</button>
                <button class="ui positive button"><i class="edit icon"></i>Edit</button>
              </div>
              </td>
              <td>${item.content}</td>
              <td>${item.answer.length}</td>
              <td>
                <button onclick="upvoteQuestion('${item._id}')" class="ui labeled positive icon button">
                  <i class="thumbs up icon"></i>
                  ${item.upvote.length}
                </button>
              </td>
              <td>
                <button onclick="downvoteQuestion('${item._id}')" class="ui labeled negative icon button">
                  <i class="thumbs down icon"></i>
                  ${item.downvote.length}
                </button>
              </td>
            </tr>`
          )
        })
      }
    }
  })
}
function createQuestion(e){
  e.preventDefault()
  let title = $('#create-form input[name=question-title]').val()
  let content = $('#create-form textarea[name=question-content]').val()
  let userid = sessionStorage.getItem('userid')
  $.ajax({
    method: 'POST',
    url: 'http://localhost:3000/api/questions',
    beforeSend: function(request) {
      request.setRequestHeader("token", sessionStorage.getItem('token'));
    },
    data: {title: title, content: content, userid: userid},
    success: function(data){
      getAllQuestion()
      $('#create-form input[name=question-title]').val('')
      $('#create-form textarea[name=question-content]').val('')
    }
  })
}
function postAnswer(questionid){
  let content = $('#answer-content').val()
  let title = $('#answer-title').val()
  let userid = sessionStorage.getItem('userid')
  $.ajax({
    method: 'POST',
    url: `http://localhost:3000/api/questions/${questionid}/answer`,
    beforeSend: function(request) {
      request.setRequestHeader("token", sessionStorage.getItem('token'));
    },
    data: {title: title, content: content, userid: userid},
    success: function(data){
      getAllQuestion()
    }
  })
}
function detail(questionid){
  $.ajax({
    method: "GET",
    url: `http://localhost:3000/api/questions/${questionid}`,
    beforeSend: function(request) {
      request.setRequestHeader("token", sessionStorage.getItem('token'));
    },
    success: function(data){
      if(data == 'please-login'){
        window.location.href = '../'
      } else {
        $('.long.modal')
        .modal('setting', {
          onShow: function(){
            $('#answer-content').val('')
            $('#answer-title').val('')
            $('#list-of-answers').empty()
            data.answer.forEach(function(item){
              $('#list-of-answers').append(
              `<tr>
                <td>${item.content}</td>
                <td>
                  <button onclick="upvoteAnswer('${item._id}','${questionid}')" class="ui labeled positive icon button">
                    <i class="thumbs up icon"></i>
                    ${item.upvote.length}
                  </button>
                </td>
                <td>
                  <button onclick="downvoteAnswer('${item._id}','${questionid}')" class="ui labeled negative icon button">
                    <i class="thumbs down icon"></i>
                    ${item.downvote.length}
                  </button>
                </td>
              </tr>`
              )
            })
          },
          onApprove: function(){
            postAnswer(questionid)
          }
        })
        .modal('show')
      }
    }
  })
}
function upvoteQuestion(questionid){
  $.ajax({
    method: 'POST',
    url: `http://localhost:3000/api/questions/${questionid}/upvote`,
    beforeSend: function(request) {
      request.setRequestHeader("token", sessionStorage.getItem('token'));
    },
    data: {userid: sessionStorage.getItem('userid')},
    success: function(data){
      console.log(data);
      getAllQuestion()
    }
  })
}
function downvoteQuestion(questionid){
  $.ajax({
    method: 'POST',
    url: `http://localhost:3000/api/questions/${questionid}/downvote`,
    beforeSend: function(request) {
      request.setRequestHeader("token", sessionStorage.getItem('token'));
    },
    data: {userid: sessionStorage.getItem('userid')},
    success: function(data){
      console.log(data);
      getAllQuestion()
    }
  })
}
function upvoteAnswer(answerid, questionid){
  $.ajax({
    method: 'POST',
    url: `http://localhost:3000/api/questions/${questionid}/answer/${answerid}/upvote`,
    beforeSend: function(request) {
      request.setRequestHeader("token", sessionStorage.getItem('token'));
    },
    data: {userid: sessionStorage.getItem('userid')},
    success: function(data){
      console.log(data);
      $('.long.modal').modal('toggle')
    }
  })
}
function downvoteAnswer(answerid, questionid){
  $.ajax({
    method: 'POST',
    url: `http://localhost:3000/api/questions/${questionid}/answer/${answerid}/downvote`,
    beforeSend: function(request) {
      request.setRequestHeader("token", sessionStorage.getItem('token'));
    },
    data: {userid: sessionStorage.getItem('userid')},
    success: function(data){
      console.log(data);
      $('.long.modal').modal('toggle')
    }
  })
}
