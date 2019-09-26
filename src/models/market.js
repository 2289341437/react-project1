import {queryMarket,saveOrUpdateMarket,findUserDetailsById} from '@/services/market';
const MarketModel = {
  namespace: 'market',
  state: {
    marketData:[],
    total:0,
  },
  effects: {
    *fetchLoadMarket(_, { call, put }) {
      const response = yield call(queryMarket,_.payload);
      yield put({
        type: 'changeStateData',
        payload: response,
      });
    },
    *fetchSaveOrUpdateMarket(_, { call, put }) {
      const response = yield call(saveOrUpdateMarket,_.payload.form);
      yield put({
        type: 'fetchLoadMarket',
        payload: _.payload.page,
      });
    },     
  },
  reducers: {
    changeStateData(state, action) {
      console.log('修改了market里面的数据');
      console.log(action.payload.data.list);
      return { 
        ...state,
        marketData:action.payload.data.list,
        total:action.payload.data.total,
      };
    },
  },
};
export default MarketModel;
