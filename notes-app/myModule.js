console.log('Testing our own modules');

const name = 'Ted';
const add = function(a,b){
    return a + b;
}
//Everything we need from outside we need to export it
//module.exports = name;
module.exports = add;