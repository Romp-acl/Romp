var markers = [];
var filter = ["black"];

function initMap() {
    var portland = {lat: 45.5122, lng: -122.6587};
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
                    breed: petsInfo[i].breed,
                    sex: petsInfo[i].sex,
                    age: petsInfo[i].age,
                }
            }));
        };
    }, 3000);
}

function filterMarkers() {
    for (var i = 0; i < filter.length; i++) {
        setVisible();
    }
}
