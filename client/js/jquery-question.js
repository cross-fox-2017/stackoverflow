$(document).ready(function() {

  $('.modal').modal();

  $.ajax({
    url    : `http://localhost:3000/questions/${localStorage.getItem('questionId')}`,
    method : "GET",
    success: function(data) {
      if (localStorage.getItem("token")) {
      $('#login-or-logout').append(`<li class="navbar-rmv-hover"><a onclick="preanswer()" href="#modal-create"  class="waves-effect btn waves-light log-btn" style="background-color: rgb(255, 36, 108)">Answer</a></li>`)
      $('#questions-list').append(`
          <div class="row margin">

            <div class="col s12 l12">
              <h4 id="title-question-${data._id}" class="option-show-title title-question">
                ${data[0].title}
              </h4>
              <p style="color: rgb(103, 103, 103)">posted by : ${data[0].postedBy.username}</p>
              <br>
              <p class="question-preview">${data[0].question}</p>
            </div>
          </div>

          <div class="row margin">
            <hr>
            <div class="col s112 l8">
              <p>category : <span class="chip"> ${data[0].category}</span> </p>
            </div>
            <div class="col s112 l2">
              <a onclick="upvoteQ('upvoteQ-${data[0]._id}')" id="upvoteQ-${data[0]._id}" class="center modal-action modal-close waves-effect green waves-light btn" type="submit" name="button"><i class="material-icons">thumb_up</i>${data[0].upvote.length}</a>
            </div>
            <div class="col s112 l2">
              <a onclick="downvoteQ('downvoteQ-${data[0]._id}')" id="downvoteQ-${data[0]._id}" class="center modal-action modal-close waves-effect red waves-light btn" type="submit" name="button"><i class="material-icons">thumb_down</i>${data[0].downvote.length}</a>
            </div>
          </div>
          `)

          var answer = ''
          for (var i = 0; i < data[0].answers.length; i++) {
            answer +=  `
              <div  class="card-content">
                <div class="row margin">
                  <div class="col s12 l12">
                    <p class="answers">${data[0].answers[i].content}</p>
                  </div>
                </div>
                <div class="row margin">
                  <hr>
                  <div class="col s112 l8">
                    <p style="color: rgb(103, 103, 103)">replied by : ${data[0].answers[i].postedBy.username}</p>
                  </div>
                  <div class="col s112 l2">
                    <a onclick="upvoteA('${data[0].answers[i]._id}', 'upvoteA-${data[0].answers[i]._id}', '${[i]}')" id="upvoteA-${data[0].answers[i]._id}" class="center modal-action modal-close waves-effect green waves-light btn" type="submit" name="button"><i class="material-icons">thumb_up</i>${data[0].answers[i].upvote.length}</a>
                  </div>
                  <div class="col s112 l2">
                    <a onclick="downvoteA('${data[0].answers[i]._id}', 'downvoteA-${data[0].answers[i]._id}', '${[i]}')" id="downvoteA-${data[0].answers[i]._id}" class="center modal-action modal-close waves-effect red waves-light btn" type="submit" name="button"><i class="material-icons">thumb_down</i>${data[0].answers[i].downvote.length}</a>
                  </div>
                </div>
              </div>
              <hr />
            `
          }
        $('#login-or-logout').append(`<li class="navbar-rmv-hover"><a onclick="backToHome()" class="waves-effect btn waves-light log-btn" style="background-color: rgb(255, 36, 108;)">Back to Home</a></li>`)
        $('#answers-list').append(answer)
      }else{
        console.log('asasd');
        $('#login-or-logout').append(`<li class="navbar-rmv-hover"><a onclick="logIn()" class="waves-effect btn waves-light log-btn" style="background-color: rgb(255, 36, 108;)">Login</a></li>`)
        $('#header-text').append('<h3 id="options" class="center-align" style="color: rgb(255, 36, 108)"><span style="color: white; text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;">FullStuck</span> Overflow</h3>')
      }
    }
  })
})

function upvoteQ(id){
  $(document).ready(function() {
    $.ajax({
      url  : `http://localhost:3000/questions/${localStorage.getItem('questionId')}/upvoteq/${localStorage.getItem('username')}`,
      type : "PUT",
      success: function(data){
        // console.log(data);
        if (data.err) alert(data.err)
        else {
          document.querySelector(`#${id}`).innerHTML = `<i class="material-icons">thumb_up</i>${data.upvote.length}`
        }
      }
    })
  })
}

