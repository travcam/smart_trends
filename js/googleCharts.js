google.charts.load('current', {'packages':['line']});
google.charts.setOnLoadCallback(setup);

function setup(){

	if (document.contains(document.getElementById("temp_trend_chart"))) {
		drawTempChart();
	}
	else if (document.contains(document.getElementById("tstat_trend_chart"))) {
		drawTstatChart();
	}
	else if (document.contains(document.getElementById("light_trend_chart"))) {
		drawLightChart();
	}	
}

//create trigger to resizeEnd event     
$(window).resize(function() {
	if(this.resizeTO) clearTimeout(this.resizeTO);
	this.resizeTO = setTimeout(function() {
		$(this).trigger('resizeEnd');
	}, 500);
});

//redraw graph when window resize is completed  
$(window).on('resizeEnd', function() {
	setup();
});


function drawTempChart(){

		var configData = config();
		
		var jsonData = $.ajax({
		url: configData['urlAPItemps'],
		type: 'GET',
		headers: {
			"x-parse-application-id": configData['appAPIKey'],
    		"x-parse-rest-api-key": configData['restAPIKey']
		},
		data: {"order":"-createdAt","limit":500},
		success:function(result) {
			
			var data = new google.visualization.DataTable();
			
			var lastVal = [["CT100 Thermostat",],["Garage Door Sensor",],["Main Floor Motion",],["Storage Area Water Leak Sensor",],["Basement Temp/Humidity Sensor",],["Weather",]]

			data.addColumn('date', '');
			data.addColumn('number', "Thermostat");
			data.addColumn('number', "Garage");
			data.addColumn('number', "Kitchen");
			data.addColumn('number', "Storage Room");
			data.addColumn('number', "Basement");
			data.addColumn('number', "Outside");

			var rawData = result['results'];
			for(var i = 0; i < rawData.length; i++) {
				
				switch(rawData[i]['deviceName']) {
					case lastVal[0][0]:
						lastVal[0][1] = parseFloat(rawData[i]['value'], 10);
						var dateObj = new Date(rawData[i]['date']);
						//sub 6 to hours for central time offset
						data.addRow([new Date(new Date(dateObj.getUTCFullYear(),dateObj.getUTCMonth(),dateObj.getUTCDate(),dateObj.getUTCHours() - 6,dateObj.getUTCMinutes())), lastVal[0][1], lastVal[1][1], lastVal[2][1], lastVal[3][1], lastVal[4][1], lastVal[5][1]]);
						break;
					case lastVal[1][0]:
						lastVal[1][1] = parseFloat(rawData[i]['value'], 10);
						var dateObj = new Date(rawData[i]['date']);
						data.addRow([new Date(new Date(dateObj.getUTCFullYear(),dateObj.getUTCMonth(),dateObj.getUTCDate(),dateObj.getUTCHours() - 6,dateObj.getUTCMinutes())), lastVal[0][1], lastVal[1][1], lastVal[2][1], lastVal[3][1], lastVal[4][1], lastVal[5][1]]);
						break;
					case lastVal[2][0]:
						lastVal[2][1] = parseFloat(rawData[i]['value'], 10);
						var dateObj = new Date(rawData[i]['date']);
						data.addRow([new Date(new Date(dateObj.getUTCFullYear(),dateObj.getUTCMonth(),dateObj.getUTCDate(),dateObj.getUTCHours() - 6,dateObj.getUTCMinutes())), lastVal[0][1], lastVal[1][1], lastVal[2][1], lastVal[3][1], lastVal[4][1], lastVal[5][1]]);
						break;					
					case lastVal[3][0]:
						lastVal[3][1] = parseFloat(rawData[i]['value'], 10);
						var dateObj = new Date(rawData[i]['date']);
						data.addRow([new Date(new Date(dateObj.getUTCFullYear(),dateObj.getUTCMonth(),dateObj.getUTCDate(),dateObj.getUTCHours() - 6,dateObj.getUTCMinutes())), lastVal[0][1], lastVal[1][1], lastVal[2][1], lastVal[3][1], lastVal[4][1], lastVal[5][1]]);
						break;					
					case lastVal[4][0]:
						lastVal[4][1] = parseFloat(rawData[i]['value'], 10);
						var dateObj = new Date(rawData[i]['date']);
						data.addRow([new Date(new Date(dateObj.getUTCFullYear(),dateObj.getUTCMonth(),dateObj.getUTCDate(),dateObj.getUTCHours() - 6,dateObj.getUTCMinutes())), lastVal[0][1], lastVal[1][1], lastVal[2][1], lastVal[3][1], lastVal[4][1], lastVal[5][1]]);
						break;					
					case lastVal[5][0]:
						lastVal[5][1] = parseFloat(rawData[i]['value'], 10);
						var dateObj = new Date(rawData[i]['date']);
						data.addRow([new Date(new Date(dateObj.getUTCFullYear(),dateObj.getUTCMonth(),dateObj.getUTCDate(),dateObj.getUTCHours() - 6,dateObj.getUTCMinutes())), lastVal[0][1], lastVal[1][1], lastVal[2][1], lastVal[3][1], lastVal[4][1], lastVal[5][1]]);
						break;									
					}
			}
			
			var options = {
				chart: {
					title: 'Temperature Trends',
					subtitle: 'in degrees F',
					interpolateNulls:true,
					curveType: 'function',
				},
				series: {
            				0: { color: '#2ECC71' },
            				1: { color: '#34495E' },
            				2: { color: '#E74C3C' },
            				3: { color: '#95A5A6' },
            				4: { color: '#3498DB' },
            				5: { color: '#9B59B6' },
          			},
				height: 500, 
				};
			
			var chart = new google.charts.Line(document.getElementById('temp_trend_chart'));
			chart.draw(data, google.charts.Line.convertOptions(options));

		},
		error:function(exception){alert('Exception:'+exception);}
	})

}


