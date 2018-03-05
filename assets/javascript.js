//google maps api key AIzaSyD7b6YGD2VKhvICqzlYp3rvpn-V54UMP3Y

//var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
//var labelIndex = 0;
var markers = [];
var map, infoWindow;
var infoWindows = [];
var image;
var uniqueId = 1;
var marker;


function initMap() {


    // Styles a map in night mode.
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 40.674, lng: -73.945 },
        zoom: 14,

    });
    infoWindow = new google.maps.InfoWindow;

    // This event listener calls addMarker() when the map is clicked.
    google.maps.event.addListener(map, 'click', function (event) {
        addMarker(event.latLng, map);

    });

    // Adds a marker to the map.
    function addMarker(location, map) {

        //-------------
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
        //---------
          
        //create a new marker. 
         marker = new google.maps.Marker({
            position: location,
            label: image,
            map: map,
            icon: marker,
            customInfo: uniqueId,
            info:[],
        
        });
            
        //when anything on page with calass .setEmoji is clicked
        $(document).on("click", ".setEmoji", function () {
            //store value in the image var. 
            image = $(this).attr("data-emoji");
           
            //setLabel(label, image)

            //function to update label of current marker label
            function updateLabel(){
                //set this maker.label to the value of image
                this.marker.label = image
               //return the image var to empty so that next created marker does not have a label from start
                image = "";

                //this.marker.label.reload ()
                
            }
            updateLabel();
        });
            // add one to unique id so that next marker get its own id.
            uniqueId++;
            //push the marker to array of markers. 
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

        //when save inside infowindow is clicked
        $("#pinName").on("click", function (event) {
            event.preventDefault()
            //store the value that user input in the topic-input form
            var pinName = $("#input").val().trim(); 
            //store the value of description in variable
            var description = $("#description").val().trim();
            //hide description form
            $("#description").hide();
            //push the name to popup 
            $("#namePin").html("<h2>" + pinName + "</h2>");
            //change the subheader to be the actual description written
            $(".subHeader").html("<h5>" + description + "</h5>");
            //push the pin name and description to marker info
            marker.info.push(pinName, description);
            
        }); 

    }



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

