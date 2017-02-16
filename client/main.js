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
        refreshPage()
      }
    }
  })
}
function refreshPage(){

}