function drawTstatChart(){
		
		var configData = config();
		
		var jsonData = $.ajax({
		url: configData['urlAPItstats'],
		type: 'GET',
		headers: {
			"x-parse-application-id": configData['appAPIKey'],
    		"x-parse-rest-api-key": configData['restAPIKey']
		},
		data: {"order":"-createdAt","limit":500},
		success:function(result) {
			
			var data = new google.visualization.DataTable();
			
			var lastVal = [["thermostatOperatingState",""],["thermostatFanState",""],["thermostatSetpoint",],["heatingSetpoint",],["coolingSetpoint",]]

			data.addColumn('date', '');
			data.addColumn('string', "Operating State");
			data.addColumn('string', "Fan Operating State");
			data.addColumn('number', "Set Point");
			data.addColumn('number', "Heating Set Point");
			data.addColumn('number', "Cooling Set Point");

			var rawData = result['results'];
			for(var i = 0; i < rawData.length; i++) {
				
				switch(rawData[i]['name']) {
					case lastVal[0][0]:
						lastVal[0][1] = rawData[i]['value'];
						var dateObj = new Date(rawData[i]['date']);
						//sub 6 to hours for central time offset
						data.addRow([new Date(new Date(dateObj.getUTCFullYear(),dateObj.getUTCMonth(),dateObj.getUTCDate(),dateObj.getUTCHours() - 6,dateObj.getUTCMinutes())), lastVal[0][1], lastVal[1][1], lastVal[2][1], lastVal[3][1], lastVal[4][1]]);
						break;
					case lastVal[1][0]:
						lastVal[1][1] = rawData[i]['value'];
						var dateObj = new Date(rawData[i]['date']);
						data.addRow([new Date(new Date(dateObj.getUTCFullYear(),dateObj.getUTCMonth(),dateObj.getUTCDate(),dateObj.getUTCHours() - 6,dateObj.getUTCMinutes())), lastVal[0][1], lastVal[1][1], lastVal[2][1], lastVal[3][1], lastVal[4][1]]);
						break;
					case lastVal[2][0]:
						lastVal[2][1] = parseFloat(rawData[i]['value'], 10);
						var dateObj = new Date(rawData[i]['date']);
						data.addRow([new Date(new Date(dateObj.getUTCFullYear(),dateObj.getUTCMonth(),dateObj.getUTCDate(),dateObj.getUTCHours() - 6,dateObj.getUTCMinutes())), lastVal[0][1], lastVal[1][1], lastVal[2][1], lastVal[3][1], lastVal[4][1]]);
						break;					
					case lastVal[3][0]:
						lastVal[3][1] = parseFloat(rawData[i]['value'], 10);
						var dateObj = new Date(rawData[i]['date']);
						data.addRow([new Date(new Date(dateObj.getUTCFullYear(),dateObj.getUTCMonth(),dateObj.getUTCDate(),dateObj.getUTCHours() - 6,dateObj.getUTCMinutes())), lastVal[0][1], lastVal[1][1], lastVal[2][1], lastVal[3][1], lastVal[4][1]]);
						break;					
					case lastVal[4][0]:
						lastVal[4][1] = parseFloat(rawData[i]['value'], 10);
						var dateObj = new Date(rawData[i]['date']);
						data.addRow([new Date(new Date(dateObj.getUTCFullYear(),dateObj.getUTCMonth(),dateObj.getUTCDate(),dateObj.getUTCHours() - 6,dateObj.getUTCMinutes())), lastVal[0][1], lastVal[1][1], lastVal[2][1], lastVal[3][1], lastVal[4][1]]);
						break;													
					}
			}
			
			var options = {
				chart: {
					title: 'Thermostat',
					subtitle: 'Operating states and set points',
					interpolateNulls:true,
					curveType: 'function',
				},
				series: {
            				0: { color: '#2ECC71' },
            				1: { color: '#34495E' },
            				2: { color: '#E74C3C' },
            				3: { color: '#95A5A6' },
            				4: { color: '#3498DB' },
            				5: { color: '#9B59B6' },
          			},
				height: 500, 
				};
			
			var chart = new google.charts.Line(document.getElementById('tstat_trend_chart'));
			chart.draw(data, google.charts.Line.convertOptions(options));

		},
		error:function(exception){alert('Exception:'+exception);}
	})

}


