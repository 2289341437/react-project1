import {queryLogs} from '@/services/logs';
const LogsModel = {
  namespace: 'logs',
  state: {
    logsData:[],
    total:0,
    logsId:0,
  },
  effects: {
    *fetchLoadLogs(_, { call, put }) {
      const response = yield call(queryLogs,_.payload);
      yield put({
        type: 'changeStateData',
        payload: response,
      });
    },  
   
  },
  
  reducers: {
    changeStateData(state, action) {
      return { 
        ...state,
        logsData:action.payload.data.list,
        total:action.payload.data.total,
      };
    },
  },
};
export default LogsModel;
