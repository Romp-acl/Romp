$('.hero button').on('click', function(){$('.signupPopup').toggleClass('active')});
$('.signupPopup li').on('click', function(e){
    $('.signupPopup li').css('color', 'white');
    $(this).css('color', 'yellow');
    const targetText = e.target.innerText.toLowerCase();
    $(`.heroForm`).removeClass('active');
    $(`.${targetText}`).addClass('active');
})