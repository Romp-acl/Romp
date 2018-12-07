var markers = [];

function initMap() {
    var map = new google.maps.Map(document.getElementsByClassName('map')[0], {
        zoom: 10, 
        center: new google.maps.LatLng(45.5122, -122.6587),
    });
    
    setTimeout(function(){ 
        for (var i=0; i < petsInfo.length; i++) {
            markers.push(new google.maps.Marker({
                position: petsInfo[i].coordinates, 
                map: map, 
                title: petsInfo[i].name,
                properties: {
                    owner_id: petsInfo[i].owner_id,
                    color: petsInfo[i].color, 
                    breed: petsInfo[i].breed,
                    sex: petsInfo[i].sex,
                    age: petsInfo[i].age,
                    img: petsInfo[i].imgurl.split('Public/')[1],
                    category: [petsInfo[i].color, petsInfo[i].sex, petsInfo[i].size]
                }
            }));
        };
        for(var m=0; m < markers.length; m++) {
            markers[m].addListener('click', buildMarkerPopup);
            }
    }, 1000);
    
    function buildMarkerPopup() {
        var markerContent = '<div id="content">'+
                            '<div id="siteNotice">'+
                            '</div>'+
                            '<h1 id="firstHeading" class="firstHeading">'+this.title+'</h1>'+
                            '<div id="bodyContent">'+
                            '<img src="'+this.properties.img+'">'+
                            '<p><b>Age: </b>'+this.properties.age+'<br>'+
                            '<b>Breed: </b>'+this.properties.breed+'<br>'+
                            '<b>Color: </b>'+this.properties.color+'<br>'+
                            '<b>Sex: </b>'+this.properties.sex+'<br>'+
                            '<button onclick="viewProfileBTN('+this.properties.owner_id+')">View Profile</button></p>'
                            '</div>'+
                            '</div>';

        var infowindow = new google.maps.InfoWindow({
            content: markerContent
        });
        infowindow.open(map, this);
    }

}



function initFriendMap(friendProfile) {
    function initMap() {

        var friendCoords = friendProfile.coords;
        var map = new google.maps.Map(document.getElementsByClassName('map')[0], {
            zoom: 10, 
            center: new google.maps.LatLng(friendCoords),
        });
        
        setTimeout(function(){

            var marker = new google.maps.Marker({
                position: friendCoords, 
                map: map,
                properties: {
                    Address: friendProfile.address,
                }
            });
            marker.addListener('click', function(){
                var infowindow = new google.maps.InfoWindow({
                    content: friendProfile.address
                });
                infowindow.open(map, marker);
            });
        }, 1000);
    }
    initMap();
}




var friendProfile = [];
function viewProfileBTN(id) {
    matchCoords();
    for (var i = 0; i < UserProfile.all.length; i++) {
        if (UserProfile.all[i].id == id) {
            console.log(id);
            console.log(UserProfile.all[i].username);
            friendProfile = UserProfile.all[i];
            $('.hideOnMarkerClick').remove();
            $('.userProfile').removeClass('hide');
            $('.userProfile').prepend(UserProfile.all[i].toHtml());
            $('.hero').hide();
            $('userProfile').show().find('.map').removeClass('map').addClass('friendMap');
            initMsgBoard();
            initFriendMap(friendProfile);
            window.scrollTo(0, 0);
        }
    }
}


function filterMarkers() {
    for (var i = 0; i < filter.length; i++) {
        setVisible();
    }
}




function updateView(element) {
    if (element) {
      //Array with checked boxes
      var checkedBoxes = ([...document.querySelectorAll('input[type=checkbox]:checked')]).map(function(option) { return option.value; });
      console.log(checkedBoxes);
      for (var i = 0; i < markers.length; i++) {
        console.log(markers[i]);
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