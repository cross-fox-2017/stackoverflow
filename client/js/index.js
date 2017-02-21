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
