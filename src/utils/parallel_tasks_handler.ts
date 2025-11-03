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
 * Parallel task handle tools
 * @param poolLimit max Parallel task numbers
 * @param taskParamsList task prams array
 * @param iteratorFn  task function, to make sure all will be executed, must use `try ... catch ...` to wrap its' inner code block logical
 * @returns all tasks execued results
 */
export async function ParallelTasksPool<T, R>(
  poolLimit: number,
  taskParamsList: T[],
  iteratorFn: (item: T, index: number, array: T[]) => Promise<R>
)
// : Promise<PromiseSettledResult<Awaited<R>>[]> 
// : Promise<Awaited<R>[]>

{
  // collect all of the results promise  
  const result: R[] = [];
  // on going tasks Promise pool.
  const pool: Promise<any>[] = [];
  for (let i = 0; i < taskParamsList.length; i++) {
    // wrap each task with the promise, but as there were below didn't add the reject logical,
    // so when use current functions  need put `try ... catch ...` into iteratorFn functions to make sure there were only resolve was triggered
    const task = Promise.resolve().then(() => iteratorFn(taskParamsList[i], i, taskParamsList));
    result.push(task as unknown as R);

    // when to handle tasks number is over the pool limitations
    if (taskParamsList.length > poolLimit) {
       const task_wrapper: Promise<any> = task.then(() =>{
          //  splice will return the new promised result that has been removed from the pool   
          const new_pool =  pool.splice(pool.indexOf(task_wrapper), 1)
          return new_pool
       });

       // task_wrapper is the new task  that wrappered by the promise logical  
       pool.push(task_wrapper);
       
      // when the pool is full, use the race to stop the push action above
      if (pool.length >= poolLimit) {
          await Promise.race(pool);
      }
    }
  }

    // use Promise.all or the  allSettled to get all executed resulted of the iteratorFn
    const promise_all =  Promise.all(result);  // one iteratorFn failed, all tasks will stopped
    // const promise_all =  Promise.allSettled(result); // one iteratorFn failed, not stop but till all of the task  iteratorFn has been executed
    return promise_all
}


