
var map;



function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 42.352271, lng: -71.05524200000001},
    zoom: 14
  });

  function displayLocation(position){
    console.log(position);
    var myPos = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
    var marker = new google.maps.Marker({
        position: myPos
      });
      marker.setMap(map);

  }


  cars =[
  	{"id": "mXfkjrFw", "lat": 42.3453, "lng": -71.0464},
  	{"id": "nZXB8ZHz", "lat": 42.3662, "lng": -71.0621},
    {"id": "Tkwu74WC", "lat": 42.3603, "lng": -71.0547},
    {"id": "5KWpnAJN", "lat": 42.3472, "lng": -71.0802},
    {"id": "uf5ZrXYw", "lat": 42.3663, "lng": -71.0544},
    {"id": "VMerzMH8", "lat": 42.3542, "lng": -71.0704}
    ];

    var image = "car.png";

    for(var i = 0; i < 6; i++){
    	var carPos = new google.maps.LatLng(cars[i]["lat"],cars[i]["lng"]);
    	var marker = new google.maps.Marker({
    		position: carPos, 
    		title: cars[i]["id"],
    		icon: image

    	});
    	marker.setMap(map);
    }
    navigator.geolocation.getCurrentPosition(displayLocation);





}
