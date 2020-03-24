//Temp file to test jest testing 
const calculateTip = (total, tipPercent = 0.2) => {
    const tip = total * tipPercent;
    return total + tip;
};

const celsiusToFahrenheit = (temp) => {
    return (temp * 1.8) + 32;
}

module.exports = {
    calculateTip,
    celsiusToFahrenheit
};