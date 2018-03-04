//google maps api key AIzaSyD7b6YGD2VKhvICqzlYp3rvpn-V54UMP3Y


// Note: This example requires that you consent to location sharing when
// prompted by your browser. If you see the error "The Geolocation service
// failed.", it means you probably did not give permission for the browser to
// locate you.
//var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
//var labelIndex = 0;
var markers = [];
var map, infoWindow;
var infoWindows = [];
var image;
var uniqueId = 1;


function initMap() {


    // Styles a map in night mode.
    var map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 40.674, lng: -73.945 },
        zoom: 14,



        //just to get map black from here!!! 
        styles: [
            { elementType: 'geometry', stylers: [{ color: '#242f3e' }] },
            { elementType: 'labels.text.stroke', stylers: [{ color: '#242f3e' }] },
            { elementType: 'labels.text.fill', stylers: [{ color: '#746855' }] },
            {
                featureType: 'administrative.locality',
                elementType: 'labels.text.fill',
                stylers: [{ color: '#d59563' }]
            },
            {
                featureType: 'poi',
                elementType: 'labels.text.fill',
                stylers: [{ color: '#d59563' }]
            },
            {
                featureType: 'poi.park',
                elementType: 'geometry',
                stylers: [{ color: '#263c3f' }]
            },
            {
                featureType: 'poi.park',
                elementType: 'labels.text.fill',
                stylers: [{ color: '#6b9a76' }]
            },
            {
                featureType: 'road',
                elementType: 'geometry',
                stylers: [{ color: '#38414e' }]
            },
            {
                featureType: 'road',
                elementType: 'geometry.stroke',
                stylers: [{ color: '#212a37' }]
            },
            {
                featureType: 'road',
                elementType: 'labels.text.fill',
                stylers: [{ color: '#9ca5b3' }]
            },
            {
                featureType: 'road.highway',
                elementType: 'geometry',
                stylers: [{ color: '#746855' }]
            },
            {
                featureType: 'road.highway',
                elementType: 'geometry.stroke',
                stylers: [{ color: '#1f2835' }]
            },
            {
                featureType: 'road.highway',
                elementType: 'labels.text.fill',
                stylers: [{ color: '#f3d19c' }]
            },
            {
                featureType: 'transit',
                elementType: 'geometry',
                stylers: [{ color: '#2f3948' }]
            },
            {
                featureType: 'transit.station',
                elementType: 'labels.text.fill',
                stylers: [{ color: '#d59563' }]
            },
            {
                featureType: 'water',
                elementType: 'geometry',
                stylers: [{ color: '#17263c' }]
            },
            {
                featureType: 'water',
                elementType: 'labels.text.fill',
                stylers: [{ color: '#515c6d' }]
            },
            {
                featureType: 'water',
                elementType: 'labels.text.stroke',
                stylers: [{ color: '#17263c' }]
            }
            //to here!!!!
        ]
    });
    infoWindow = new google.maps.InfoWindow;

    // This event listener calls addMarker() when the map is clicked.
    google.maps.event.addListener(map, 'click', function (event) {
        addMarker(event.latLng, map);

    });

    // Adds a marker to the map.
    function addMarker(location, map) {
        // Add the marker at the clicked location,

                //the query for the emojis. 
                var queryUrl = "https://www.emojidex.com/api/v1/emoji/";
                //call the query
                $.ajax({
                    method: "GET",
                    url: queryUrl
                }).then(function (response) {
                    //for each emoji in response
                    for (i = 0; i < response.emoji.length; i++) {
                    //create div and give it class 
                        var emojiDiv = $("<div class='setEmoji'>");
                        //check if there is actual emoji in the response
                        if (response.emoji[i].moji) {
                            //append the emoji to the emojiDiv 
                            emojiDiv.append(response.emoji[i].moji);
                            //append the emoji div to body content. 
                            $("#bodyContent").append(emojiDiv);
                            //set the data attribute equal to emoji 
                            emojiDiv.attr("data-emoji", response.emoji[i].moji)

                        }

                    }
                });
          
        //create a new marker. 
        var marker = new google.maps.Marker({
            position: location,
            label: image,
            map: map,
            icon: marker,
            customInfo: uniqueId

        });
        
        //when anything on page with calass .setEmoji is clicked
        $(document).on("click", ".setEmoji", function () {
            //store value in the image var. 
            image = $(this).attr("data-emoji");
            //this needs to be looked at. 
            /*var marker = new google.maps.Marker({
                position: location,
                label: image,
                map: map,
                icon: "null",
                customInfo: uniqueId
                
            });*/
                
        });
        
      
        uniqueId++;
        markers.push(marker);
        console.log(markers);

        // this deletes one marker. we need to change the event listener
       // google.maps.event.addListener(marker, 'click', function (event) {
          //  this.setMap(null);
        //});


        //this opens popup when marker is clicked. 
        marker.addListener('click', function () {
            infowindow.open(map, marker);
        });
       
        //always open popup div
        infowindow.open(map, marker);
        
        $("#bodyContent").empty();
        $(".subHeader").html("<h5>Describe this spot!</h5>");

        $("#pinName").on("click", function (event) {
            event.preventDefault()
            //store the value that user input in the topic-input form
            var pinName = $("#input").val().trim();
            //push the value to topics array
            console.log(pinName);
            $("#namePin").html("<h3>" + pinName + "</h3>");
            var description = $("#description").val().trim();
            $("#description").hide();
            $(".subHeader").html("<h5>" + description + "</h5>");
            infoWindows.push(infowindow);
            console.log(infoWindows);
        });

    }


    //$("#")



    console.log(markers)

    var contentString = '<div id="content">' +
        '</div>' +
        '<div id="namePin">' +
            '<form class="form-inline">' +
                '<divclass="input-group">' +
                    '<input type="text" class="form-control" id="input" placeholder="Name of PIN">' +
                 '</div>' +
            '</form>' +
        '</div>' +
        '<div class="subHeader">'+
        '</div>'+
        '<textarea class="form-control" id="description" rows="3"></textarea>'+
        '<div id="bodyContent">' +
        '</div>' +
        '<button type="submit" class="btn btn-danger btn-xs" id="delete"> Delete </button>' +
        '<button type="submit" class="btn btn-primary btn-xs" id="pinName"> Save </button>'
        '</div>';

    var infowindow = new google.maps.InfoWindow({
        content: contentString,
        maxWidth: 250
    });




    //---------- GEO LOCATION 

    // Try HTML5 geolocation.
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            infoWindow.setPosition(pos);
            infoWindow.setContent('Curret location.');
            infoWindow.open(map);
            map.setCenter(pos);
        }, function () {
            handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }


}



function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
}

