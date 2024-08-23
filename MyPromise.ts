import { initMicroTaskScheduler, isPromise } from "./tools";
const PENDING = "pending";
const RESOLVE = "fulfilled";
const REJECT = "rejected";
type Resolve<T> = (value: T) => void;
type Reject = (reason: any) => void;
type State = typeof PENDING | typeof RESOLVE | typeof REJECT;
type Executor<T> = (resolve: Resolve<T>, reject: Reject) => void;
type Value<T> = T | any;
interface FunctionObject<T> {
    state: State;
    fn?: Function;
    resolve: Resolve<T>;
    reject: Reject;
}

class MyPromise<T = any> {
    /**
     * Promise状态
     */
    private _state: State = PENDING;

    /**
     * Promise返回值
     */
    private _value: Value<T>;

    /**
     * 把callback放入微任务队列
     */
    private _runMicroTask: (callback: Function) => void;

    /**
     * 函数队列
     */
    private _functionQueue: FunctionObject<T>[] = [];

    /**
     * 执行函数队列的函数
     */
    private _runQueue() {
        if (this._state === PENDING) return;
        while (this._functionQueue[0]) {
            this._runFn(this._functionQueue[0]);
            this._functionQueue.shift();
        }
    }
    /**
     * 在微队列执行一个函数
     * @param {FunctionObject<T>} obj
     */
    private _runFn(obj: FunctionObject<T>) {
        this._runMicroTask(() => {
            if (obj.state !== this._state) return;
            if (typeof obj.fn !== "function") {
                // 使状态穿透
                obj.state === RESOLVE ? obj.resolve(this._value) : obj.reject(this._value);
                return;
            }
            try {
                const res = obj.fn(this._value);
                if (isPromise(res)) {
                    res.then(obj.resolve, obj.reject);
                } else {
                    obj.resolve(res);
                }
            } catch (e) {
                obj.reject(e);
            }
        });
    }

    /**
     *  改变状态
     * @param {state} state 状态
     * @param {value} value 返回值
     */
    private _changeState(state: State, value: Value<T>) {
        if (this._state !== PENDING) return;
        this._state = state;
        this._value = value;
        this._runQueue();
    }

    /**
     * 添加方法到队列
     */
    private _pushFunctionQueue(onFulfilled: any, onRejected: any, resolve: Resolve<T>, reject: Reject): void {
        const promiseHandlers = {
            resolve,
            reject,
        };
        this._functionQueue.push(
            {
                state: RESOLVE,
                fn: onFulfilled,
                ...promiseHandlers,
            },
            {
                state: REJECT,
                fn: onRejected,
                ...promiseHandlers,
            },
        );
    }

    /**
     * 创建一个Promise
     * @param {Executor<T>} executor - 执行函数，它接收两个参数：resolve 和 reject
     */
    constructor(executor: Executor<T>) {
        // 缓存微任务调度器
        this._runMicroTask = initMicroTaskScheduler();
        try {
            executor(this._resolve.bind(this), this._reject.bind(this));
        } catch (error) {
            this._reject(error);
        }
    }

    /**
     * 标记任务完成
     * @param {any} data 任务完成的相关数据
     */
    protected _resolve(data?: T): void {
        this._changeState(RESOLVE, data);
    }

    /**
     * 标记任务失败
     * @param {any} reason - 失败的理由
     */
    protected _reject(reason?: any): void {
        this._changeState(REJECT, reason);
    }

    /**
     * 任务完成回调
     */
    public then(onFulfilled?: any, onRejected?: any): MyPromise<any> {
        return new MyPromise((resolve, reject) => {
            this._pushFunctionQueue(onFulfilled, onRejected, resolve, reject);
            this._runQueue();
        });
    }
}

export default MyPromise;
export { Resolve, Reject, State, Executor, Value };