function drawLightChart(){

		var configData = config();
		
		var jsonData = $.ajax({
		url: configData['urlAPIlights'],
		type: 'GET',
		headers: {
			"x-parse-application-id": configData['appAPIKey'],
    		"x-parse-rest-api-key": configData['restAPIKey']
		},
		data: {"order":"-createdAt","limit":500},
		success:function(result) {
			
			var data = new google.visualization.DataTable();
			
			var lastVal = ["Kitchen Lights",]

			data.addColumn('date', '');
			data.addColumn('number', "Kitchen Lights");

			var rawData = result['results'];
			for(var i = 0; i < rawData.length; i++) {
				
				switch(rawData[i]['deviceName']) {
					case lastVal[0]:
						lastVal[1] = parseFloat(rawData[i]['value'], 10);
						var dateObj = new Date(rawData[i]['date']);
						//sub 6 to hours for central time offset
						data.addRow([new Date(new Date(dateObj.getUTCFullYear(),dateObj.getUTCMonth(),dateObj.getUTCDate(),dateObj.getUTCHours() - 6,dateObj.getUTCMinutes())), lastVal[1]]);//, lastVal[1][1], lastVal[2][1], lastVal[3][1], lastVal[4][1], lastVal[5][1]]);
						break;
//					case lastVal[1][0]:
// 						lastVal[1][1] = parseFloat(rawData[i]['value'], 10);
// 						var dateObj = new Date(rawData[i]['date']);
// 						data.addRow([new Date(new Date(dateObj.getUTCFullYear(),dateObj.getUTCMonth(),dateObj.getUTCDate(),dateObj.getUTCHours() - 6,dateObj.getUTCMinutes())), lastVal[0][1], lastVal[1][1], lastVal[2][1], lastVal[3][1], lastVal[4][1], lastVal[5][1]]);
// 						break;
// 					case lastVal[2][0]:
// 						lastVal[2][1] = parseFloat(rawData[i]['value'], 10);
// 						var dateObj = new Date(rawData[i]['date']);
// 						data.addRow([new Date(new Date(dateObj.getUTCFullYear(),dateObj.getUTCMonth(),dateObj.getUTCDate(),dateObj.getUTCHours() - 6,dateObj.getUTCMinutes())), lastVal[0][1], lastVal[1][1], lastVal[2][1], lastVal[3][1], lastVal[4][1], lastVal[5][1]]);
// 						break;													
					}
			}
			
			var options = {
				chart: {
					title: 'Light Set Point',
					subtitle: 'in % output',
					interpolateNulls:true,
					curveType: 'function',
				},
				series: {
            				0: { color: '#2ECC71' },
            				1: { color: '#34495E' },
            				2: { color: '#E74C3C' },
            				3: { color: '#95A5A6' },
            				4: { color: '#3498DB' },
            				5: { color: '#9B59B6' },
          			},
				height: 500, 
				};
			
			var chart = new google.charts.Line(document.getElementById('light_trend_chart'));
			chart.draw(data, google.charts.Line.convertOptions(options));

		},
		error:function(exception){alert('Exception:'+exception);}
	})

}
