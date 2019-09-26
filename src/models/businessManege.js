import {queryBusinessManege} from '@/services/businessManege';
const BusinessManegeModel = {
  namespace: 'businessManege',
  state: {
    businessManegeData:[],
    total:0,
  },
  effects: {
    *fetchLoadBusinessManege(_, { call, put }) {
      const response = yield call(queryBusinessManege,_.payload);
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
        businessManegeData:action.payload.data.list,
        total:action.payload.data.total,
      };
    },
  },
};
export default BusinessManegeModel;
