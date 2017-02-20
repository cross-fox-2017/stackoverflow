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
                      <h3>${result[0].idVote.length}</h3> Votes
                  </div>
                    <button class="ui toggle button active">Voted</button>
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
                          <h3>${result[0].idAnswers[0].idVote.length}</h3> Votes
                      </div>
                        <button class="ui toggle button active">Voted</button>
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
                        <h3>0</h3> Votes
                    </div>
                      <button class="ui toggle button active">Voted</button>
                </div>
                <div class="Ques">
                    <div>${textAnswer}</div>
                </div>
            </div><br><br>`

      $("#listanswer").prepend(texAnswer)
    }
  })
}
