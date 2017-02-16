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
                <button class="ui negative button" onclick="destroy('${item._id}')"><i class="erase icon"></i>Delete</button>
                <button class="ui positive button" onclick="edit('${item._id}')"><i class="edit icon"></i>Edit</button>
              </div>
              </td>
              <td>${item.content}</td>
              <td>${item.answer.length}</td>
              <td>
                <div class="ui icon buttons">
                  <button onclick="upvoteQuestion('${item._id}')" class="ui positive icon button">
                    <i class="thumbs up icon"></i>
                  </button>
                  <div class="or" data-text="${item.upvote.length - item.downvote.length}"></div>
                  <button onclick="downvoteQuestion('${item._id}')" class="ui negative icon button">
                    <i class="thumbs down icon"></i>
                  </button>
                </div>
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
                  <div class="ui icon buttons">
                    <button onclick="upvoteAnswer('${item._id}','${questionid}')" class="ui positive icon button">
                      <i class="thumbs up icon"></i>
                    </button>
                    <div class="or" data-text="${item.upvote.length - item.downvote.length}"></div>
                    <button onclick="downvoteAnswer('${item._id}','${questionid}')" class="ui negative icon button">
                      <i class="thumbs down icon"></i>
                    </button>
                  </div>
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
function destroy(questionid){
  console.log("Unable To Delete");
  console.log("Super Admin Only");
}
function edit(questionid){
  console.log("Unable To Edit");
  console.log("Super Admin Only");
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
