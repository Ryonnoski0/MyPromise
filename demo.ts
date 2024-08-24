import MyPromise from "./MyPromise";

const p = MyPromise.reject(1);
console.log(p);
p.catch((err: any) => console.log("catch:" + err));
