$(document).ready(function() {
  $.ajax({
      url: "http://localhost:3000/questions/show",
      type: "GET",
      success: function(result) {

        var tampung = ""
        for (var i = result.length-1; i >=0 ; i--) {
          tampung +=`
                <div class="question ui grid">
                  <div class="voteAns">
                      <input id="idQuestions" type="hidden" name="" value="${result[i]._id}">
                      <input id="idUser" type="hidden" name="" value="${result[i].idUser}">
                      <div>
                          <h3>${result[i].idVote.length}</h3> Votes
                      </div>
                      <hr>
                      <div>
                          <h3>${result[i].idAnswers.length}</h3> Answer
                      </div>
                  </div>
                  <div class="Ques">
                      <a onclick="questionDetails('${result[i]._id}')" href="/question_detail.html">
                          <div>${result[i].title}</div>
                      </a>
                      <p>${result[i].description.slice(0,250)}  . . . . . . . .<a onclick="questionDetails('${result[i]._id}')" href="/question_detail.html">(Read More)<a/></p>
                  </div>
              </div>`
        }
        $("#listquestions").append(tampung)

      }, error: function(err) {
        console.log(err);
      }
  })
})

function questionDetails(idQuestions) {
  localStorage.setItem("idQuestions", idQuestions)
}
