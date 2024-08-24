import MyPromise from "./MyPromise";
const p1 = new Promise((resolve) => {
    setTimeout(() => {
        resolve("Promise 1 resolved");
    }, 1000);
});

const p2 = new Promise((resolve) => {
    setTimeout(() => {
        resolve("Promise 2 resolved");
    }, 500);
});

const p3 = new Promise((resolve) => {
    setTimeout(() => {
        resolve("Promise 3 resolved");
    }, 1500);
});

MyPromise.resolve(0)
    .then(
        (results) => {
            console.log("All promises resolved:");
            console.log(results); // 输出: ['Promise 1 resolved', 'Promise 2 resolved', 'Promise 3 resolved']
            return 1;
        },
        (reject) => {
            return reject;
        },
    )
    .catch((error) => {
        console.error("One of the promises failed:", error);
        return "Error";
    })
    .then((results) => {
        console.log("results", results);
    });
