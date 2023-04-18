const currencyOne = document.getElementById('currencyOne');
const amountOne = document.getElementById('amountOne');
const currencyTwo = document.getElementById('currencyTwo');
const amountTwo = document.getElementById('amountTwo');
const rate = document.getElementById('rate');
const swap = document.getElementById('swap');

//Fetch exchange rate and update DOM
function calculate(){
    const currOne = currencyOne.value;
    const currTwo = currencyTwo.value;
    if(amountOne.value < 0){
        amountOne.value = 0;
    }
    fetch("https://open.exchangerate-api.com/v6/latest")
    .then(res => res.json())
    .then(data => {
      //  console.log(data);
      const val = data.rates[currTwo] / data.rates[currOne];
      rate.innerText = `1 ${currOne} = ${val} ${currTwo}`;
      amountTwo.value = (amountOne.value * (val)).toFixed(2);
    });
}

//Event Listeners

currencyOne.addEventListener('change', calculate);
amountOne.addEventListener('input', calculate);
currencyTwo.addEventListener('change', calculate);
amountTwo.addEventListener('input', calculate);

swap.addEventListener('click', () =>{
    const temp = currencyOne.value;
    currencyOne.value = currencyTwo.value;
    currencyTwo.value = temp;
    calculate();
});
calculate();