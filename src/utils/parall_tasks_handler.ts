



// type TaskFn<R> = () => Promise<R>;
// type Task<R> = { fn: TaskFn<R>; priority: number };
// /**
//  * 并发池工具
//  * @param poolLimit 最大并发数
//  * @param array 任务数组
//  * @param iteratorFn 任务函数，参数为每个任务的值
//  * @returns 所有任务的结果
//  */
// export async function asyncPriorityRatePool<R>(
//   tasks: Task<R>[],
//   poolLimit: number,
//   rateLimit: number // 每秒最大请求数
// ): Promise<R[]> {
//   const results: R[] = [];
//   const executing: Promise<void>[] = [];
//   let running = 0;
//   let idx = 0;
//   let lastTick = Date.now();
//   let rateCount = 0;

//   // 简单优先队列：优先级从大到小排序
//   tasks.sort((a, b) => b.priority - a.priority);

//   async function runTask(task: Task<R>): Promise<void> {
//     running++;
//     try {
//       const res = await task.fn();
//       results.push(res);
//     } catch (err) {
//       results.push(err as R); // 可以自定义错误收集方式
//     }
//     running--;
//   }

//   return new Promise<R[]>(resolve => {
//     function next() {
//       while (
//         running < poolLimit &&
//         idx < tasks.length &&
//         rateCount < rateLimit
//       ) {
//         // 限速控制
//         const now = Date.now();
//         if (now - lastTick >= 1000) {
//           rateCount = 0;
//           lastTick = now;
//         }
//         rateCount++;

//         // 取优先级最高任务
//         const task = tasks[idx++];
//         const p = runTask(task).then(() => next());
//         executing.push(p);
//       }
//       if (idx >= tasks.length && running === 0) {
//         Promise.all(executing).then(() => resolve(results));
//       }
//     }
//     next();
//   });
// }

// // 用法举例
// export async function Testest() {
//   const sleep = (ms:number) => new Promise(res=>setTimeout(res, ms));
//   const tasks = [
//     { fn: () => sleep(1000).then(()=> 'A'), priority: 1 },
//     { fn: () => sleep(500).then(()=> 'B'), priority: 3 },
//     { fn: () => sleep(700).then(()=> 'C'), priority: 2 },
//     // 更多任务...
//   ];
//   const res = await asyncPriorityRatePool(tasks, 2, 2); // 最大并发2，每秒最多2次
//   console.log(res); // ['B', 'C', 'A'] —— 优先级高的先完成
// }




/**
 * 并发池工具
 * @param poolLimit 最大并发数
 * @param array 任务数组
 * @param iteratorFn 任务函数，参数为每个任务的值，为了整个请求的稳定性，一定要 将 try ... catch ... 放进 iteratorFn 函数里面
 * @returns 所有任务的结果
 */
export async function asyncPool<T, R>(
  poolLimit: number,
  array: T[],
  iteratorFn: (item: T, index: number, array: T[]) => Promise<R>
)
// : Promise<PromiseSettledResult<Awaited<R>>[]> 
// : Promise<Awaited<R>[]>

{
  // 收集所有任务结果的 promise  
  const result: R[] = [];
  // 当前正在执行的任务 Promise（资源池）。
  const pool: Promise<any>[] = [];
  for (let i = 0; i < array.length; i++) {
    // 对每个任务都生成一个 Promise，并加入 result。
    // 下面没加 reject 逻辑是因为，我们需要将 try ... catch ... 放进 iteratorFn 函数逻辑， 来保证 iteratorFn 的执行是顺利的
    const task = Promise.resolve().then(() => iteratorFn(array[i], i, array));
    result.push(task as unknown as R);

    // 当任务量超过资源池限制
    if (array.length > poolLimit) {
       const task_wrapper: Promise<any> = task.then(() =>{
          // 返回的是 pool 被剔除的 promise 的新的 promise 结果    
          const new_pool =  pool.splice(pool.indexOf(task_wrapper), 1)
          return new_pool
       });

       // 注意这里的 pool 里面装的是 task 被包裹一层新的 promise 的  新的 promise 对象 task_wrapper   
       pool.push(task_wrapper);
       
        // 任务池满就阻塞
        if (pool.length >= poolLimit) {
            await Promise.race(pool);
        }
    }
  }


    // 如果没超过，其中 result 正好是需要执行的 promise 的队列，直接利用  Promise.all 拿到其结果就行   
    const promise_all =  Promise.all(result);  // 一个失败，整个停止
    // const promise_all =  Promise.allSettled(result); // 一个失败不停止，直到整个全部执行完
    return promise_all
}


