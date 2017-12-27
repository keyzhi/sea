define(function(require,exports,module){
	var tan=function(){
		var textcontent=[
			'ken',
			'kenyip',
			'seajs demo'

		];

		var index=Math.floor(Math.random()*textcontent.length);
			return textcontent[index];
	}

	module.exports={
		tan:tan
	}
})


