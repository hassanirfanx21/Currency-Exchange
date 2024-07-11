// Assuming you have imported countryList correctly
import { countryList } from "./flag.js";

// Get an array of keys from the countryList object
const valuesArray = Object.values(countryList);
valuesArray.sort();

// Select the FROM elements
let selectElement = document.querySelectorAll(".selections"); // Contains both selects as an array

// Loop through each select element and populate with options
selectElement.forEach((SELECT) => {
  valuesArray.forEach((flagcode) => {
    let Option = document.createElement("option");
    Option.classList.add("optionFlag");
    Option.innerText = flagcode;
    Option.value = flagcode;
    SELECT.appendChild(Option);
  });
});

//image left
let imageLeft = document.getElementById("flagLeft");
let fromvalue, tovalue; // We get values as selected

selectElement[0].addEventListener("change", function (event) {
  fromvalue = event.target.value; // Assign to outer scope variables
  imageLeft.src = `https://flagsapi.com/${fromvalue}/flat/64.png`;
});

// image right
let imageright = document.getElementById("flagRight");
selectElement[1].addEventListener("change", function (event) {
  tovalue = event.target.value; // Assign to outer scope variables
  imageright.src = `https://flagsapi.com/${tovalue}/flat/64.png`;
});

// textField
let text = document.querySelector("#enter");
let amount = document.querySelector("#amount");

let button = document.querySelector("#myButton");
button.addEventListener("click", async () => {
  // Event listener after button clicked
  // Call getKeyByValue here to ensure fromvalue and tovalue are updated
  getKeyByValue(countryList, fromvalue, tovalue);
  let response = await fetch(
    `https://api.forexrateapi.com/v1/latest?api_key=632149d200964ab417c26abb4fe5c4dd&base=${fromCurrency}&currencies=${toCurrency}`
  );
  const data = await response.json();
  const exchangeRate = data.rates[toCurrency];
  console.log(exchangeRate);
  let entered_amount = text.value;
  let integerAmount = +entered_amount;
  amount.innerText = exchangeRate * integerAmount;
});

// getting values for currency code
let fromCurrency, toCurrency;

function getKeyByValue(countryList, fromvalue, tovalue) {
  for (let key in countryList) {
    if (countryList[key] === fromvalue) {
      fromCurrency = key;
    }
    if (countryList[key] === tovalue) {
      toCurrency = key;
    }
    if (fromCurrency !== undefined && toCurrency !== undefined) {
      return; // Early return if both are assigned
    }
  }
  return; // Return if the value is not found
}
