$('.hero button').on('click', function(){
    userLogin();
    $('.signupPopup').toggleClass('active')});
    $('.signupPopup li').on('click', function(e){
        $('.signupPopup li').css('color', 'white');
        $(this).css('color', 'yellow');
        const targetText = e.target.innerText.toLowerCase();
        $(`.heroForm`).removeClass('active');
        $(`.${targetText}`).toggleClass('active');
})

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
            }
        });
        initLoginProfile();
        $('#return-profile').on('.click', function() {
            returnProfile($username);
        })
    });
}

