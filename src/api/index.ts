import { API_LIST } from './urls';
import Requester from './request';



//  requst Demo
const Api = {
  async getTestData(param: TObject | FormData) {
    const result = await Requester.get(API_LIST.GET_TEST, param)
    return result
  }
}

export default Api
