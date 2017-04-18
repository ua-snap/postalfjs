function drawCumulativeAreaBurned(r, rep){
	//Plotting function for Annual Area Burned (Sim+Hist)
	var hxar = new Array();
	var hyar = new Array();
	var htar = new Array();
	var hdar = new Object();

	replicate = rep;
	region = r;
	var ptitle = 'Cumulative Area Burned: ' + region + ', Rep: ' + replicate;

	$.ajaxSetup({ async: false, dataType: "json" });
	$.getJSON( obsfile, function( data ) {
  		$.each( data._default, function( key, val ) {
			if (data._default[key].fire_year >= startyear){
				hdar["'" + data._default[key].fire_year + "'"] = data._default[key].total_area_burned[region];
			}

		});
 	 });
	var hrt = 0;
	for (var i = startyear; i <= endyear; i++){
		hxar.push(i);
		hrt += hdar["'" + i + "'"];
		hyar.push(hrt);
	}
	var traceh = {
		x: hxar,
		y: hyar,
		type: "line",
		name: "Historical",
		marker: {
	  		color: 'rgb(235, 60, 60)'
		}
	} 
	var tar = new Array();
	var dar = {};
	for (i = 0; i < maxreps; i++){
		dar["'" + i + "'"] = {};
	}
	var repcount = [];
	$.getJSON( simfile, function( data ) {
  		$.each( data._default, function( key, val ) {
			repcount[data._default[key].replicate.toString] = 1;
		});
  		$.each( data._default, function( key, val ) {
			if (data._default[key].fire_year >= startyear){
				dar["'" + data._default[key].replicate + "'"]["'" + data._default[key].fire_year + "'"] = data._default[key].total_area_burned[region];
			}
		});
 	 });

	var data = new Array();
	for (var i = 0; i < maxreps; i++){
		var xar = new Array();
		var yar = new Array();
		var rt = 0;
		$.each(dar["'" + i + "'"], function(key, val){
			xar.push(key);
			rt += val;
			yar.push(rt);
		}); 
		var tcolor = 'rgb(200,200,200)';
		if(i == replicate){ 
			var tracef = {
                                x: xar,
                                y: yar,
                                type: "line", 
                                name: "Rep" + i,
                                marker: {
                                        color: 'rgb(60,60,60)'
				}
                        }
		} else {
			var tracet = {
				x: xar,
				y: yar,
				type: "line",
				name: "Rep" + i,
				marker: {
					color: tcolor
				}
			}
			data.push(tracet);
		} 
	}
	data.push(traceh);
	data.push(tracef);
	var layout = {
	  title: ptitle,
	  jsonlegend: true,
	  height: 700,
	  width: 1000,
	  hovermode: 'closest',
	  autotick: true,
          yaxis: {
	  	range: [0, 300000]
	  },
	  xaxis: {
		range: [startyear, endyear]
	  }
	};
	Plotly.newPlot('firePlot', data, layout);
}

