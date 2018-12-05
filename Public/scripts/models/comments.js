function Comment(comment) {
    this.commenter_id = comment.commenter_id;
    this.comment_text = comment.comment_text;
    this.profile_id = comment.profile_id
}

Comment.all = [];

Comment.loadComments = function() {
    $.getJSON("/msgBoardData", function(json) {
        json.map(comment => {
            UserProfile.all.push(new Comment(comment));
        });
    })
}