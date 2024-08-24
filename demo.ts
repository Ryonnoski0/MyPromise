import MyPromise from "./MyPromise";
const promise = new Promise((resolve, reject) => {
    resolve("Something went wrong!");
});

promise
    .then((result: any) => {
        console.log("Then:", result);
    })
    .catch((error: any) => {
        console.error("Catch:", error);
    })
    .finally(() => {
        console.log("Finally: Promise completed.", promise);
        throw new Error("error");
    });
