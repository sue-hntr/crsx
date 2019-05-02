// var User = require('../models/user');
  
  $(document).ready(function () {
        console.log("lights up");
        // console.log("JQ: " + req.session.userId);
        $.ajax("/api/users")
            .then(function (data) {
            console.log(data);
            


        // $.get("api/users)
        // User.findById({_id: req.session.userId}, 'firstname lastname email' , function (err, person){
        //     if (err) {
        //         return next(error);
        //     } else {
        //         console.log("profile" + user.firstname);
        //     }
        //   }) //close user find
          $(".cfirstname").text("George");
            
      })
    })
