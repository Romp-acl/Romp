$('.hero button').on('click', function(){
    userLogin();
    $('.signupPopup').toggleClass('active');
});

$('#quick-login').on('click', function() {
    if ($('.signupPopup').hasClass('active')) {
        console.log('already active');
    } else {
        $('.signupPopup').toggleClass('active');
        $('.heroForm').toggleClass('active'); 
        userLogin();
    }
})

function setUpSignIn() {
    $('.signupPopup li').on('click', function(e){
        $('.signupPopup li').css('color', 'white');
        $(this).css('color', 'yellow');
        const targetText = e.target.innerText.toLowerCase();
        $(`.heroForm`).removeClass('active');
        $(`.${targetText}`).toggleClass('active');
    });  
}

var $username = "";
var $loginID = "";
var $password = "";
function userLogin() {
    $('#loginBtn').on('click', function() {
        $username = $("input[name='username']").val();
        $password = $("input[name='password']").val();
        UserProfile.all.map(user => {
            if ($username == user.username && $password == user.password) {
                $loginID = user.id; 
                $('.userProfile').prepend(user.toHtml());
                $('.hero').hide();
            };
        });
        $('#quick-login').text('sign out');
        $('#quick-login').on('click', function() {
            location.reload();
        });
        initLoginProfile();
        homeBtnActive();
    });
    
}

function homeBtnActive() {
    $('#return-profile').on('click', function() {
        returnProfile($username);
    });
}

$(window).ready(function() {
    setUpSignIn();
})