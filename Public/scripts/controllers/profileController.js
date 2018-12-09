
$(window).ready(function() {
  UserProfile.loadUsers();
  UserComment.loadComments();
  $('.hamburgerMenu').on('click', function(){
    $('header nav').toggleClass('active');
  })
})

