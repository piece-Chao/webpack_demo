//index.js
import './index.less';

class Animal {
    constructor(name) {
        this.name = name;
    }
    getName() {
        return this.name;
    }
}

const dog = new Animal('dog');
console.log(dog.getName());

document.getElementById('btn').onclick = function() {
    import('./handle').then(fn => fn.default())
}

fetch('/api/user').then((res) => {
    return res.json()
}).then((data) => {
    console.log(data)
}).catch((err) => {
    console.log(err)
})
