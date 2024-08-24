import MyPromise from "./MyPromise";
const p1 = new MyPromise((resolve, reject) => {
    setTimeout(() => {
        reject("MyPromise 1 reject");
    }, 1000);
});

const p2 = new MyPromise((resolve, reject) => {
    setTimeout(() => {
        reject("MyPromise 2 reject");
    }, 500);
});

const p3 = new MyPromise((resolve) => {
    setTimeout(() => {
        resolve("MyPromise 3 resolved");
    }, 1500);
});

MyPromise.race([p1, p2, p3])
    .then(
        (results) => {
            console.log("All MyPromises resolved:");
            console.log(results);
            return 1;
        },
        (reject) => {
            return reject;
        },
    )
    .catch((error) => {
        console.error("One of the MyPromises failed:", error);
        return "Error";
    })
    .then((results) => {
        console.log("results", results);
    });
