var sorting = {

	sorting_max : graph.data_obj.per.length,
	target : 0,

	/**
	 * BUBBLE
	 */
	bubble_sorting : function() {

		var tmp;
		var prev = sorting.target;
		var next = prev+1;
		var loop = graph.data_obj.per;

		if( loop[next] && loop[prev].val > loop[next].val ){
			graph.change_item(prev,next);
		}
		
		if(prev==sorting.sorting_max){
			sorting.target = -1;
			sorting.sorting_max--;
		}

		if(sorting.sorting_max > 0){
			sorting.target++;
			setTimeout(sorting.bubble_sorting,0);
		}
	},

	/**
	 * QUICK
	 */
	quick_ins : null,
	quick_sorting : function(){ 
		if(!this.quick_ins){
			this.quick_ins = new sorting.quick();
		}else{
			this.quick_ins.sort(false);
		}
	},
	quick : function(start_obj){ 

		var _this = this;

		this.pivot = 0;
		this.left = 1;
		this.right = graph.data_obj.per.length-1;
		this.start_left  = 0;
		this.start_right = 0;
		this.start_pivot = 0;
		this.stop = false;

		if(start_obj){

			_this.left  = start_obj.left;
			_this.right = start_obj.right;
			_this.pivot = start_obj.pivot;

			_this.start_left  = start_obj.left;
			_this.start_right = start_obj.right;
			_this.start_pivot = start_obj.pivot;
		}else{

			_this.start_left  = _this.left;
			_this.start_right = _this.right;
			_this.start_pivot = _this.pivot;

		}

		this.sort = function() {


			var loop  = graph.data_obj.per;
			var left  = _this.left;
			var right = _this.right;
			var pivot = _this.pivot,
				left_ok = false,
				right_ok = false;


			//graph.change_color(pivot,"#000000");

			if(loop[left].val <= loop[pivot].val && loop[left+1]){
				left++;
			}else{
				left_ok = true;
			}

			if(loop[right].val >= loop[pivot].val && loop[right-1]){
				right--;
			}else{
				right_ok = true;
			}

			if( left_ok && right_ok ){
				if(left < right){
					graph.change_item(left,right);
					left_ok = false;
					right_ok = false;
				}
			}

			_this.left  = left;
			_this.right = right;

			//console.log("left :"+left);
			//console.log("right:"+right);
			//console.log('');


			// 하나가 끝남
			if(left > right || left==right ){
				if(left > right && loop[pivot].val > loop[right].val){


					graph.change_item(pivot,right);
					pivot = right;

				}else if(left == right){
					if(loop[pivot].val > loop[left].val){
						graph.change_item(pivot,left);
						pivot = left;
					}else if(loop[pivot].val > loop[left-1].val){
						graph.change_item(pivot,left-1);
						pivot = left-1;
					}
				}

				//console.log("_this.start_right - left");
				//console.log(_this.start_right - left);
				if(_this.start_right - left >= 1 && (pivot + 2 <= loop.length-1)){

					//sorting.quick_ins = new sorting.quick({
					var aa = new sorting.quick({
						'pivot' : pivot + 1,
						'left'  : (pivot + 2),
						'right' : _this.start_right
					});
				}else{
					console.log('e1');
				}


				console.log("_this.start_left - left");
				console.log(_this.start_left - left);
				if(right - _this.start_left >= 1 && (pivot - 1 >= 0)){
					//sorting.quick_ins = new sorting.quick({
					var ss = new sorting.quick({
						'pivot' : _this.start_pivot,
						'left'  : _this.start_left,
						'right' : (pivot - 1)
					});
				}else{
					console.log('e2');
				}

			}else{
				setTimeout(function(){
					_this.sort();
				},0);
			}


		}
		this.sort();
	},
};
