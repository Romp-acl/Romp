
function initMsgBoard() {
    $('#postComment').on('click', function() {
        submitComment();
        var $comment = $('.commentBox').val();
        $('<li>').text(`${$username}: ${$comment}`).prependTo('.comments');
        $('#postComment').attr('disabled', 'true');
        $('.counter').text('140');
        $('.commentBox').val('');
    })
    $('.commentBox').keyup(function() {
        var commentLength = $(this).val().length;
        var charLeft = 140 - commentLength;
        $('.counter').text(charLeft);
        if(commentLength == 0) {
            $('#postComment').attr('disabled', 'true');
        } else if (commentLength > 140) {
            $('#postComment').attr('disabled', 'true');
        }
        else {
            $('#postComment').removeAttr('disabled', 'true');
        }
    })
    $('#postComment').attr('disabled', 'true');
}

function returnProfile(username) {
    UserProfile.all.map(user => {
        if (user.username == username) {
            $('.userProfile').empty();
            $('.userProfile').prepend(user.toHtml());
            initLoginProfile();
        }
    })
}

function initLoginProfile() {
    $('userProfile').show();
    initMap();
    initMsgBoard();
    addPrevComments();
}


