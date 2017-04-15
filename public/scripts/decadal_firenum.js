function drawDecadalFireNum(r, rep){
	//Plotting function for Annual Area Burned (Sim+Hist)
	var hxar = new Array();
	var hyar = new Array();
	replicate = rep;
	region = r;
	var ptitle = 'Decadal Fire Num: ' + region + ', Rep: ' + replicate;
	var dxar = new Array("1950", "1960", "1970", "1980", "1990", "2000", "2010");
	var dyar = new Array(0,0,0,0,0,0,0);
	var dsar = new Array(0,0,0,0,0,0,0);
	$.ajaxSetup({ async: false, dataType: "json" });
	$.getJSON( obsfile, function( data ) {
  		$.each( data._default, function( key, val ) {
			dxar.push(data._default[key].fire_year);
			dyar[0] += calcFires("1950", "1959", data, key);
			dyar[1] += calcFires("1960", "1969", data, key);
			dyar[2] += calcFires("1970", "1979", data, key);
			dyar[3] += calcFires("1980", "1989", data, key);
			dyar[4] += calcFires("1990", "1999", data, key);
			dyar[5] += calcFires("2000", "2009", data, key);
			dyar[6] += calcFires("2010", "2019", data, key);
			dsar[0] += calcFires("1950", "1959", data, key, "small");
			dsar[1] += calcFires("1960", "1969", data, key, "small");
			dsar[2] += calcFires("1970", "1979", data, key, "small");
			dsar[3] += calcFires("1980", "1989", data, key, "small");
			dsar[4] += calcFires("1990", "1999", data, key, "small");
			dsar[5] += calcFires("2000", "2009", data, key, "small");
			dsar[6] += calcFires("2010", "2019", data, key, "small");
		});
 	 });
	var tracehs = {
		x: dxar,
		y: dsar,
		type: "bar",
		name: "Historical (Small)",
		marker: {
	  		color: 'rgb(235, 180, 180)'
		}
	} 
	var traceh = {
		x: dxar,
		y: dyar,
		type: "bar",
		name: "Historical",
		marker: {
	  		color: 'rgb(235, 60, 60)'
		}
	} 
	var xar = new Array("1950", "1960", "1970", "1980", "1990", "2000", "2010");
	var mar = new Array();
	var sar = new Array(0,0,0,0,0,0,0);
	var yar = new Array(0,0,0,0,0,0,0);
	var tar = new Array();
	var repcount = [];
	$.getJSON( simfile, function( data ) {
  		$.each( data._default, function( key, val ) {
			repcount[data._default[key].replicate.toString] = 1;
		});
  		$.each( data._default, function( key, val ) {
			if (data._default[key].replicate == replicate){
				xar.push(data._default[key].fire_year);
				yar[0] += calcFires("1950", "1959", data, key);
				yar[1] += calcFires("1960", "1969", data, key);
				yar[2] += calcFires("1970", "1979", data, key);
				yar[3] += calcFires("1980", "1989", data, key);
				yar[4] += calcFires("1990", "1999", data, key);
				yar[5] += calcFires("2000", "2009", data, key);
				yar[6] += calcFires("2010", "2019", data, key);
				sar[0] += calcFires("1950", "1959", data, key, "small");
				sar[1] += calcFires("1960", "1969", data, key, "small");
				sar[2] += calcFires("1970", "1979", data, key, "small");
				sar[3] += calcFires("1980", "1989", data, key, "small");
				sar[4] += calcFires("1990", "1999", data, key, "small");
				sar[5] += calcFires("2000", "2009", data, key, "small");
				sar[6] += calcFires("2010", "2019", data, key, "small");
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
	var tracems = {
		x: xar,
		y: sar,
		type: "bar",
		name: "Simulated (Small)",
		marker: {
	  		color: 'rgb(180, 180, 180)'
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


	//var data = [traceh, tracem];
	var data = [traceh,tracem,tracehs,tracems];
	Plotly.newPlot('firePlot', data, layout);
}
function calcFires(csyear, ceyear, data, key, size){
	if (data._default[key].fire_year >= csyear && data._default[key].fire_year <= ceyear){
		var small = 0;
		var large = 0;
		for (var i = 0; i < data._default[key].all_fire_sizes[region].length; i++){
			if (data._default[key].all_fire_sizes[region][i] <= 3){
				small++;
			} else {
				large++;
			}
		}
		if (size == "small"){
			return small;
		} else if (size == "large"){
			return large;
		} else {
			return large;
		}
	} else {
		return 0;
	}
}
