const request = require("request");
const forecast = (error, { latitude, longitude, location }) => {
  const weather_url = `http://api.weatherstack.com/current?access_key=1d7a7b85c09aef7334df40d7ac3d9d93&query=${latitude},${longitude}&units=f`;
  if (error) console.log(error);
  request({ url: weather_url, json: true }, (err, res) => {
    if (err)
      throw new Error("Low level error happened, here are the details", err);
    else if (res.body.error)
      throw new Error("Unable to find provided location");
    const data = res.body;
    console.log(data.current);
    const current = data.current;
    let unit;
    if (data.request.unit === "m") {
      unit = "celcius";
    } else if (data.request.unit === "f") unit = "fahrenheit";
    else unit = "kelvin";
    console.log("Location is ", location);
    console.log(
      `It is ${current["weather_descriptions"]} and currently ${current.temperature} ${unit}. It feels like ${current["feelslike"]}. The rain probability is ${current.precip} `
    );
  });
};
module.exports = { forecast };
