/*global Backbone */
var app = app || {};

	app.Map = Backbone.Model.extend({},
		{	
			map: app.map,
			labels: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
			lastLabelIndex: 0,
		

			addMarker: function (title, longitude, latitude){
				markers.push(new google.maps.Marker({
								position: {lat: latitude, lng: longitude},
							    map: app.map,
							    title: title
				}));
			}
		}
	);


app.map = {};
function initMap() {
	 	app.map = new google.maps.Map(document.getElementById('map'), {
			center: {lat: 0, lng: 0},
			zoom: 2
		});
		markers = [];
}