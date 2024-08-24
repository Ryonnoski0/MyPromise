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

const p3 = new MyPromise((resolve, reject) => {
    setTimeout(() => {
        reject("MyPromise 3 reject");
    }, 1500);
});

MyPromise.any([p1, p2, p3])
    .then(
        (results) => {
            console.log("All MyPromises resolved:");
            console.log(results);
            return 1;
        },
        (reject) => {
            console.log("全败了:", reject);
            return reject;
        },
    )
    .catch((error) => {
        console.error("One of the MyPromises failed:", error);
        return "Error";
    });
