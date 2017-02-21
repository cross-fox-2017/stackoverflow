
$(document).ready(function() {
  $.ajax({
      url: "http://localhost:3000/decode",
      type: "POST",
      data:{
          token: localStorage.getItem("token")
      },
      success: function(result) {
        localStorage.setItem('users', result.id)
        if (result.name == "TokenExpiredError" || result.name == false || result.name == "JsonWebTokenError") {
          window.location.href = "http://localhost:8080"
        }
      }
  })
})

function create() {
  $.ajax({
    url: "http://localhost:3000/questions/add",
    type: "POST",
    data: {
      idUser: localStorage.getItem("users"),
      title: $("#title").val(),
      description: $("#description").val()
    },
    success: function(result) {
      swal("Status!", "Success!", "success")
      $("#title").val(''),
      $("#description").val('')
    },error: function(err) {
        console.log(err);
    }
  })
}
