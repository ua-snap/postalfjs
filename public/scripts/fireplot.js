//Set Default Values
var region = 'Boreal';
var replicate = '0';
var simfile = "/json/alfresco/ALF_CCSM4_rcp85.json";
var obsfile = "/json/alfresco/Observed.json";
var plot = "AAB";
var maxreps = 200;
var startyear = 1950;
var endyear = 2012;
$(document).ready( function() {
	$.getJSON( obsfile, function( data ) {
		var $rl = $("#region");
  		$.each( data._default['1']['avg_fire_size'], function( key, val ) {
			$rl.append($("<option></option>").attr("value", key).text(key));
		});
	});
	var $rc = $("#rep");
	for (var i = 0; i < maxreps; i++){
		$rc.append($("<option></option>").attr("value", i).text(i));
	}
	var $tc = $("#fileList");
	for (var i = 0; i < myFiles.length; i++){
		$tc.append($("<option></option>").attr("value", myFiles[i]).text(myFiles[i]));
	}
	$("#plotfile").val(simfile);
	drawPlot(plot, region, replicate);
	$("#region").on("change", function(){
		drawPlot(plot, $( this ).find("option:selected").text(), replicate);
	});
	$("#rep").on("change", function(){
		drawPlot(plot, region, $( this ).find("option:selected").text());
	});
	$("#plotStyle").change( function(){
		drawPlot($(this).find('option:selected').val(), region, replicate);
	});
	$("#plotfile").change( function(){
		simfile = $(this).val();
		console.log(simfile);
		drawPlot(plot, region, replicate);
	});
});
function drawPlot(p, reg, rep){
	plot = p;
	if (plot == "CAB"){
		drawCumulativeAreaBurned(reg, rep);

	} else if (plot == "AAB"){
		drawAnnualAreaBurned(reg, rep);
	}
}
