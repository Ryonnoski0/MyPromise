import MyPromise from "./MyPromise";
const myPromise = new MyPromise((resolve, reject) => {
    resolve("p1 success");
});
const p2 = myPromise.then((data: any) => {
    console.log(data);
    return new MyPromise((resolve, reject) => {
        reject("p3 rejected");
    });
});
setTimeout(() => {
    console.log(p2);
});
