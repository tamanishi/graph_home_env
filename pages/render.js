var request = window.superagent;

request
  .get('/lastday')
  .end( (err, res) => {
    // console.log(res.text);
    let rawData = JSON.parse(res.text);
    var temperatureData = rawData.map( (e, i, a) => {
      let point = {
        x: new Date(e.timestamp),
        y: Number(e.temperature)
      };
      return point;
    });
    // console.log(JSON.stringify(temperatureData));
    var temperatureChart = new CanvasJS.Chart('temperature', {
      title: {
        text: "temperature"
      },
      axisY: {
        includeZero: false
      },
      data: [{
        type: 'line',
        color: 'blue',
        dataPoints: temperatureData
      }]
    });
    temperatureChart.render();

    var humidityData = rawData.map( (e, i, a) => {
      let point = {
        x: new Date(e.timestamp),
        y: Number(e.humidity)
      };
      return point;
    });
    // console.log(JSON.stringify(humidityData));
    var humidityChart = new CanvasJS.Chart('humidity', {
      title: {
        text: "humidity"
      },
      axisY: {
        includeZero: false
      },
      data: [{
        type: 'line',
        color: 'red',
        dataPoints: humidityData
      }]
    });
    humidityChart.render();

    var pressureData = rawData.map( (e, i, a) => {
      let point = {
        x: new Date(e.timestamp),
        y: Number(e.pressure)
      };
      return point;
    });
    // console.log(JSON.stringify(pressureData));
    var pressureChart = new CanvasJS.Chart('pressure', {
      title: {
        text: "pressure"
      },
      axisY: {
        includeZero: false
      },
      data: [{
        type: 'line',
        color: 'green',
        dataPoints: pressureData
      }]
    });
    pressureChart.render();
  });

