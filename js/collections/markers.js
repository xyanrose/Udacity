/*global Backbone */
var app = app || {};

(function () {
	'use strict';

	// Todo Collection
	// ---------------

	// The collection of markers is backed by *localStorage* instead of a remote
	// server.
	var Markers = Backbone.Collection.extend({
		// Reference to this collection's model.
		model: app.Marker,

		// Save all of the markers under the `"markers"` namespace.
		localStorage: new Backbone.LocalStorage('markers-backbone'),

		// We keep the Markers in sequential order, despite being saved by unordered
		// GUID in the database. This generates the next order number for new items.
		nextOrder: function () {
			return this.length ? this.last().get('order') + 1 : 0;
		},

		// Markers are sorted by their original insertion order.
		comparator: 'order'
	});

	// Create our global collection of **Markers**.
	app.markers = new Markers();
})();
