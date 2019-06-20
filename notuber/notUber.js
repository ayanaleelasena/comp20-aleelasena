var map;

//call back function to display the map and implement lab 10 functionality 
function initMap() {
  //create the map centered in Boston
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 42.352271, lng: -71.05524200000001},
    zoom: 12
  });

  //call back function to add a marker for my current position and draw the cars 
  function displayLocation(position){

    //create and mark my position 
    var myPos = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
    var myMarker = new google.maps.Marker({
        position: myPos
      });
      myMarker.setMap(map);

      //make the http request to get car positions
      var request;
      request = new XMLHttpRequest();
      request.open("POST", "https://hans-moleman.herokuapp.com/rides", true);
      request.setRequestHeader("Content-type", "application/x-www-form-urlencoded"); 

      //call back function to recieve the car details and draw the cars 
      //this function also calculates the distance to the nearest car from my pos
      request.onreadystatechange = function() {

        //only proccess JSON if the request status is complete
        if(this.readyState == 4 && this.status == 200){
            var image = "car.png";
            var minCarDistance = Number.MAX_SAFE_INTEGER;
            var closestCar;
            var closestCarID;
            var data = JSON.parse(request.responseText);

            //loop through all the cars adding markers for each
            for(var i = 0; i < data.length; i++){

                  var carPos = new google.maps.LatLng(data[i]["lat"],data[i]["lng"]);
                  var marker = new google.maps.Marker({
                  position: carPos, 
                  title: data[i]["username"],
                  icon: image
                  });
                  marker.setMap(map);

                  //store the nearest car distance and id 
                  var distance = google.maps.geometry.spherical.computeDistanceBetween(myPos, carPos) / 1609.34;
                  if(distance < minCarDistance){
                      minCarDistance = distance;
                      closestCarID = data[i]["username"];
                      closestCar = i;

                  }
             }

             //create info window for my location marker with the nearest car id and distance
             var contentString = "Nearest Car: " + closestCarID + 
                                 "<br> Distance to car: " + minCarDistance.toFixed(3) +" miles";
             var infowindow = new google.maps.InfoWindow({
                content: contentString
             });
             myMarker.addListener('click', function() {
                infowindow.open(map, myMarker);
             });

             //create the polyline from my marker to the nearest car
             var carPath = [
                {lat: position.coords.latitude, lng: position.coords.longitude},
                {lat: data[closestCar]["lat"], lng: data[closestCar]["lng"]}
             ];
             var carLine = new google.maps.Polyline({
                path: carPath,
                geodesic: true,
                strokeColor: '#00BFFF',  //draw the line in sky blue
                strokeOpacity: 1.0,
                strokeWeight: 2
            });

            carLine.setMap(map);
        }
      }
      //make the http post call to get an array of all of the car locations
      var requestString = "username=OT6tnoxK&lat=" + position.coords.latitude +
                          "&lng=" + position.coords.longitude;
      request.send(requestString);

  }
  //call to get my current position 
  navigator.geolocation.getCurrentPosition(displayLocation);

}
