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
	$.getJSON( jsonpath + obsfile, function( data ) {
  		$.each( data._default, function( key, val ) {
			dxar.push(data._default[key].fire_year);
			dfnum[0] += addFN("1950", "1959", data, key);
			dfnum[1] += addFN("1960", "1969", data, key);
			dfnum[2] += addFN("1970", "1979", data, key);
			dfnum[3] += addFN("1980", "1989", data, key);
			dfnum[4] += addFN("1990", "1999", data, key);
			dfnum[5] += addFN("2000", "2009", data, key);
			dfnum[6] += addFN("2010", "2019", data, key);
			dtab[0] += addTAB("1950", "1959", data, key);
			dtab[1] += addTAB("1960", "1969", data, key);
			dtab[2] += addTAB("1970", "1979", data, key);
			dtab[3] += addTAB("1980", "1989", data, key);
			dtab[4] += addTAB("1990", "1999", data, key);
			dtab[5] += addTAB("2000", "2009", data, key);
			dtab[6] += addTAB("2010", "2019", data, key);
		});
 	 });
	for (var i = 0; i < dyar.length; i++){
		dyar[i] = dtab[i] / dfnum[i];
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
	var yar = new Array(0,0,0,0,0,0,0);
	var tab = new Array(0,0,0,0,0,0,0);
	var fnum = new Array(0,0,0,0,0,0,0);
	var repcount = [];
	$.getJSON( jsonpath + simfile, function( data ) {
  		$.each( data._default, function( key, val ) {
			repcount[data._default[key].replicate.toString] = 1;
		});
  		$.each( data._default, function( key, val ) {
			if (data._default[key].replicate == replicate){
				xar.push(data._default[key].fire_year);
				fnum[0] += addFN("1950", "1959", data, key);
				fnum[1] += addFN("1960", "1969", data, key);
				fnum[2] += addFN("1970", "1979", data, key);
				fnum[3] += addFN("1980", "1989", data, key);
				fnum[4] += addFN("1990", "1999", data, key);
				fnum[5] += addFN("2000", "2009", data, key);
				fnum[6] += addFN("2010", "2019", data, key);
				tab[0] += addTAB("1950", "1959", data, key);
				tab[1] += addTAB("1960", "1969", data, key);
				tab[2] += addTAB("1970", "1979", data, key);
				tab[3] += addTAB("1980", "1989", data, key);
				tab[4] += addTAB("1990", "1999", data, key);
				tab[5] += addTAB("2000", "2009", data, key);
				tab[6] += addTAB("2010", "2019", data, key);
			}


		});
 	 });
	for (var i = 0; i < yar.length; i++){
		yar[i] = tab[i] / fnum[i];
	}
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
function addFN(csyear, ceyear, data, key, size){
	if (data._default[key].fire_year >= csyear && data._default[key].fire_year <= ceyear){
		return data._default[key].number_of_fires[region];
	} else {
		return 0;
	}
}
function addTAB(csyear, ceyear, data, key){
	if (data._default[key].fire_year >= csyear && data._default[key].fire_year <= ceyear){
		return data._default[key].total_area_burned[region];
	} else {
		return 0;
	}
}
