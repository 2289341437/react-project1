import {findUserDetailsById} from '@/services/marketDetail';
const MarketDetailModel = {
  namespace: 'marketDetail',
  state: {
    marketDetailData:{},
  },
  effects: {
    *fetchFindUserDetailsById(_, { call, put }) {
      console.log(1111);
      const response = yield call(findUserDetailsById,_.payload);
      yield put({
        type: 'changeStateData',
        payload: response,
      });
    },  
  },
  reducers: {
    changeStateData(state, action) {
      console.log(action.payload.data)
      return { 
        ...state,
        marketDetailData:action.payload.data,
      };
    },
  },
};
export default MarketDetailModel;
