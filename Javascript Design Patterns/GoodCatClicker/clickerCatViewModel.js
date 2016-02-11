var initialCats = [
	{
		clickCount: 0,
		name:'Tabby',
		imgSrc: 'catClickerCat.jpg',
		levels: {0:"DevilCat",10:"tabby",20:"garfield"},
		nicknames: ['cat','tbone']
	},
	{
		clickCount: 0,
		name:'meow',
		imgSrc: 'catClickerCat2.jpg',
		levels: {0:"coolCat",10:"bubs",20:"mewowowowowowow"},
		nicknames: ['mrown','mewmew']
	}
];
var Cat = function(data){
	this.clickCount = ko.observable(data.clickCount);
	this.name = ko.observable(data.name);
	this.imgSrc = ko.observable(data.imgSrc);//catClickerCat.jpg
	this.levels = data.levels;//{0:"DevilCat",10:"tabby",20:"garfield"}
	this.nicknames = ko.observableArray(this.nicknames);//['him','her']
};

var ViewModel = function (){
	var self = this;
	this.catList = ko.observableArray([]);

	initialCats.forEach(function(kittyCat){
		self.catList.push( new Cat(kittyCat));
	});
	self.currentCat = ko.observable( this.catList()[0]);
	this.incrementCounter = function() {
		this.clickCount(this.clickCount() + 1);
		self.setLevel();
	};

	this.setLevel = function () {
		if(self.currentCat().clickCount()<30){
	 		this.currentCat().name(this.currentCat().levels[Math.floor(this.currentCat().clickCount()/10)*10]);
		}
	};

	this.swapCat = function(data){
		console.log(data);
		self.currentCat( data);
	};
}


ko.applyBindings(new ViewModel());

