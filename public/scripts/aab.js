function drawAnnualAreaBurned(r, rep){
	//Plotting function for Annual Area Burned (Sim+Hist)
	var hxar = new Array();
	var hyar = new Array();
	var htar = new Array();
	replicate = rep;
	region = r;
	var ptitle = 'Annual Area Burned: ' + region + ', Rep: ' + replicate;

	$.ajaxSetup({ async: false, dataType: "json" });
	$.getJSON( jsonpath + obsfile, function( data ) {
  		$.each( data._default, function( key, val ) {
			hyar.push(data._default[key].total_area_burned[region]);
			hxar.push(data._default[key].fire_year);
		});
 	 });
	var traceh = {
		x: hxar,
		y: hyar,
		type: "bar",
		name: "Historical",
		marker: {
	  		color: 'rgb(235, 60, 60)'
		}
	} 
	var xar = new Array();
	var yar = new Array();
	var tar = new Array();
	var repcount = [];
	$.getJSON( jsonpath + simfile, function( data ) {
  		$.each( data._default, function( key, val ) {
			repcount[data._default[key].replicate.toString] = 1;
		});
  		$.each( data._default, function( key, val ) {
			if (data._default[key].replicate == replicate){
				yar.push(data._default[key].total_area_burned[region]);
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


	var data = [traceh, tracem];
	Plotly.newPlot('firePlot', data, layout);
}
