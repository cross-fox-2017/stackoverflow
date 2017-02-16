$(document).ready(function(){
  getAllQuestion()
})
function getAllQuestion(){
  $.ajax({
    type: "GET",
    url: 'http://localhost:3000/api/questions',
    beforeSend: function(request) {
      request.setRequestHeader("token", sessionStorage.getItem('token'));
    },
    success: function(data){
      if(data == 'please-login'){
        window.location.href = '../'
      } else {
        data.forEach(function(item){
          console.log(item);
          $('#list-of-questions').append(
            `<tr>
              <td>
              <div class="ui left labeled button" tabindex="0">
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
