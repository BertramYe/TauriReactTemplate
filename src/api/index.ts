import { API_LIST } from './urls';
import Requester from './request';

interface GetTableData {
 test_data:string
}


const Api = {
  async getTestData(param: GetTableData) {
    const result = await Requester.get(API_LIST.GET_TEST, param)

    return result
  }
}

export default Api
