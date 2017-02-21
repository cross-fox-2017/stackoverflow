var userID = []


$(document).ready(function() {
  $.ajax({
      url: "http://localhost:3000/decode",
      type: "POST",
      data:{
          token: localStorage.getItem("token")
      },
      success: function(result) {
        if (result.name == "TokenExpiredError") {
          swal("Expired Login")
        }else if(result.name == false){
          swal("Invalid Login")
        }else if(result.name == "JsonWebTokenError"){

        }else{
          userID.push(result.id);
          document.querySelector("#register").innerHTML = ""
          document.querySelector("#login").innerHTML = `<a id="logout" onclick="logout()" href="">Logout</a>`
        }
      }
  })
})

function logout() {
  localStorage.clear()
  window.location.replace("http://localhost:8080")
}


$(document).ready(function() {
    $.ajax({
        url: "http://localhost:3000/questions/getQuestionDetail",
        type: "POST",
        data: {
            idQuestions: localStorage.getItem('idQuestions')
        },
        success: function(result) {
            // console.log(${result[0].idAnswers[0].idVote.length});
            var question = `
          <div class="question ui grid">
              <div class="voteAns">
                  <div>
                      <h3 id="voteIdQuestion" >${result[0].idVote.length}</h3> Votes
                  </div>
                  <div id="btnquestionvote">
                    <button onclick="questionVote('${result[0]._id}')" class="ui toggle button active">Upvote</button>
                  </div>
              </div>
              <div class="Ques">
                  <a href="#">
                      <div>${result[0].title}</div>
                  </a>
                  <p>${result[0].description}</p>
              </div>
          </div>

          <h3 id="totalanswer">Total Answers ${result[0].idAnswers.length}</h3><br>`
            var answer = ""
            for (var i = result[0].idAnswers.length - 1; i >= 0; i--) {
                answer += `
              <div class="answer ui grid">
                  <div class="voteAns">
                      <div>
                          <h3 id="voteIdAnswer${result[0].idAnswers[i]._id}">${result[0].idAnswers[i].idVote.length}</h3> Votes
                      </div>
                      <div id="btnanservote${result[0].idAnswers[i]._id}">
                        <button onclick="answervote('${result[0].idAnswers[i]._id}')" class="ui toggle button active">Upvote</button>
                      </div>
                  </div>
                  <div class="Ques">
                      <div>${result[0].idAnswers[i].textAnswer}</div>
                  </div>
              </div><br><br>`
            }

            $("#listquestion").append(question)
            if(result[0].idVote.indexOf(userID[0])>=0){
              document.getElementById("btnquestionvote").innerHTML = `<button onclick="questionDownVote('${result[0]._id}')" class="ui toggle button grey">Downvote</button>`
            }
            $("#listanswer").append(answer)
            for (var i = result[0].idAnswers.length - 1; i >= 0; i--) {
              if(result[0].idAnswers[i].idVote.indexOf(userID[0])>=0){
                document.getElementById(`btnanservote${result[0].idAnswers[i]._id}`).innerHTML = `<button onclick="answerDownVote('${result[0].idAnswers[i]._id}')" class="ui toggle button grey">Downvote</button>`
              }
            }
        },
        error: function(err) {
            console.log(err);
        }
    })
})

function answer() {
    if(userID.length>0){
      $.ajax({
        url: "http://localhost:3000/answers/add",
        type: "POST",
        data: {
            textAnswer: tinyMCE.activeEditor.getContent()
        },
        success: function(result) {
          inputIdAnswer(result._id,tinyMCE.activeEditor.getContent())
          tinyMCE.activeEditor.setContent('')
        }
      })
    }else{
      swal("Warning!", "Please Login")
    }
}

function inputIdAnswer(input,textAnswer) {
  $.ajax({
    url: "http://localhost:3000/questions/addAnswerToQuestions",
    type: "PUT",
    data: {
        idQuestions: localStorage.getItem('idQuestions'),
        idAnswers: input
    },
    success: function(result) {
      var total = Number($("#totalanswer").text().match(/\d/g)[0])+1
      $("#totalanswer").text(`Total Answers ${total}`)

      var texAnswer = `
            <div class="answer ui grid">
                <div class="voteAns">
                    <div>
                        <h3 id="voteIdAnswer${input}">0</h3> Votes
                    </div>
                    <div id="btnanservote${input}">
                      <button onclick="answervote('${input}')" class="ui toggle button active">Upvote</button>
                    </div>
                </div>
                <div class="Ques">
                    <div>${textAnswer}</div>
                </div>
            </div><br><br>`

      $("#listanswer").prepend(texAnswer)
    }
  })
}

