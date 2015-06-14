var util = {
	get_rand_color : function() {
		var color_r = Math.floor(Math.random() * 255) + 1;
		var color_g = Math.floor(Math.random() * 255) + 1;
		var color_b = Math.floor(Math.random() * 255) + 1;
		return "rgb("+color_r+","+color_g+","+color_b+")";
	},
	get_rand_array : function(array_size) {
		var rand_value = 0;
		var rand_array = [];
		for (var i = 0; i < array_size; i++) {
			rand_value = Math.floor(Math.random() * 1000) + 1;
			rand_array.push(rand_value);
		};
		return rand_array;
    },

	sleep : function(milliseconds) {
		var start = new Date().getTime();
		for (var i = 0; i < 1e7; i++) {
			if ((new Date().getTime() - start) > milliseconds){
				break;
			}
		}
	}
	
}
