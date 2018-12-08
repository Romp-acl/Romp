function filterMarkers() {
    for (var i = 0; i < filter.length; i++) {
        setVisible();
    }
}

function updateView(element) {
    if (element) {
      //Array with checked boxes
      var checkedBoxes = ([...document.querySelectorAll('input[type=checkbox]:checked')]).map(function(option) { return option.value; });
      for (var i = 0; i < markers.length; i++) {
        //Filter to show any markets containing ALL of the selected options
        if(typeof markers[i].properties.category == 'object' && checkedBoxes.every(function (option) {
        return (markers[i].properties.category).indexOf(option) >= 0;})){
            markers[i].setVisible(true);
        }
        else {
            markers[i].setVisible(false);
        }
      }
    }
}

//Show filter sidebar
function filterSidebar(element) {
    $('#options').toggleClass('active');
    if($('#options').hasClass('active')) {
        $(element).text('Hide Filters');
    } else {
        $(element).text('Show Filters');
    }
}
    
