	loadCont();

	function loadCont() {
		var bar;
		var ctx;
		var xmA1 = [200, 170, 180, 170, 190];
		var labl1 = ['ITEM1', 'ITEM2', 'ITEM3', 'ITEM4', 'ITEM5'];
		var xmA2 = [100, 170, 140, 120, 120];
		var labl2 = ['ITEM6', 'ITEM7', 'ITEM8', ITEM9', 'ITEM10'];
		var xmAA = [xmA1, xmA2];
		var lablA = [labl1, labl2]
		var xA1 = new Array();
		for (var j in xmA1) {
			xA1[j] = 10;
		}
		var xA2 = new Array();
		for (var k in xmA2) {
			xA2[k] = 10;
		}
		var xAA = [xA1, xA2];
		var xmNum1 = xmA1.length;
		var xmNum2 = xmA2.length;
		var xmNumA = [xmNum1, xmNum2];
		$('body').append('<div id="barWrap" style="display: block; opacity: 1;"><canvas id="bar1" height="160" width="280" style="display: none;"></canvas><canvas id="bar2" height="110" width="280" style="display: none; float: right;"></canvas></div>');
		var canvasAlp = setInterval(function() {
			if ($('#canvasPosi').is(':visible')) {
				clearInterval(canvasAlp);
				var canvasPosi = $('#canvasPosi').offset();
				$('#barWrap').css({'top': canvasPosi.top + 'px', 'left': canvasPosi.left + 'px'});
				barStt(1);
			}
		}, 1);
		function barStt(num) {
			var num = num;
			var xmA = new Array;
			var xA = new Array;
			var xmNum = new Array;
			var labl = new Array;
			xmA = xmAA[num - 1];
			xA = xAA[num - 1];
			xmNum = xmNumA[num - 1];
			labl = lablA[num - 1];
			bar = $('#bar' +  num).get(0);
			ctx = bar.getContext('2d');
			$('#bar' + num).css({'border': '1px dotted #900'});
			$('#bar' + num).fadeTo(400, 1, function() {
				var drawIntv = setInterval(	function() {
					ctx.clearRect(0,0,400,200);
					//ctx.save();
					ctx.beginPath();
					for (var i = 0; i < xmA.length; i++) {
						if (xA[i] < xmA[i]) {
							if (i == 0) {
								xA[0] = xA[0] + 2;
							}
							if (i > 0 && (xA[i - 1] / xmA[i - 1]) >= 0.3) {
								xA[i] = xA[i] + 2;
							}
						}
						ctx.fillStyle = 'rgb(255, 255, 255)';
						ctx.fillText(labl[i], 10, (16 * i + 16));
						ctx.fillRect(70, (i * 16 + 8), xA[i], 6);
						ctx.fill();
						if (xA[(xmNum - 1)] == xmA[(xmNum - 1)]) {
							clearInterval(drawIntv);
							ctx.restore();
							if ((num - 1) == 0) {
								xmA = [];
								xA = [];
								barStt(2);
							}
						}
					}
					//ctx.restore();
				}, 2);
			});
		}
		$(window).bind('resize load', function() {
			if ($('#canvasPosi').offset()) {
				var canvasPosi = $('#canvasPosi').offset();
				$('#barWrap').css({'top': canvasPosi.top  + 'px', 'left': canvasPosi.left + 'px'});
			}
		});
	}
	