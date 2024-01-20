
var order
function yourJsFunction() {


  n = $("#name").val()
  m = $("#mail").val()
  p = $("#password").val()
  p2 = $("#password2").val()
  n2=$("#number").val()
  if (p !== p2) {
    alert("Passwords should be same")
  } else {




    var h = 0

    order = {
      name: n,
      mail: m,
      password: p,
      number:n2
    }
    $.ajax({
      type: 'GET',
      url: "http://localhost:8080/api/v1/user",
      success: function (data) {
        console.log(data)
        for (i in data) {
          if (data[i].mail == m || data[i].number==n2) {

            h = 1
            break
          } else {
            h = 0
          }



        }
        if (h === 1) {
          alert("Email already used")
        } else {

          $.ajax({
            url: "http://localhost:8080/api/v1/user",
            method: "POST",
            data: order,
            headers: {
              "Content-Type": "application/x-www-form-urlencoded"
            },
            success: function () {
              alert("done")
              window.location.href = "data.html"
            },
            error: function () {
              alert("error")
            }
          })
          alert("done")
          localStorage.setItem("login", "true")
          window.location.href = "data.html"


        }
      }
    })
  }


}
