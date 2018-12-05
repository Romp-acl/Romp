$('.filter button').on('click', function(){$('.filterPopup').toggleClass('active')});
$('.signupPopup li').on('click', function(e){
    const targetText = e.target.innerText.toLowerCase();
    $(`.heroForm`).removeClass('active');
    $(`.${targetText}`).addClass('active');
})