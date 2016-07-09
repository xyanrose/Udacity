/*global Backbone, jQuery, _, ENTER_KEY */
var app = app || {};
(function ($) {
	'use strict';

	// The Application
	// ---------------

	// Our overall **AppView** is the top-level piece of UI.
	app.MarkerAppView = Backbone.View.extend({

		// Instead of generating a new element, bind to the existing skeleton of
		// the App already present in the HTML.
		el: '#markerapp',

		// Our template for the line of statistics at the bottom of the app.
		//statsTemplate: _.template($('#stats-template').html()),

		// Delegated events for creating new items, and clearing completed ones.
		events: {
			'click #new-marker': 'createOnClick',
			'click #clear-completed': 'clearCompleted',
			'click #toggle-all': 'toggleAllComplete'
		},

		// At initialization we bind to the relevant events on the `Todos`
		// collection, when items are added or changed. Kick things off by
		// loading any preexisting todos that might be saved in *localStorage*.
		initialize: function () {
			//this.allCheckbox = this.$('#toggle-all')[0];
			this.$latInput = this.$('#latitude');
			this.$longInput = this.$('#longitude');
			//this.$footer = this.$('#footer');
			//this.$main = this.$('#main');
			this.$list = $('#marker-list');

			this.listenTo(app.markers, 'add', this.addOne);
			//this.listenTo(app.todos, 'reset', this.addAll);
			//this.listenTo(app.todos, 'change:completed', this.filterOne);
			//this.listenTo(app.todos, 'filter', this.filterAll);
			//this.listenTo(app.todos, 'all', this.render);

			// Suppresses 'add' events with {reset: true} and prevents the app view
			// from being re-rendered for every model. Only renders when the 'reset'
			// event is triggered at the end of the fetch.
			//app.todos.fetch({reset: true});
		},

		// Re-rendering the App just means refreshing the statistics -- the rest
		// of the app doesn't change.
		render: function () {
			var completed = app.todos.completed().length;
			var remaining = app.todos.remaining().length;

			if (app.todos.length) {
				this.$main.show();
				this.$footer.show();

				this.$footer.html(this.statsTemplate({
					completed: completed,
					remaining: remaining
				}));

				this.$('#filters li a')
					.removeClass('selected')
					.filter('[href="#/' + (app.TodoFilter || '') + '"]')
					.addClass('selected');
			} else {
				this.$main.hide();
				this.$footer.hide();
			}

			this.allCheckbox.checked = !remaining;
		},

		// Add a single todo item to the list by creating a view for it, and
		// appending its element to the `<ul>`.
		addOne: function (marker) {
			var view = new app.MarkerView({ model: marker });
			this.$list.append(view.render().el);
		},

		// Add all items in the **Todos** collection at once.
		addAll: function () {
			this.$list.html('');
			app.todos.each(this.addOne, this);
		},


		// Generate the attributes for a new Todo item.
		newAttributes: function (lat, lng) {
			var index = app.markers.nextOrder();
			var labels = app.Map.labels;
			return {
				title: labels[index % labels.length],
				latitude: lat,
				longitude: lng,
				order: index
			};
		},

		// If you hit return in the main input field, create new **Todo** model,
		// persisting it to *localStorage*.
		createOnClick: function () {
			var lat = this.$latInput.val().trim();
			var lng = this.$longInput.val().trim();
			if (lat && lng) {
				//var labels = app.Map.labels;
				app.markers.create(this.newAttributes(lat, lng));
				//addOne(new app.Marker(labels[++app.Map.lastLabelIndex % labels.length], lng, lat));
				this.$latInput.val('');
				this.$longInput.val('');
			}
		},

		// Clear all completed todo items, destroying their models.
		clearCompleted: function () {
			_.invoke(app.todos.completed(), 'destroy');
			return false;
		},
	});
})(jQuery);
