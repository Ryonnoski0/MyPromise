import MyPromise from "./MyPromise";
import type { Resolve, Reject } from "./MyPromise";
const promise = new MyPromise((resolve, reject) => {
    resolve("Something went wrong!");
});

const p = MyPromise.resolve({
    then(resolve: Resolve<string>, reject: Reject) {
        resolve("Resolved successfully!");
    },
});
console.log(
    MyPromise.resolve({
        then(resolve: Resolve<string>, reject: Reject) {
            resolve("Resolved successfully!");
        },
    }),
);
