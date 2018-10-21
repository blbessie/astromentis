// Bio-Monitor: Keeping an eye on astronauts' vital signs
// http://www.asc-csa.gc.ca/eng/sciences/bio-monitor.asp


//exports.predict = function (input1, input2) {
//	return "Running";
//};
alert("hi");
var csv = require('fast-csv');

var Average_read = 0;
csv.fromPath('/public/csv/Average_sensor_reading.csv').on('data', function(data)
{
	Average_read = data;
})

var BioSpy_prediction_model = 0;
csv.fromPath('/public/csv/BioSpy_prediction_model.csv').on('data', function(data)
{
	BioSpy_prediction_model = data;
})

var new_params = [rep(99999,30)]; //= get(new_params)
var param_comparison;
for (i in Average_read)
{
	if(new_params[i]>Average_read[i])
	{
			param_comparison = 1;
	}
	else 
	{
			param_comparison=0;
	}

	BioSpy_prediction_model[i][1] = BioSpy_prediction_model[i][1] * param_comparison;


}
var predicted_prob = [];
for (c in ncol(BioSpy_prediction_model))
{
	predicted_prob[c] = sum(BioSpy_prediction_model[1][c]);
}

alert(predicted_prob);





