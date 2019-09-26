import {queryShopManege} from '@/services/shopManage';
const ShopManegeModel = {
  namespace: 'shopManage',
  state: {
    shopManageData:[],
    total:0,
  },
  effects: {
    *fetchLoadShopManege(_, { call, put }) {
      const response = yield call(queryShopManege,_.payload);
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
        shopManageData:action.payload.data.list,
        total:action.payload.data.total,
      };
    },
  },
};
export default ShopManegeModel;
