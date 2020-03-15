//USAGE OF CALLBACK FUNCTION - EXECUTES WHEN CODE FINISHES SO TO NOT RETURN INDEFINED
setTimeout(() => {
    console.log("Two seconds passed");
}, 2000);

const names = ['Ted','Kostas'];
const shortNames = names.filter((name) => {
    return name.length <= 4;
});

const geocode = (address, callback) => {
    setTimeout(() => {
        const data = {
            latitude : 0,
            longitude : 0
        }

        callback(data);
    }, 2000);
}

geocode('Philadelphia', (data)=> {
    console.log(data);
});

//2nd example 
const add = (a,b,callback) => {
    setTimeout(() => {
        const res = a + b; 
        callback(res);
    }, 2000);
}

add(1,4,(sum) => {
    console.log(sum); 
})