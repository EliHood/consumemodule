const myModule = require('./index');

const url = 'https://jsonplaceholder.typicode.com/posts'
const value = {name:"BARN OWLS", job:'owling'}
const test = myModule.post(url, value);

console.log(test);