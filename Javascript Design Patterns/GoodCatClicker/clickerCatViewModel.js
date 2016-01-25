var ViewModel = function (){
	this.clickCount = ko.observable(0);
	this.name = ko.observable('DevilCat');
	this.imgSrc = ko.observable('catClickerCat.jpg');
	this.levels = {0:"DevilCat",10:"tabby",20:"garfield"};
	this.incrementCounter = function() {
		this.clickCount(this.clickCount() + 1);
		this.setLevel();
	};

	this.setLevel = function () {
		console.log(Math.floor(this.clickCount()/10)*10);
	 	this.name(this.levels[Math.floor(this.clickCount()/10)*10]);
	};

	this.setName = function(name){
		this.name(name);
	};
}


ko.applyBindings(new ViewModel());