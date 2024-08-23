/**
 * 是否在浏览器环境
 */
function isBrowser() {
    try {
        return typeof window !== "undefined" && typeof window.document !== "undefined";
    } catch {
        return false;
    }
}
/**
 * 是否在node环境
 */
function isNode() {
    try {
        return typeof process !== "undefined" && process.versions != null && process.versions.node != null;
    } catch {
        return false;
    }
}
/**
 * 初始化微任务运行环境
 */
function initMicroTaskScheduler() {
    if (isBrowser()) {
        return (callback: Function) => {
            const tempDom = document.createElement("div");
            const observer = new MutationObserver(callback as MutationCallback);
            observer.observe(tempDom, { childList: true });
            tempDom.innerHTML = "temp";
        };
    } else if (isNode()) {
        return process.nextTick;
    } else {
        return (callback: Function) => setTimeout(callback, 0);
    }
}
/**
 * 判断是不是Promise
 * @param obj
 * @returns
 */
function isPromise(obj: any) {
    return !!(obj && typeof obj === "object" && typeof obj.then === "function");
}
export { isBrowser, isNode, initMicroTaskScheduler, isPromise };
