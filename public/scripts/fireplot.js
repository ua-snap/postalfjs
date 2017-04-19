//Set Default Values
var region = 'Boreal';
var replicate = '0';
var jsonpath = "/json/alfresco/"
var simfile = "1.00.json";
var obsfile = "Historical.json";
var plot = "AAB";
var maxreps = 200;
var startyear = 1950;
var endyear = 2014;
var ppk = 1;  // Pixels Per Kilometer
$(document).ready( function() {
	$.getJSON( jsonpath + obsfile, function( data ) {
		var $rl = $("#region");
  		$.each( data._default['1']['avg_fire_size'], function( key, val ) {
			$rl.append($("<option></option>").attr("value", key).text(key));
		});
	});
	var $rc = $("#rep");
	for (var i = 0; i < maxreps; i++){
		$rc.append($("<option></option>").attr("value", i).text(i));
	}
	var fl = $("#fileList");
	var ol = $("#obsList");
	var flist = myFiles.split(",");
	for (var i = 0; i < flist.length; i++){
		fl.append($("<option></option>").attr("value", flist[i]).text(flist[i]));
		ol.append($("<option></option>").attr("value", flist[i]).text(flist[i]));
	}
	fl.val(simfile);
	ol.val(obsfile);
	$("#plotfile").val(jsonpath + simfile);
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
	//$("#plotfile").change( function(){
	//	simfile = $(this).val();
	//	drawPlot(plot, region, replicate);
	//});
	$("#fileList").change( function(){
		simfile = $(this).val();
		drawPlot(plot, region, replicate);
		$.getJSON( jsonpath + simfile, function( data ) {
			var $rl = $("#region");
			$rl.text(" ");
			$.each( data._default['1']['avg_fire_size'], function( key, val ) {
				$rl.append($("<option></option>").attr("value", key).text(key));
			});
		});
	});
	$("#obsList").change( function(){
		obsfile = $(this).val();
		drawPlot(plot, region, replicate);
		$.getJSON( jsonpath + obsfile, function( data ) {
			var $rl = $("#region");
			$rl.text(" ");
			$.each( data._default['1']['avg_fire_size'], function( key, val ) {
				$rl.append($("<option></option>").attr("value", key).text(key));
			});
		});
	});
});
function drawPlot(p, reg, rep){
	plot = p;
	if (plot == "CAB"){
		drawCumulativeAreaBurned(reg, rep);
	} else if (plot == "AAB"){
		drawAnnualAreaBurned(reg, rep);
	} else if (plot == "DFN"){
		drawDecadalFireNum(reg, rep);
	} else if (plot == "DFS"){
		drawDecadalFireSize(reg, rep);
	} else if (plot == "VEG"){
		drawVegetation(reg, rep);
	}
}
