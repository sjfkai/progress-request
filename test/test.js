var progressRequest = require('../index.js');



console.log("testing callback mode");
progressRequest("https://www.baidu.com" , function(e, r){
	if(e){
		throw e;
	}
	if(r){
		console.log("callback mode OK");
		console.log("testing promise mode");
		progressRequest("https://www.baidu.com").then(function(r){
			console.log('promise mode OK');
		}).catch(function(e) {
			throw e;
		})
	}
});
