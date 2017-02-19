$(document).ready(function() {

  $('.modal').modal();

  $.ajax({
    url  : "http://localhost:3000/questions",
    method : "GET",
    success: function(data) {
      if (localStorage.getItem("token")) {
        $('#login-or-logout').append(`<li class="navbar-rmv-hover"><a onclick="logOut()" class="waves-effect btn waves-light log-btn" style="background-color: rgb(255, 36, 108)">Logout</a></li>`)
        $('#create-question').append(`<li class="navbar-rmv-hover"><a onclick="modalCreate()" href="#modal-create" class="waves-effect btn log-btn">Create Question</a></li>`)

        var arrTemp = ""
        for (var i = 0; i < data.length; i++) {
          arrTemp += `
          <a">
            <div class="card-content">
              <div class="row margin">

                <div class="col s12 l9">
                   <h5 id="title-question-${data[i]._id}" class="option-show-title title-question">
                     ${data[i].title.slice(0, 75)}
                   </h5>
                  <p style="color: rgb(103, 103, 103)">posted by : ${data[i].postedBy.username}</p>
                  <br>
                  <p class="question-preview">${data[i].question.slice(0, 100)} ... <a>(read more)</a></p>
                </div>

                <div class="col s12 l3">
                  <div class="row margin center-align">
                    <div class="col s6 l6">
                      <h5 style="color: rgb(103, 103, 103)">${data[i].upvote.length - data[i].downvote.length}</h5>
                      <p>VOTE</p>
                    </div>
                    <div class="col s6 l6">
                      <h5 style="color: rgb(103, 103, 103)">${data[i].answers.length}</h5>
                      <p>ANSWERS</p>
                    </div>
                  </div>
                </div>
              </div>

              <div class="row margin">
                <hr>
                <div class="col s112 l10">
                  <p>category : <span class="chip"> ${data[i].category}</span> </p>
                </div>
                <div class="col s112 l2">
                  <a onclick="toQuestion('${data[i]._id}')" class="modal-action modal-close waves-effect waves-light btn" type="submit" name="button" style="background-color: rgb(265, 36, 108)">READ</a>
                </div>
              </div>
            </div>
          </a>
          `
        }

        $('#questions-list').append(arrTemp)
      }
      else{
        $('#login-or-logout').append(`<li class="navbar-rmv-hover"><a onclick="logIn()" class="waves-effect btn waves-light log-btn" style="background-color: rgb(255, 36, 108;)">Login</a></li>`)
        $('#header-text').append('<h3 id="options" class="center-align" style="color: rgb(255, 36, 108)"><span style="color: white; text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;">FullStuck</span> Overflow</h3>')
      }

    }
  })


})

function createQuestion() {
    $.ajax({
      url    : `http://localhost:3000/questions/create/${localStorage.getItem('username')}`,
      type   : "POST",
      data   : {
        title    : $('#add-title').val(),
        question : $('#add-question').val(),
        category : $('#add-category').val()
      },
      success: function(data) {
        $('#questions-list').append(`
          <a href="#">
            <div class="card-content">
              <div class="row margin">

                <div class="col s12 l9">
                  <h5 id="title-question-${data._id}" class="option-show-title title-question">
                    ${data.title.slice(0, 75)}
                  </h5>
                  <p style="color: rgb(103, 103, 103)">posted by : ${data.postedBy.username}</p>
                  <br>
                  <p class="question-preview">${data.question.slice(0, 100)} ... <a>(read more)</a></p>
                </div>

                <div class="col s12 l3">
                  <div class="row margin center-align">
                    <div class="col s6 l6">
                      <h5 style="color: rgb(103, 103, 103)">${data.upvote.length - data.downvote.length}</h5>
                      <p>VOTE</p>
                    </div>
                    <div class="col s6 l6">
                      <h5 style="color: rgb(103, 103, 103)">${data.answers.length}</h5>
                      <p>ANSWERS</p>
                    </div>
                  </div>
                </div>
              </div>

              <div class="row margin">
                <hr>
                <div class="col s112 l10">
                  <p>category : <span class="chip"> ${data.category}</span> </p>
                </div>
                <div class="col s112 l2">
                  <a onclick="toQuestion('${data._id}')" class="modal-action modal-close waves-effect waves-light btn" type="submit" name="button" style="background-color: rgb(265, 36, 108)">READ</a>
                </div>
              </div>
            </div>
          </a>
          `)
      }
    })
}

function modalCreate() {
  formReset()

  $('#modal-create').append(`
    <div id="form-delete">
        <div class="modal-content">
        <h4 class="center-align"><b>CREATE NEW QUESTIONS</b></h4>
          <div class="row">
            <form class="col s12">
              <div class="row">
               <form class="col s12">
                 <div class="row">
                   <div class="input-field col s12">
                     <input id="add-title" type="text">
                     <label for="add-title" data-error="wrong" data-success="right">TITLE</label>
                   </div>
                   <div class="input-field col s12">
                    <input id="add-category" type="text">
                    <label for="add-category" data-error="wrong" data-success="right">CATEGORY</label>
                   </div>
                   <div class="input-field col s12">
                    <textarea id="add-question" type="text" class="materialize-textarea"></textarea>
                    <label for="add-question" data-error="wrong" data-success="right">QUESTION</label>
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
          <a onclick="createQuestion()" class="modal-action modal-close waves-effect waves-light btn" type="submit" name="button" style="background-color: rgb(255, 36, 108)">CREATE</a>
        </div>
      </div>`)
}

function toQuestion(data) {
  // console.log(data);
  localStorage.setItem("questionId", data)
  window.location.href = 'http://127.0.0.1:8080/question.html'
}
function logIn() {
  localStorage.clear()
  window.location.href = 'http://127.0.0.1:8080/login.html'
}

function logOut() {
  localStorage.clear()
  window.location.href = 'http://127.0.0.1:8080/index.html'
}

function formReset() {
  $('#form-delete').remove()
}
