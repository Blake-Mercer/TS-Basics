const promiseAll = (promises) => {
    const outputArray = []
    let promisCounter = 0
    return new Promise((resolve, reject) => {
        promises.forEach((promise, i) => {
            promise.then((value) => {
                outputArray[i] = value
                promisCounter++
                if (promisCounter === promises.length) {
                    resolve(outputArray)
                }
            }).catch(reject)
        })
    })
}

const promises = [
    Promise.resolve(4),
    Promise.resolve(4),
    Promise.resolve('bro'),
]

// console.log(promises.length)
console.log(promiseAll(promises).then(console.log).catch(console.log))