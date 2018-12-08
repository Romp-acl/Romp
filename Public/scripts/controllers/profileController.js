
$(window).ready(function() {
  UserProfile.loadUsers();
  UserComment.loadComments();
  // setTimeout(() => {
  //   $('.userProfile').prepend(UserProfile.all[0].toHtml());
  //   initMap();
  // }, 100);
})

