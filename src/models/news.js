import {queryNews,deleteNews,saveOrUpdateNews,changeStatus} from '@/services/news';
const NewsModel = {
  namespace: 'news',
  state: {
    newsData:[],
    total:0,
  },
  effects: {
    *fetchLoadNews(_, { call, put }) {
      const response = yield call(queryNews,_.payload);
      yield put({
        type: 'changeStateData',
        payload: response,
      });
    },  
    *fetchDeleteNews(_, { call, put }) {
      const response = yield call(deleteNews,_.payload.form);
      yield put({
        type: 'fetchLoadNews',
        payload:_.payload.page,
      });
    }, 
    *fetchSaveOrUpdateNews(_, { call, put }) {
      const response = yield call(saveOrUpdateNews,_.payload.form);
      yield put({
        type: 'fetchLoadNews',
        payload:_.payload.page,
      });
    },
    *fetchChangeStatus(_, { call, put }) {
      const response = yield call(changeStatus,_.payload.form);
      yield put({
        type: 'fetchLoadNews',
        payload:_.payload.page,
      });
    },  
  },
  reducers: {
    changeStateData(state, action) {
      console.log('修改了news里面的数据');
      console.log(action.payload.data.list);
      return { 
        ...state,
        newsData:action.payload.data.list,
        total:action.payload.data.total,
      };
    },
  },
};
export default NewsModel;
