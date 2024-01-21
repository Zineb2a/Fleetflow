
var order
function yourJsFunction() {


  n = $("#firstname").val()
  l = $("#lastName").val()
  m = $("#mail").val()
  p = $("#password").val()
  
  n=n+" "+l


    order = {
      name: n,
      mail: m,
      password: p,
    }
    console.log(order)
    $.ajax({
      type: 'GET',
      url: "http://localhost:8080/api/v1/user",
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    },
      success: function (data) {
        console.log(data)
        for (i in data) {
          if (data[i].mail == m) {

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
              window.location.href = "home.html"
            },
            error: function () {
              alert("error")
            }
          })
          alert("done")
          localStorage.setItem("login", "true")
          window.location.href = "index.html"


        }
      }
    })
  }


