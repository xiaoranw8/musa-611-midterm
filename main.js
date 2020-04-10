/* =====================
Leaflet Configuration
===================== */

var map = L.map('map', {
  center: [40.000, -75.1090],
  zoom: 11
});

var Stamen_Watercolor = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.{ext}', {
	attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	subdomains: 'abcd',
	minZoom: 1,
	maxZoom: 16,
	ext: 'jpg'
}).addTo(map);


// load grocery store and farmers market and neighborhood
var mkt = "https://raw.githubusercontent.com/xiaoranw8/musa-611-midterm/master/mkt_clean.geojson";
var hoods = "https://raw.githubusercontent.com/azavea/geo-data/master/Neighborhoods_Philadelphia/Neighborhoods_Philadelphia.geojson";
var boundary = "https://raw.githubusercontent.com/xiaoranw8/musa-611-midterm/master/City_Limits.geojson";

// make markers for all market location
var makeMarker = function(feature){
  return L.circleMarker([feature.geometry.coordinates[1], feature.geometry.coordinates[0]], {
    fillColor: '#FE9FBA',
    color: '#FE4765',
    radius: 5,
    weight: 1.5,
    fillOpacity: 0.3
  });
};

// define different color for supermarket and farms market
var myfillcolor;
var mycolor;
var myStyle = function(feature){
  if (feature.properties.type == "Supermarket"){
    myfillcolor = '#3C6366';
    mycolor = '#3C6366';
  } else {
    myfillcolor = '#980B00';
    mycolor = '#980B00';
  }
  return L.circleMarker([feature.geometry.coordinates[1], feature.geometry.coordinates[0]], {
    fillColor: myfillcolor,
    color: mycolor,
    radius: 5,
    weight: 1.5,
    fillOpacity: 0.3
  });
};

var exteriorStyle = {
    color: 'black',
    fillOpacity: 0
};

// add popup
var setPopup = function(feature, layer){
  layer.bindPopup(feature.properties.name);
};

// filter the layer to only supermarket
var supermktFilter = function(feature) {
  if (feature.properties.type == 'Supermarket' ){
    return true;
  }
};

// filter the layer to only farmers market
var farmersmktFilter = function(feature) {
  if (feature.properties.type == 'Farmers market' ){
    return true;
  }
};

// define button to turn on supermktFilter
var supermarketrOnly = function(){
  $('#intro').hide();
  $('#supermarketOnly').show();
};

// define button to turn on farmersmktFilter
var farmersmktOnly = function(){
  $('#supermarketOnly').hide();
  $('#farmersmktOnly').show();
};

var clusters = L.markerClusterGroup(); // get marker clusters

// define button to turn on cluster map
var clusterOnly = function(){
  $('#farmersmktOnly').hide();
  $('#clusterOnly').show();
};

//count the number of market data in neighborhood
var countFunction = function(market, neighborhood){
};

// load boundary to map
$.getJSON(boundary, function(data){
  var boundaryData = L.geoJson(data, {
    style: exteriorStyle,
    interactive: false
  });
  map.addLayer(boundaryData);
});

//  load market to map
$.getJSON(mkt, function(data){
  var mktData = L.geoJson(data, {
    pointToLayer: makeMarker,
    onEachFeature: setPopup
  });
  map.addLayer(mktData);

  var onlySPM = L.geoJson(data, {
    filter: supermktFilter,
    pointToLayer: myStyle,
    onEachFeature: setPopup
  });

  var onlyFM = L.geoJson(data, {
    filter: farmersmktFilter,
    pointToLayer: myStyle,
    onEachFeature: setPopup
  });

  $('#supermarkeButton').click(function() {
    supermarketrOnly();
    map.removeLayer(mktData);
    map.addLayer(onlySPM);
  });

  $('#farmersmktButton').click(function() {
    farmersmktOnly();
    map.removeLayer(onlySPM);
    map.addLayer(onlyFM);
  });

  $('#clusterButton').click(function() {
    map.removeLayer(onlyFM);
    clusterOnly();
    map.addLayer(mktData);
    clusters.addLayer(mktData);
    map.addLayer(clusters);
    map.fitBounds(mktData.getBounds()); // change zoom level of the map
  });
});

$("#backButton").click(function() {
  $('#intro').show();
  $('#supermarketOnly').hide();
});


////////////////////////QUESTION////////////////////////
// var mktfinal;
// $.getJSON(mkt, function(data){
//   mktfinal = data;
// });
//
// var getdata = L.geoJson(mktfinal);
// map.addLayer(getdata);
//
// $(document).ready(function() {
//     $.getJSON(boundary, function(data){
//       var boundaryData = L.geoJson(data, {
//         style: exteriorStyle,
//         interactive: false
//       });
//       console.log(boundaryData);
//       map.addLayer(boundaryData);
//     });
//
//     map.addLayer(getdata);
// });