function downvoteQ(id){
  $(document).ready(function() {
    $.ajax({
      url  : `http://localhost:3000/questions/${localStorage.getItem('questionId')}/downvoteq/${localStorage.getItem('username')}`,
      type : "PUT",
      success: function(data){
        // console.log(data);
        if (data.err) alert(data.err)
        else {
          document.querySelector(`#${id}`).innerHTML = `<i class="material-icons">thumb_down</i>${data.downvote.length}`
        }
      }
    })
  })
}

function upvoteA(idAns, idUp, index){
  $(document).ready(function() {
    $.ajax({
      url  : `http://localhost:3000/questions/${localStorage.getItem('questionId')}/upvoteans/${idAns}/${localStorage.getItem('username')}`,
      type : "PUT",
      success: function(data){
        // console.log(data);
        if (data.err) alert(data.err)
        else {
          document.querySelector(`#${idUp}`).innerHTML = `<i class="material-icons">thumb_up</i>${data.answers[index].upvote.length}`
        }
      }
    })
  })
}

function downvoteA(idAns, idDown, index){
  $(document).ready(function() {
    $.ajax({
      url  : `http://localhost:3000/questions/${localStorage.getItem('questionId')}/downvoteans/${idAns}/${localStorage.getItem('username')}`,
      type : "PUT",
      success: function(data){
        // console.log(data);
        if (data.err) alert(data.err)
        else {
          document.querySelector(`#${idDown}`).innerHTML = `<i class="material-icons">thumb_down</i>${data.answers[index].downvote.length}`
        }
      }
    })
  })
}

function preanswer() {
  formReset()

  $('#modal-create').append(`
    <div id="form-delete">
        <div class="modal-content">
        <h4 class="center-align"><b>POST YOUR ANSWER</b></h4>
          <div class="row">
            <form class="col s12">
              <div class="row">
               <form class="col s12">
                 <div class="row">
                   <div class="input-field col s12">
                    <textarea id="add-answer" type="text" class="materialize-textarea"></textarea>
                    <label for="add-answer" data-error="wrong" data-success="right">ANSWER</label>
                   </div>
                 </div>
               </form>
              </div>
              <div class="row">
                <div class="input-field col s12">
                </div>
              </div>
            </form>
          </div>
        </div>
        <div class="modal-footer">
          <a onclick="answer()" class="modal-action modal-close waves-effect waves-light btn" type="submit" name="button" style="background-color: rgb(255, 36, 108)">CREATE</a>
        </div>
      </div>`)
}

function answer() {
    $.ajax({
      url    : `http://localhost:3000/questions/${localStorage.getItem('questionId')}/answer/${localStorage.getItem('username')}`,
      type   : "PUT",
      data   : {
        content : $('#add-answer').val()
      },
      success: function(data) {
        location.reload();
        // console.log(data.answers[0]);
        // $('#answer-list').append(`
        //   <div class="card-content">
        //       <div class="row margin">
        //         <div class="col s12 l12">
        //           <p class="answers">${data.answers[0].content}</p>
        //         </div>
        //       </div>
        //       <div class="row margin">
        //         <hr>
        //         <div class="col s112 l8">
        //           <p style="color: rgb(103, 103, 103)">replied by : ${data.answers[0].postedBy.username}</p>
        //         </div>
        //         <div class="col s112 l2">
        //           <a onclick="upvoteA()" class="center modal-action modal-close waves-effect green waves-light btn" type="submit" name="button"><i class="material-icons">thumb_up</i>${data.answers[0].upvote.length}</a>
        //         </div>
        //         <div class="col s112 l2">
        //           <a onclick="downvoteA()" class="center modal-action modal-close waves-effect red waves-light btn" type="submit" name="button"><i class="material-icons">thumb_down</i>${data.answers[0].downvote.length}</a>
        //         </div>
        //       </div>
        //     </div>
        //     <hr />
        //   `)
      }
    })
}


function formReset() {
  $('#form-delete').remove()
}

function backToHome() {
  window.location.href = 'http://127.0.0.1:8080/index.html'
}
