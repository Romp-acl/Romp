function UserComment(comment) {
    this.commenter_id = comment.commenter_id;
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

function addComments() {
    
}