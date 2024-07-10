import { Axios } from '../plugins/axios.ts'

export default {
  getAppEnv: () => {
    return Axios.get('/env/detail')
  }
}
