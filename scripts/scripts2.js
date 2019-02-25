var hospitals = [
  ['Royal Brisbane and Women Hospital', -27.44769905, 153.02678809, 4, 'Adult, Paediatric'],
  ['The Prince Charles Hospital', -27.3906023, 153.0228118, 4, 'Adult, Mental Health'],  
];

function initAutocomplete() {
  var markers = [];
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -27.4689682, lng: 153.0234991},      
    mapTypeId: 'roadmap',
    panControl: false,
    gestureHandling: 'cooperative',
    zoom: 11,
    mapTypeControl: false,
    streetViewControl: false,
    fullscreenControl: false,    

  });

  var iconBase = 'https://maps.google.com/mapfiles/kml/paddle/';
  var icons = {
    hospital: {
      icon: iconBase + 'grn-stars.png'
    },
  };


  var styles = [
    {
      featureType: 'all',
    },
  ];

  map.setOptions({ styles: styles });



  var input = /** @type {HTMLInputElement} */ (document.getElementById('pac-input',));
  /* map.controls[google.maps.ControlPosition.TOP_LEFT].push(input); */
  /* this is what binds the search box to the map */

  var searchBox = new google.maps.places.SearchBox(
    /** @type {HTMLInputElement} */ (input),
  );

  // [START region_getplaces]
  // Listen for the event fired when the user selects an item from the
  // pick list. Retrieve the matching places for that item.
  google.maps.event.addListener(searchBox, 'places_changed', function() {
    var places = searchBox.getPlaces();

    for (var i = 0, marker; (marker = markers[i]); i++) {
      marker.setMap(null);
    }

    // For each place, get the icon, place name, and location.
    markers = [];
    var bounds = new google.maps.LatLngBounds();

    for (var i = 0, place; (place = places[i]); i++) {
      var image = {
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25),
      };

      // Create a marker for each place.
      var marker = new google.maps.Marker({
        map: map,
        title: place.name,
        position: place.geometry.location,
      });

      markers.push(marker);

      bounds.extend(place.geometry.location);

      if (place.geometry.viewport) {
        map.fitBounds(place.geometry.viewport);
      } else {
        map.setCenter(place.geometry.location);
        map.setZoom(5); // Why 17? Because it looks good.
      }
    }
  });
  // [END region_getplaces]

  var place_markers = [];

  // Bias the SearchBox results towards places that are within the bounds of the
  // current map's viewport.

  // Make markers show if they are inside visible bounds
  google.maps.event.addListener(map, 'bounds_changed', function() {
    var bounds = map.getBounds();
    if (!bounds) {
      return;
    }
    searchBox.setBounds(bounds);

    // Remove out of bounds markers
    for (var k = 0; k < place_markers.length; k++) {
      var one_marker = place_markers[k];
      if (!bounds.contains(one_marker.getPosition())) {
        one_marker.setMap(null);
      }
    }

    // Create markers which should be visible
    for (var i = 0; i < hospitals.length; i++) {
      var placeLatLng = hospitals[i];

      var myLatLng = new google.maps.LatLng(placeLatLng[1], placeLatLng[2]);
      if (bounds.contains(myLatLng)) {
        var marker = new google.maps.Marker({
          position: myLatLng,
          map: map,
          title: placeLatLng[0],
          icon: icons['hospital'].icon,
        });
        place_markers.push(marker);
      }
    }
    // end places markers
  });
}

function toggleBounce() {
    if (marker.getAnimation() !== null) {
      marker.setAnimation(null);
    } else {
      marker.setAnimation(google.maps.Animation.BOUNCE);
    }
}


google.maps.event.addDomListener(window, 'load', initialize);



