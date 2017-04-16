var vegtype = "Deciduous";
function drawVegetation(r, rep){
	$("#plotSpecificControls").html("<select id='vegtype'></select>");
	var pSC = $("#vegtype");
	var vegarr = new Array("NoVeg", "Deciduous", "Black Spruce", "White Spruce", "Graminoid Tundra", "Shrub Tundra", "Wetland Tundra", "Barren lichen-moss", "Temperate Rainforest");
	for (var i = 0; i < vegarr.length; i++){
		pSC.append($("<option></option>").attr("value", vegarr[i]).text(vegarr[i]));
	}
	pSC.val(vegtype);
	pSC.change( function(){
		alert("X");
		vegtype = $( this ).find("option:selected").text();
		drawPlot(plot, region, replicate, vegtype);
	});
	
	//Plotting function for Annual Area Burned (Sim+Hist)
	var hxar = new Array();
	var hyar = new Array();
	var htar = new Array();
	var hdar = new Object();

	replicate = rep;
	region = r;
	var ptitle = 'Vegetation: ' + region + ', Rep: ' + replicate;

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
			if (data._default[key].av_year >= startyear){
				dar["'" + data._default[key].replicate + "'"]["'" + data._default[key].av_year + "'"] = data._default[key].veg_counts[region][vegtype];
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
			yar.push(val);
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
	data.push(tracef);
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

