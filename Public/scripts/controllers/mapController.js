var markers = [];
var filters = {
};
// var filterOptions = ['color', 'sex'];
function initMap() {
    var map = new google.maps.Map(document.getElementsByClassName('map')[0], {
        zoom: 10, 
        center: new google.maps.LatLng(45.5122, -122.6587),
    });
    getAddresses();
    
    setTimeout(function(){ 
        for (var i=0; i < petsInfo.length; i++) {
            markers.push(new google.maps.Marker({
                position: petsInfo[i].coordinates, 
                map: map, 
                title: petsInfo[i].name,
                properties: {
                    color: petsInfo[i].color,
                    sex: petsInfo[i].sex
                }
            }));
        };
    }, 1000);
}



function consolelogarray() {
    console.log(filters);
}


function pushInputToArray() {
    
    const entries = Object.entries(filters);
    if ($(this).is(':checked')) {
        filters[$(this).attr('name')] = $(this).attr('value');
        for (const [key, value] of entries) {
            filterMarkers1(key, value);
        }
        // filterMarkers1($(this).attr('name'), filters[$(this).attr('name')]);
    } else {
        delete filters[$(this).attr('name')];
        for (const [key, value] of entries) {
            filterMarkers1(key, value);
        }
    }
    console.log(entries);
}


function filterInput() {
    console.log($(this).attr('name'), $(this).attr('value'));
    filterMarkers1($(this).attr('name'), $(this).attr('value'));
}

function filterMarkers1(inputName, inputValue) {
    for(var m = 0; m < markers.length; m++) {
                if(markers[m].properties[inputName] == inputValue) {
                    markers[m].setVisible(true);
                } else {
                    markers[m].setVisible(false);
                }
    }
}
// function filterMarkers1(inputName, inputValue) {
//     for(var m = 0; m < markers.length; m++) {
//             if(markers[m].getVisible()){
//                 if(markers[m].properties[inputName] == inputValue) {
//                     markers[m].setVisible(true);
//                 } else {
//                     markers[m].setVisible(false);
//                 }
//             }
//     }
// }

function loadfuncs() {
    $('#filters input').on('change',pushInputToArray)
    // $('#filters input').on('change',filterInput)
}
window.addEventListener('load', loadfuncs);