function questionVote(inputIdQuestion) {
    if(userID.length>0){
      var voteQuestion = Number($("#voteIdQuestion").text())
      $("#voteIdQuestion").text(`${voteQuestion+1}`)
      document.getElementById("btnquestionvote").innerHTML = `<button onclick="questionDownVote('${inputIdQuestion}')" class="ui toggle button grey">Downvote</button>`
      runVoteQuestion(userID, inputIdQuestion)
    }else{
      swal("Warning!", "Please Login")
    }
}

function answervote(inputIdAnswer) {
  if(userID.length>0){
    var voteAnswer = Number($(`#voteIdAnswer${inputIdAnswer}`).text())
    $(`#voteIdAnswer${inputIdAnswer}`).text(`${voteAnswer+1}`)
    document.getElementById(`btnanservote${inputIdAnswer}`).innerHTML = `<button onclick="answerDownVote('${inputIdAnswer}')" class="ui toggle button grey">Downvote</button>`
    runVoteAnswer(userID, inputIdAnswer)
  }else{
    swal("Warning!", "Please Login")
  }
}

function questionDownVote(inputIdQuestion) {
  if(userID.length>0){
    var voteQuestion = Number($("#voteIdQuestion").text())
    $("#voteIdQuestion").text(`${voteQuestion-1}`)
    document.getElementById("btnquestionvote").innerHTML = `<button onclick="questionVote('${inputIdQuestion}')" class="ui toggle button active">Upvote</button>`
    runDownVoteQuestion(userID, inputIdQuestion)
  }else{
    swal("Warning!", "Please Login")
  }
}

function answerDownVote(inputIdAnswer) {
  if(userID.length>0){
    var voteAnswer = Number($(`#voteIdAnswer${inputIdAnswer}`).text())
    $(`#voteIdAnswer${inputIdAnswer}`).text(`${voteAnswer-1}`)
    document.getElementById(`btnanservote${inputIdAnswer}`).innerHTML = `<button onclick="answervote('${inputIdAnswer}')" class="ui toggle button active">Upvote</button>`
    runDownVoteAnswer(userID, inputIdAnswer)
  }else{
    swal("Warning!", "Please Login")
  }
}

function runVoteQuestion(userID,inputIdQuestion){
  if(userID.length == 0){
    swal("Warning!", "Please Login")
  }else{
    $.ajax({
      url: "http://localhost:3000/questions/runVoteQuestion",
      type: "PUT",
      data: {
          userID: userID[0],
          inputIdQuestion: inputIdQuestion
      },
      success: function(result) {
        return true
      }
    })
  }
}

function runVoteAnswer(userID, inputIdAnswer){
  if(userID.length == 0){
    swal("Warning!", "Please Login")
  }else{
    $.ajax({
      url: "http://localhost:3000/answers/runVoteAnswer",
      type: "PUT",
      data: {
          userID: userID[0],
          inputIdAnswer: inputIdAnswer
      },
      success: function(result) {
        return true
      }
    })
  }
}

function runDownVoteQuestion(userID,inputIdQuestion) {
  if(userID.length == 0){
    swal("Warning!", "Please Login")
  }else{
    $.ajax({
      url: "http://localhost:3000/questions/show",
      type: "GET",
      success: function(result) {
        return result.status
      }
    })
  }
}

function runDownVoteAnswer(userID, inputIdAnswer) {
  if(userID.length == 0){
    swal("Warning!", "Please Login")
  }else{
    $.ajax({
      url: "http://localhost:3000/answers/runDownVoteAnswer",
      type: "PUT",
      data: {
          userID: userID[0],
          inputIdAnswer: inputIdAnswer
      },
      success: function(result) {
        return result.status
      }
    })
  }
}
//
// function CheckDownVoteQuestion(userID,inputIdQuestion) {
//   if(userID.length == 0){
//     swal("Warning!", "Please Login")
//   }else{
//     $.ajax({
//       url: "http://localhost:3000/questions/show",
//       type: "GET",
//       success: function(result) {
//         if(result.idVote.indexOf(userID[0])>=0){
//           return true
//         }
//       }
//     })
//   }
// }
//
// function CheckDownVoteAnswer(userID, inputIdAnswer) {
//   if(userID.length == 0){
//     swal("Warning!", "Please Login")
//   }else{
//     $.ajax({
//       url: "http://localhost:3000/answers/show",
//       type: "GET",
//       success: function(result) {
//         if(result.idVote.indexOf(userID[0])>=0){
//           return true
//         }
//       }
//     })
//   }
// }
//
