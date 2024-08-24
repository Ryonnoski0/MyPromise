import MyPromise from "./MyPromise";
const p1 = new MyPromise((resolve, reject) => {
    setTimeout(() => {
        resolve("MyPromise 1 resolved");
    }, 1000);
});

const p2 = new MyPromise((resolve) => {
    setTimeout(() => {
        resolve("MyPromise 2 resolved");
    }, 500);
});

const p3 = new MyPromise((resolve) => {
    setTimeout(() => {
        resolve("MyPromise 3 resolved");
    }, 1500);
});

MyPromise.all([p1, p2, p3])
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
