function loadData(input) {
	var imgElem = document.getElementById('main-img');
	if(input.files && input.files[0]){
		var reader = new FileReader();

		reader.onload = function(e){
			imgElem.src = e.target.result;
		}

		reader.readAsDataURL(input.files[0]);
	}

	document.getElementsByClassName('image-panel')[0].style.display = 'block';
	document.getElementsByClassName('action-panel')[0].style.display = 'block';
}

$(document).ready(function(){

	var cordinates = [];

	$('#main-img').on('click', function(e){
		var img_left_pos = $(this).offset().left;
		var x_click = e.pageX;
		var left_pos = x_click - img_left_pos; 

		var img_top_pos = $(this).offset().top;
		var y_click = e.pageY;
		var top_pos = y_click - img_top_pos;

		var panel_width = $('.label-panel').width();
		var panel_heigth = $('.label-panel').height();

		var img_width = $('#main-img').width();
		var img_heigth = $('#main-img').height();

		if(((left_pos + panel_width) > img_width) && ((top_pos + panel_heigth) > img_heigth)){
			var lt = (left_pos - panel_width),
				tp = (top_pos - panel_heigth);
			$('.label-panel').css({
				"left": lt,
				"top": tp
			}).show();
		} else if((left_pos + panel_width) > img_width){
			var lt = (left_pos - panel_width);
			$('.label-panel').css({
				"left": lt,
				"top": top_pos
			}).show();
		} else if((top_pos + panel_heigth) > img_heigth){
			var tp = (top_pos - panel_heigth);
			$('.label-panel').css({
				"left": left_pos,
				"top": tp
			}).show();
		} else {
			$('.label-panel').css({
				"left": left_pos,
				"top": top_pos
			}).show();
		}
	});

	// Saving labels
	var saveTag = function(){
		var posx = "";
		var pos_x = $('.label-panel').position().left;
		var pos_y = $('.label-panel').position().top;
		var pos_wd = $('.label-panel').width();
		var pos_ht = $('.label-panel').height();
		var labelName = $('#label').val();

		var elemPos = [];
		elemPos.push({
			x: pos_x,
			y: pos_y,
			wd: pos_wd,
			ht: pos_ht
		});

		cordinates.push({
			elemName: labelName,
			elemPos: elemPos
		});

		console.log(cordinates);

		$('.tag-list').append('<div class="region" style="width:'+ pos_wd +'px;height:'+ pos_ht +'px;left:'+ pos_x +'px;top:'+ pos_y +'px;"><div class="label-title" style="width:'+ pos_wd +'px;height:'+ pos_ht +'px;display:block;"><p>'+ $('#label').val() +'</p></div></div>');
		$('.label-panel').hide();
		$('#label').val("");
	};

	$('#saveList').on('click', saveTag);

	$(document).on('mouseover', '.region', function(){
		$(this).find('.label-title').css({
			'display': 'block',
			'border': '2px solid #CCC'
		});
	});

	$(document).on('mouseout', '.region', function(){
		$(this).find('.label-title').css({
			'display': 'none',
			'border': 'none'
		});
	});

	$('.btn').on('click', function(){
		if($(this).hasClass('hide')){
			$(this).removeClass('hide').text('Show Regions');
			$('.label-title').css({
				'display': 'none',
				'border': 'none'
			});
		} else {
			$(this).addClass('hide').text('Hide Regions');
			$('.label-title').css({
				'display': 'block',
				'border': '2px solid #CCC'
			});
		}

	});
});