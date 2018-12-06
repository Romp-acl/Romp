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

UserComment.prototype.insertComment = function() {
    const newComment = {
        commenter_id: this.commenter_id,
        username: this.username, 
        comment_text: this.comment_text, 
        profile_id: this.profile_id
    }
    console.log(newComment);
    $.post('/userComment', newComment)
    .then(console.log)
};

function addPrevComments() {
    UserComment.all.map(comment => {
        if(comment.profile_id == $loginID) {
            var $comment = comment.comment_text;
            var $user = comment.username;
            $('<li>').text(`${$user}: ${$comment}`).prependTo('.comments');  
        }
    })
}

function submitComment() {
    let newComment = new UserComment({
        commenter_id: $loginID,
        username: $username,
        comment_text: $('.commentBox').val(),
        profile_id: 0
    })
    console.log(newComment);
    newComment.insertComment();
}