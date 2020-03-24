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

//Testing async code 

// test('Async test demo', (done) => {
//     setTimeout(() => {
//         expect(1).toBe(2);
//         done();
//     }, 2000);
// });

test('Async async demo', (done) => {
    math.add(2, 3).then((sum) => {
        expect(sum).toBe(5);
        done();
    });
});

test('Async await demo', async () => {
    const sum = await math.add(10,12);
    expect(sum).toBe(22);
});

