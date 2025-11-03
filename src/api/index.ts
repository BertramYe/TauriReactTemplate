import { API_LIST } from './urls';
import Requester from './request';
import { UserProfileSchema} from './schemas';
import { ParallelTasksPool as _ } from '@/src/utils/parallel_tasks_handler';
import {type TState} from '@/src/hooks'

// requst Demo
const Api = {
  async getLeads(_pre:TState,params:TObject | FormData) {
    const result = await Requester.post(API_LIST.GET_USER, params,true,UserProfileSchema)
    return result
  },

}

export default Api




