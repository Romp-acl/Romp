$('.filter button').on('click', function(){$('.filterPopup').toggleClass('active')});
    const targetText = e.target.innerText.toLowerCase();
    $(`.heroForm`).removeClass('active');
    $(`.${targetText}`).addClass('active');
// })