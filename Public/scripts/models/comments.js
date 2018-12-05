function UserComment(comment) {
    this.commenter_id = comment.commenter_id;
    this.username = comment.username;
    this.comment_text = comment.comment_text;
    this.profile_id = comment.profile_id
}

UserComment.all = [];

UserComment.loadComments = function() {
    $.getJSON("/msgBoardData", function(json) {
        json.map(comment => {
            UserComment.all.push(new UserComment(comment));
        });
    })
}

function addPrevComments() {
    UserComment.all.map(comment => {
        if(comment.profile_id == $loginID) {
            var $comment = comment.comment_text;
            var $user = comment.username;
            $('<li>').text(`${$user}: ${$comment}`).prependTo('.comments');  
        }
    })
}