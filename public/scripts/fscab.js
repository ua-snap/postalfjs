function drawDecadalFireSize(r, rep){
	//Plotting function for Average Decadal Fire Size
	replicate = rep;
	region = r;
	var ptitle = 'Decadal Average Fire Size: ' + region + ', Rep: ' + replicate;
	var dxar = new Array("1950", "1960", "1970", "1980", "1990", "2000", "2010");
	var dtab = new Array(0,0,0,0,0,0,0);
	var dfnum = new Array(0,0,0,0,0,0,0);
	var dyar = new Array(0,0,0,0,0,0,0);
	$.ajaxSetup({ async: false, dataType: "json" });
	$.getJSON( obsfile, function( data ) {
  		$.each( data._default, function( key, val ) {
			dxar.push(data._default[key].fire_year);
		});
 	 });
	var traceh = {
		x: dxar,
		y: dyar,
		type: "bar",
		name: "Historical",
		marker: {
	  		color: 'rgb(235, 60, 60)'
		}
	} 
	var xar = new Array();
	var yar = new Array();
	var repcount = [];
	console.log(tab);
	$.getJSON( simfile, function( data ) {
  		$.each( data._default, function( key, val ) {
			repcount[data._default[key].replicate.toString] = 1;
		});
  		$.each( data._default, function( key, val ) {
			if (data._default[key].replicate == replicate){
				xar.push(data._default[key].fire_year);
			}


		});
 	 });
	var tracem = {
		x: xar,
		y: yar,
		type: "bar",
		name: "Simulated",
		marker: {
	  		color: 'rgb(60, 60, 60)'
		}
	} 
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

	var data = [traceh,tracem];
	Plotly.newPlot('firePlot', data, layout);
}
