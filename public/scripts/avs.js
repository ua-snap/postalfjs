function drawAreaVSize(r, rep){
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
	var deca = {};
	deca['1950'] = 0;
	deca['1960'] = 0;
	deca['1970'] = 0;
	deca['1980'] = 0;
	deca['1990'] = 0;
	deca['2000'] = 0;
	deca['2010'] = 0;
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
		var tracet = {
			x: xar,
			y: yar,
			type: "bar",
			name: "Decadal Average",
			marker: {
				color: tcolor
			}
		}
		data.push(tracet);
	}
	data.push(traceh);
	var layout = {
	  title: ptitle,
	  jsonlegend: true,
	  height: 700,
	  width: 1000,
	  hovermode: 'closest',
	  autotick: true,
	  xaxis: {
		range: [startyear, endyear]
	  }
	};


	Plotly.newPlot('firePlot', data, layout);
}
