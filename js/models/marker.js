/*global Backbone */
var app = app || {};
(function () {
	'use strict';
	// Our basic **Marker** model has `title`, `index`, and `completed` attributes.
	app.Marker = Backbone.Model.extend({
		// Default attributes for the todo
		// and ensure that each todo created has `title` and `completed` keys.

		initialize: function (marker){
			this.set("marker",
							new google.maps.Marker(
								{
									position: new google.maps.LatLng(marker.latitude, marker.longitude),
									map: app.map,
									label: marker.title,
									draggable: true
								}
							)
					);
			var that = this;
			google.maps.event.addListener(this.attributes.marker, 'dragend', function () {
				that.attributes.latitude = this.position.lat();
				that.attributes.longitude = this.position.lng();
				that.trigger('change');  
	        });
		}
	
	});
})();
