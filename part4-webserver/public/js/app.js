const inputField = document.getElementById("location_data");
const buttonSubmit = document.getElementById("send_data");
const myForm = document.querySelector("form");
myForm.addEventListener("submit", (e) => {
  e.preventDefault();
  fetch(
    "http://api.weatherstack.com/current?query=" +
      inputField.value +
      "&access_key=1d7a7b85c09aef7334df40d7ac3d9d93&units=f"
  )
    .then((response) => response.json())
    .then((data) => {
      if (data.success === false)
        throw new Error("Unable to find logit cation");
      console.log(data);
    })
    .catch((err) => console.log(err));
});
