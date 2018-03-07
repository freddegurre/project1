
//google maps api key AIzaSyD7b6YGD2VKhvICqzlYp3rvpn-V54UMP3Y

//var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
//var labelIndex = 0;
var markers = [];
var map;
var infowindow;
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

	
    // This event listener calls addMarker() when the map is clicked.
    google.maps.event.addListener(map, 'click', function (event) {
        addMarker(event.latLng, map);
        console.log(event.latLng.lat);
        //map.setCenter(event.latLng);

    });
    // Adds a marker to the map.
    function addMarker(location, map, image, info) {
var iconBase = 'https://i.imgur.com/CoiFeTy.png';
        //-------------    
      
        //the query for the emojis. 
        var queryUrl = "https://www.emojidex.com/api/v1/utf_emoji/";
        var proxy = "https://cors-anywhere.herokuapp.com/";

        //call the query
        $.ajax({
            method: "GET",
            url: proxy + queryUrl
        }).then(function (response) {
            //for each emoji in response
            // console.log(response);
            var results = JSON.parse(response);
            for (i = 0; i < results.length; i++) {
                //create div and give it class 
                var emojiDiv = $("<div class='setEmoji'>");

                //check if there is actual emoji in the response
                if (results[i].moji) {
                    if (results[i].category === "abstract") {
                        $(".abstract").append("<div class='setEmoji' data-emoji='" + results[i].moji + "'>" + results[i].moji);
                    }
                    if (results[i].category === "faces") {
                        $(".faces").append("<div class='setEmoji' data-emoji='" + results[i].moji + "'>" + results[i].moji);
                    }
                    if (results[i].category === "food") {
                        // console.log("yay food ", results[i].moji)
                        $(".food").append("<div class='setEmoji' data-emoji='" + results[i].moji + "'>" + results[i].moji);
                    }
                    if (results[i].category === "nature") {
                        $(".nature").append("<div class='setEmoji' data-emoji='" + results[i].moji + "'>" + results[i].moji);
                    }
                    if (results[i].category === "objects") {
                        $(".objects").append("<div class='setEmoji' data-emoji='" + results[i].moji + "'>" + results[i].moji);
                    }
                    if (results[i].category === "places") {
                        $(".places").append("<div class='setEmoji' data-emoji='" + results[i].moji + "'>" + results[i].moji);
                    }
                    if (results[i].category === "symbols") {
                        $(".symbols").append("<div class='setEmoji' data-emoji='" + results[i].moji + "'>" + results[i].moji);
                    }
                    if (results[i].category === "tools") {
                        $(".tools").append("<div class='setEmoji' data-emoji='" + results[i].moji + "'>" + results[i].moji);
                    }
                    if (results[i].category === "transportation") {
                        $(".transportation").append("<div class='setEmoji' data-emoji='" + results[i].moji + "'>" + results[i].moji);
                    }

                    // if(results[i].category === "food"){
                    //     console.log("yay food ", results[i].moji)
                    //     emojiDiv.append(results[i].moji);
                    // }

                    // if(results[i].category === "food"){
                    //     console.log("yay food ", results[i].moji)
                    //     emojiDiv.append(results[i].moji);
                    // }
                    //append the emoji to the emojiDiv 
                    // emojiDiv.append(results[i].moji);
                    //append the emoji div to body content.
                    // $(".emojiBox").append(foodDiv);
                    //set the data attribute equal to emoji 



                }

            }
        
        });

        //---------

        //create a new marker. 
        marker = new google.maps.Marker({
            animation: google.maps.Animation.DROP,
            position: location,
            //label: image,
            label: {
                text: image,
                fontSize: "30px"
            },
            map: map,
            icon: 'https://i.imgur.com/qIi2Mww.png',
            customInfo: uniqueId,
            info: []


        });


        //when anything on page with calass .setEmoji is clicked
        $(document).on("click", ".setEmoji", function () {
            //store value in the image var. 
            image = $(this).attr("data-emoji");

            //function to update label of current marker label
            function updateLabel() {
                // set the label to be chosen emoji
                this.marker.setLabel(image)
                //return the image var to empty so that next created marker does not have a label from start
                image = "";

            }
            updateLabel();
        });

        // add one to unique id so that next marker get its own id.
        uniqueId++;
        //push the marker to array of markers. 
        markers.push(marker);


        //this opens popup when marker is clicked. 
        marker.addListener('click', function () {
            this.infowindow.open(map, this);

        });

        var contentString = '<div id="content">' +
            '</div>' +
            '<br>' +
            '<div id="namePin">' +
            '<form class="form-inline">' +
            '<div class="input-group">' +
            '<input type="text" class="form-control" id="input" placeholder="Location Title">' +
            '</div>' +
            '</form>' +
            '</div>' +
            '<br>' +
            '<div class="subHeader">' +
            '</div>' +
            '<textarea class="form-control" id="description" rows="3"></textarea>' +
            '<br>' +
            '<div class="dropdown">' +
            '<button class="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">' +
            'Emoji Choices' +
            '<span class="caret"></span>' +
            '</button>' +
            '<br>' +
            '<ul class="dropdown-menu" aria-labelledby="dropdownMenu1">' +
            '<li>' +
            '<div class="emojiBox">' +
            '<div class= "abstract">Abstract' +
            '<br>' +
            '</div>' +
            '<br>' +
            '<div class= "faces">Faces' +
            '<br>' +
            '</div>' +
            '<br>' +
            '<div class= "food">Food' +
            '<br>' +
            '</div>' +
            '<br>' +
            '<div class= "nature">Nature' +
            '<br>' +
            '</div>' +
            '<br>' +
            '<div class= "objects">Objects' +
            '<br>' +
            '</div>' +
            '<br>' +
            '<div class= "places">Places' +
            '<br>' +
            '</div>' +
            '<br>' +
            '<div class= "symbols">Symbols' +
            '<br>' +
            '</div>' +
            '<br>' +
            '<div class= "tools">Tools' +
            '<br>' +
            '</div>' +
            '<br>' +
            '<div class= "transportation">Transportation' +
            '<br>' +
            '</div>' +
            '<br>' +
            '</li>' +
            '</ul>' +
            '</div>' +
            '<div id="bodyContent">' +
            '</div>' +
            '<br>' +
            '<button type="submit" class="btn btn-primary btn-xs" id="pinName"> Save</button>' +
            '<button type="submit" class="btn btn-danger btn-xs" id="delete"> Delete</button>';


        
            var infowindow = new google.maps.InfoWindow({
            content: contentString,
            maxWidth: 500,
            // pixelOffset: new google.maps.Size(160,200)
        });

        //always open popup div when marker is created
        infowindow.open(map, marker);

        marker.infowindow = infowindow
 
        google.maps.event.addListener(map, 'click', function() {
        infowindow.close();
      });
  
    }
   

    //when save inside infowindow is clicked
    $(document).on("click", "#pinName", function () {
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
        $("#description").hide()
        $("#pinName").hide()
        marker.info.push(pinName, description);

        
        localStorage.setItem('pinName', pinName);
        localStorage.setItem('description', description);
        localStorage.setItem('marker.label', marker.label);
        localStorage.setItem('marker.position', marker.position);
         
    });
    
    
    $(document).on("click", "#delete", function () {
    event.preventDefault()
    

            function DeleteMarker(id) {
                //Find and remove the marker from the Array
                for (var i = 0; i < markers.length; i++) {
                    if (markers[i].id == id) {
                        //Remove the marker from Map                  
                        markers[i].setMap(null);
        
                        //Remove the marker from array.
                        markers.splice(i, 1);

                    }
                }
            };
            DeleteMarker();
    });


  
    /*var savedName = localStorage.getItem('pinName');
  console.log(savedName);
  var savedDesc = localStorage.getItem('description');
  console.log(savedDesc);
  var savedLabel = localStorage.getItem('marker.label');
  console.log(savedLabel);
  var savedPosition = localStorage.getItem('marker.position');
  savedPosition= savedPosition.replace('(','');
  savedPosition= savedPosition.replace(')','');
  savedPosition = savedPosition.split(",")

  parseInt(savedPosition[0])
  parseInt(savedPosition[1])

  console.log(savedPosition[0])
 savedPosition = {lat:savedPosition[0], lng:savedPosition[1]};

 console.log(savedPosition);*/


 //push the pin name and description to marker info

 
//addMarker(savedPosition, map, savedLabel, savedName, savedDesc)
}
//{lat:cord[0], lng:cord[1]};



 // this deletes one marker. we need to change the event listener
       // google.maps.event.addListener(marker, 'click', function (event) {
          //  this.setMap(null);
        //});

    //---------- GEO LOCATION 

    // Try HTML5 geolocation.
   /* if (navigator.geolocation) {
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
google.maps.event.addListener(marker,"click",function(){
        if(infowindow)infowindow.close(this.InfoWindow);
    });*/