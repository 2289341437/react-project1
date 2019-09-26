import {findBusinessDetailsById} from '@/services/businessManegeDetail';
const MarketDetailModel = {
  namespace: 'businessManegeDetail',
  state: {
    businessManegeDetailData:{},
  },
  effects: {
    *fetchFindBusinessDetailsById(_, { call, put }) {
      console.log(1111);
      const response = yield call(findBusinessDetailsById,_.payload);
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
        businessManegeDetailData:action.payload.data,
      };
    },
  },
};
export default MarketDetailModel;
