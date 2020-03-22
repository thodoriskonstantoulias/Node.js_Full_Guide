//Example function returning a Promise
const add = (a,b) => {
    return new Promise((reject,resolve) => {
        setTimeout(() => {
            resolve(a + b);
        }, 2000);
    }) 
};

//How to use async await
const doWork = async () => {
    return await add(1, 99);
}

doWork().then((result) => {
    console.log(result);
}).catch((e) => {
    console.log(e);
});