

var graph = {
	context   : document.getElementById("myCanvas"),
	ctx       : null,
	g_width   : 1000,
	g_height  : 400,
	g_left    : 20,
	g_top     : 20,
	bar_width : 0,
	bar_count : 0,
	data_obj : {
		value : [],
		per   : [] 
	},
	/**
	 * X좌표 Y좌표 그리기
	 */
	init : function(org_value) {

		this.data_obj.value = org_value;
		this.ctx = graph.context.getContext("2d");
		var ctx  = this.ctx;

		ctx.beginPath();
		ctx.moveTo(this.g_left, this.g_top);
		ctx.lineTo(this.g_left, this.g_top + this.g_height);
		ctx.lineTo(this.g_left + this.g_width, this.g_top + this.g_height);
		ctx.stroke();

		this.bar_count = this.data_obj.value.length;
		this.bar_width = this.g_width / this.bar_count;

		graph.rander();

	},
	/**
	 * 막대그래프 그리기
	 */
	rander : function() {

		var value = this.data_obj.value;
		var max_size = Math.max.apply(null,value);

		for (var i = 0; i < value.length; i++) {
			var per = Math.floor((value[i]/max_size) * 100);
			var color = util.get_rand_color();

			//this.data_obj.per.push(per);
			this.data_obj.per.push({
				'val'   : per,
				'color' : color
			});

			graph.insert_bar( i );
		};

		this.sorting_max  = this.data_obj.per.length;

		//console.log("this.data_obj.per");
		//console.log(this.data_obj.per);
    },
	/**
	 * 막대기 하나 그리기
	 */
	insert_bar : function(  order , color ){

		if(!color){
			color = this.data_obj.per[order].color;
		}else{
			this.data_obj.per[order].color = color;
		}
		var size  = this.data_obj.per[order].val;


		var b_bottom = Math.floor(this.g_height * (size/100));
		var b_top    = (this.g_top + this.g_height) - b_bottom;
		var b_left   = 20 + (this.bar_width * order);

		//console.log(order+" : "+b_left);


		this.ctx.fillStyle = color;
		this.ctx.fillRect(b_left,b_top,this.bar_width,b_bottom);
    },
	/**
	 * 막대기 하나 지우기
	 */
	remove_bar : function(order) {

		var size = this.data_obj.per[order].val;
		var b_bottom = Math.floor(this.g_height * (size/100));
		var b_top    = (this.g_top + this.g_height) - b_bottom;
		var b_left   = 20 + (this.bar_width * order);

		this.ctx.clearRect(b_left, b_top, this.bar_width, b_bottom);
    },
	/*
	 * 막대기 색 바꾸기
	 */
	change_color : function(order,color){
		this.remove_bar(order);
		this.insert_bar(order,color);
    },
	/**
	 * 막대기 2개의 순서 바꾸기
	 */
	change_item : function (x,y){

		var tmp;
		var loop = graph.data_obj.per;

		graph.remove_bar(x);
		graph.remove_bar(y);
		tmp = loop[x];
		loop[x] = loop[y];
		loop[y] = tmp;
		graph.insert_bar(x);
		graph.insert_bar(y);
	}
};
graph.init(util.get_rand_array(1000));
//graph.init([961, 856, 499, 26, 603, 1000]);










