// Bio-Monitor: Keeping an eye on astronauts' vital signs
// http://www.asc-csa.gc.ca/eng/sciences/bio-monitor.asp
var csv = require('fast-csv');

exports.predict = function (input1, input2) {
//	return "Running";

	var csv = require('fast-csv');

	var Average_read = [];


	
	csv.fromPath('./public/csv/Average_sensor_reading.csv').on('data', function(data)
	{
		//console.log(data);
		//console.log(data.length);
		Average_read.push(data);
		//console.log(Average_read[0].length);

		var BioSpy_prediction_model = [];
		csv.fromPath('./public/csv/BioSpy_prediction_model.csv').on('data', function(data)
		{
			BioSpy_prediction_model.push(data);

			var new_params = rep(99999,30); //= get(new_params)
			var param_comparison;
			//console.log(data);
			//console.log(Average_read[0].length);
			//console.log(new_params);
			/*for (var i =0; i < Average_read[0].length; i++)
			{

				console.log(Average_read[i]);

				if(new_params[i]>Average_read[i])
				{
						param_comparison = 1;
				}
				else 
				{
						param_comparison=0;
				}

				for (var j =0; j<BioSpy_prediction_model[0].length;j++)
				{
									BioSpy_prediction_model[i][j] = BioSpy_prediction_model[i][j] * param_comparison;

				}


			}
			var predicted_prob = [];
			for (var c =0; c < ncol(BioSpy_prediction_model); c++)
			{
				predicted_prob[c] = sum(BioSpy_prediction_model[1][c]);
				console.log(predicted_prob[c]);
			} */

			

		}); 
	});
};

function rep(value, len) {
  var arr = [];
  for (var i = 0; i < len; i++) {
    arr.push(value);
  }
  return arr;
}

function ncol(two_dim_array) {
	return two_dim_array[0].length;
}

function sum(one_dim_array) {
	return one_dim_array.reduce(add, 0);
}






