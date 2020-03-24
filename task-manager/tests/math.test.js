//Test with jest 
const math = require('../src/math');

test('Calculate total with tip', () => {
    const total = math.calculateTip(10, 0.3);

    expect(total).toBe(13);
});

test('Calculate total with tip default value', () => {
    const total = math.calculateTip(10);

    expect(total).toBe(12);
});

test('Convert celsius to Fahrenheit', () => {
    const fahr = math.celsiusToFahrenheit(10);

    expect(fahr).toBe(50);
});

