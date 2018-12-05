$('.hero button').on('click', function(){$('.signupPopup').toggleClass('active')});
$('.signupPopup li').on('click', function(e){
    $('.signupPopup li').css('color', 'white');
    $(this).css('color', 'yellow');
    const targetText = e.target.innerText.toLowerCase();
    $(`.heroForm`).removeClass('active');
    $(`.${targetText}`).addClass('active');
})

var formObj = {};

$( "#newUserForm" ).on( "submit", function( event ) {
    event.preventDefault();
    var formInformation = $( this ).serialize();
    var breakToArray = formInformation.split('&');
    for(var i = 0; i < breakToArray.length; i++) {
        var splitArrayString = breakToArray[i].split('=');
        formObj[splitArrayString[0]] = splitArrayString[1];
    }
    formObj["petIMG"] = $("#newUserForm input[name='petIMG']").val();
    console.log(formObj);
    var objToJSON = JSON.stringify(formObj);
    console.log(objToJSON);
    
    // $.post('/regForm', objToJSON)
    // .then(console.log);
    // // .then(callback);
    
  });
// $( "#newUserForm" ).on( "submit", function( event ) {
//     event.preventDefault();
//     var formInformation = $( this ).serialize();
//     var breakToArray = formInformation.split('&');
//     for(var i = 0; i < breakToArray.length; i++) {
//         var splitArrayString = breakToArray[i].split('=');
//         formObj[splitArrayString[0]] = splitArrayString[1];
//     }
//     formObj["petIMG"] = $("#newUserForm input[name='petIMG']").val();
//     console.log(formObj);
//     var objToJSON = JSON.stringify(formObj);
//     console.log(objToJSON);
    
//     // $.post('/regForm', objToJSON)
//     // .then(console.log);
//     // // .then(callback);
    
//   });