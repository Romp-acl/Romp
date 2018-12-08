var markers = [];

function initMap() {
    var map = new google.maps.Map(document.getElementsByClassName('map')[0], {
        zoom: 10, 
        center: new google.maps.LatLng(45.5122, -122.6587),
    });
    setTimeout(function(){ 
        for (var i=0; i < UserProfile.all.length; i++) {
            markers.push(new google.maps.Marker({
                position: UserProfile.all[i].coords, 
                map: map, 
                title: UserProfile.all[i].petObj.name,
                properties: {
                    owner_id: UserProfile.all[i].id,
                    color: UserProfile.all[i].petObj.color, 
                    breed: UserProfile.all[i].petObj.breed,
                    sex: UserProfile.all[i].petObj.sex,
                    age: UserProfile.all[i].petObj.age,
                    img: UserProfile.all[i].petObj.imgUrl,
                    category: [UserProfile.all[i].petObj.breed.toLowerCase(), UserProfile.all[i].petObj.color.toLowerCase(), UserProfile.all[i].petObj.sex.toLowerCase(), UserProfile.all[i].petObj.size.toLowerCase()]
                }
            }));
        };
        for(var m=0; m < markers.length; m++) {
            markers[m].addListener('click', buildMarkerPopup);
            }
    }, 1000);
    
    function buildMarkerPopup() {
        var markerContent = '<div id="markerContent">'+
                            '<div id="siteNotice">'+
                            '</div>'+
                            '<div id="mapBodyContent">'+
                            '<div id="markerPetImage">'+
                            '<img src="'+this.properties.img+'">'+
                            '</div>'+
                            '<div id="markerPetInfo">'+
                            '<h1 id="firstHeading" class="firstHeading">'+this.title+'</h1>'+
                            '<p><b>Age: </b>'+this.properties.age+'<br>'+
                            '<b>Breed: </b>'+this.properties.breed+'<br>'+
                            '<b>Color: </b>'+this.properties.color+'<br>'+
                            '<b>Sex: </b>'+this.properties.sex+'<br>'+
                            '<button onclick="viewProfileBTN('+this.properties.owner_id+')">View Profile</button></p>'
                            '</div>'+
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
        var map = new google.maps.Map(document.getElementsByClassName('friendMap')[0], {
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
    for (var i = 0; i < UserProfile.all.length; i++) {
        if (UserProfile.all[i].id == id) {
            friendProfile = UserProfile.all[i];
            $('.userProfile').removeClass('hide');
            $('.userProfile').html(UserProfile.all[i].toHtml());
            $('.hero').hide();
            $('.userProfile').show().find('.map').removeClass('map').addClass('friendMap');
            $('.mapPlusFilters button').hide();
            // $('#options').removeClass('active');
            initMsgBoard();
            initFriendMap(friendProfile);
            window.scrollTo(0, 0);
        }
    }
}


