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
                    category: [UserProfile.all[i].petObj.color, UserProfile.all[i].petObj.sex, UserProfile.all[i].petObj.size]
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
            $('#options').removeClass('active');
            $('.petProfile').eq(1).hide();
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