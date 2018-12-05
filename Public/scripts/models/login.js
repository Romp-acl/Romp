$('.hero button').on('click', function(){$('.signupPopup').toggleClass('active')});
$('.signupPopup li').on('click', function(e){
    $('.signupPopup li').css('color', 'white');
    $(this).css('color', 'yellow');
    const targetText = e.target.innerText.toLowerCase();
    $(`.heroForm`).removeClass('active');
    $(`.${targetText}`).addClass('active');
})

var $username = "";
var $password = "";
function userLogin() {
    $('#loginBtn').on('click', function() {
        $username = $("input[name='username']").val();
        $password = $("input[name='password']").val();
        UserProfile.all.map(user => {
            if ($username == user.username && $password == user.password) {
                $('.userProfile').prepend(user.toHtml());
                $('.hero').hide();
                $('userProfile').show();
            }
        });
    });
}

var formObj = {};
// $( ".registerForm form" ).on( "submit", function( event ) {
//     event.preventDefault();
//     var formInformation = $( this ).serialize();
//     var breakToArray = formInformation.split('&');
//     for(var i = 0; i < breakToArray.length; i++) {
//         var splitArrayString = breakToArray[i].split('=');
//         formObj[splitArrayString[0]] = splitArrayString[1];
//     }
//     formObj["petIMG"] = $("#newUserForm input[name='petIMG']").val();
//     console.log(formObj);
//     var objToJSON = JSON.stringify(formObj);
//     console.log(objToJSON);
    
//     // $.post('/regForm', objToJSON)
//     // .then(console.log);
//     // // .then(callback);
    
//   });


UserProfile.prototype.insertRecord = function(callback) {
    $.post('/regForm', {username: this.username, password: this.password, email: this.email, address: this.address, name: this.name, img: this.img, breed: this.breed, sex: this.sex, age: this.age, color: this.color, size: this.size, temperment: this.temperment, interests: this.interests, about: this.about})
    .then(console.log)
    .then(callback);
};


function blah() {
    let newnewuser = new UserProfile({
        name: 'hi'
    })
    console.log(newnewuser);
    
}

$( ".registerForm form" ).on( "submit", function( event ) {
    event.preventDefault();
    
    let newUser = new UserProfile({
        username: $("input[name=new-username]").val(),
        password: $("input[name=new-password]").val(),
        email: $("input[name=email]").val(),
        address: $("input[name=address]").val(),
        name: $("input[name=petname]").val(),
        img: $("input[name=petIMG]").val(),
        breed: $("input[name=breed]").val(),
        sex: $("input[name=sex]").val(),
        age: $("input[name=petage]").val(),
        color: $("input[name=petcolor]").val(),
        size: $("input[name=petsize]").val(),
        temperment: $("input[name=pettemperment]").val(),
        interests: $("input[name=petinterest]").val(),
        about: $("input[name=petabout]").val()
    });
    newUser.insertRecord();
    
  });

  
  
// newArticle.submit = function(event) {
//     event.preventDefault();
//     let article = new Article({
//       title: $('#article-title').val(),
//       author: $('#article-author').val(),
//       authorUrl: $('#article-author-url').val(),
//       category: $('#article-category').val(),
//       body: $('#article-body').val(),
//       publishedOn: new Date().toISOString()
//     });

//     article.insertRecord();
//   }