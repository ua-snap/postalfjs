function drawHistAnnualAreaBurned(r){
	//Plotting function for Historical Annual Area Burned
	var xar = new Array();
	var yar = new Array();
	var tar = new Array();
	region = r;
	var ptitle = 'Historical Annual Area Burned: ' + region;

	$.ajaxSetup({ async: false, dataType: "json" });
	$.getJSON( jsonpath + obsfile, function( data ) {
  		$.each( data._default, function( key, val ) {
			yar.push(data._default[key].total_area_burned[region]);
			xar.push(data._default[key].fire_year);
		});
 	 });
	var traceh = {
		x: xar,
		y: yar,
		type: "bar",
		name: "Historical",
		marker: {
	  		color: 'rgb(235, 60, 60)'
		}
	} 

	var layout = {
	  title: ptitle,
	  showlegend: true,
	  height: 700,
	  width: 1000,
	  hovermode: 'closest',
	  autotick: true,
	  xaxis: {
		range: [startyear, endyear]
	  }
	};


	var data = [traceh];
	Plotly.newPlot('firePlot', data, layout);
}
