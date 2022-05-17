const request = require("request");
const forecast = (latitude, longitude, callback) => {
  const weather_url = `http://api.weatherstack.com/current?access_key=1d7a7b85c09aef7334df40d7ac3d9d93&query=${latitude},${longitude}&units=f`;
  console.log(weather_url);
  request({ url: weather_url, json: true }, (err, res) => {
    if (err)
      throw new Error("Low level error happened, here are the details", err);
    else if (res.body.error)
      throw new Error("Unable to find provided location");
    const data = res.body;
    const current = data.current;
    let unit;
    if (data.request.unit === "m") {
      unit = "celcius";
    } else if (data.request.unit === "f") unit = "fahrenheit";
    else unit = "kelvin";
    console.log(data.current);
    callback(
      undefined,
      `The weather is ${data.current["weather_descriptions"]}. It feels like ${current["feelslike"]}. Actually it is ${current["temperature"]} `
    );
  });
};
module.exports = { forecast };
