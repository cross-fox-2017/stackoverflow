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
                          <h3 id="voteIdAnswer${result[0].idAnswers[i]._id}">${result[0].idAnswers[0].idVote.length}</h3> Votes
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
            $("#listanswer").append(answer)
        },
        error: function(err) {
            console.log(err);
        }
    })
})

function answer() {
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
    var voteQuestion = Number($("#voteIdQuestion").text())
    $("#voteIdQuestion").text(`${voteQuestion+1}`)
    document.getElementById("btnquestionvote").innerHTML = `<button onclick="questionDownVote('${inputIdQuestion}')" class="ui toggle button grey">Downvote</button>`
}

function answervote(inputIdAnswer) {
  var voteAnswer = Number($(`#voteIdAnswer${inputIdAnswer}`).text())
  $(`#voteIdAnswer${inputIdAnswer}`).text(`${voteAnswer+1}`)
  document.getElementById(`btnanservote${inputIdAnswer}`).innerHTML = `<button onclick="answerDownVote('${inputIdAnswer}')" class="ui toggle button grey">Downvote</button>`
}

function questionDownVote(inputIdQuestion) {
  var voteQuestion = Number($("#voteIdQuestion").text())
  $("#voteIdQuestion").text(`${voteQuestion-1}`)
  document.getElementById("btnquestionvote").innerHTML = `<button onclick="questionVote('${inputIdQuestion}')" class="ui toggle button active">Upvote</button>`
}

function answerDownVote(inputIdAnswer) {
  var voteAnswer = Number($(`#voteIdAnswer${inputIdAnswer}`).text())
  $(`#voteIdAnswer${inputIdAnswer}`).text(`${voteAnswer-1}`)
  document.getElementById(`btnanservote${inputIdAnswer}`).innerHTML = `<button onclick="answervote('${inputIdAnswer}')" class="ui toggle button active">Upvote</button>`
}

function runVoteQuestion(input){

}

function runVoteAnswer(input){

}
