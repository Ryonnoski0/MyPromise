import MyPromise from "./MyPromise";

// 示例 1: 基本的 `resolve` 测试
const promise1 = new MyPromise((resolve, reject) => {
    setTimeout(() => {
        resolve("Success after 1 second!");
    }, 1000);
});

promise1
    .then((result: any) => {
        console.log(result); // Expected output: "Success after 1 second!"
        return "Next success step";
    })
    .then((result: any) => {
        console.log(result); // Expected output: "Next success step"
    })

    .catch((error: any) => {
        console.error("This should not be called", error);
    });

// 示例 2: 基本的 `reject` 测试
const promise2 = new MyPromise((resolve, reject) => {
    setTimeout(() => {
        reject("Error after 1 second!");
    }, 1000);
});

promise2
    .then((result: any) => {
        console.log("This should not be called", result);
    })
    .catch((error: any) => {
        console.error(error); // Expected output: "Error after 1 second!"
        return "Recovered from error";
    })
    .then((result: any) => {
        console.log(result); // Expected output: "Recovered from error"
    });

// 示例 3: 链式调用中的错误捕获
const promise3 = new MyPromise((resolve, reject) => {
    resolve("Initial success");
});

promise3
    .then((result: any) => {
        console.log(result); // Expected output: "Initial success"
        throw new Error("Something went wrong in then");
    })
    .catch((error: any) => {
        console.error(error.message); // Expected output: "Something went wrong in then"
        return "Recovered from chained error";
    })
    .then((result: any) => {
        console.log(result); // Expected output: "Recovered from chained error"
    });
