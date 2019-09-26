import { queryStaff,changeStatus } from '@/services/staff';
const StaffModel = {
  namespace: 'staff',
  state: {
    staffData:[],
    total:0,
    staffId:null,
  },
  effects: {
    *fetchLoadStaff(_, { call, put }) {
      const response = yield call(queryStaff,_.payload);
      yield put({
        type: 'changeStateData',
        payload: response,
      });
    },
    *fetchChangeStatus(_, { call, put }) {
      const response = yield call(changeStatus,_.payload.forms);
      yield put({
        type: 'fetchLoadStaff',
        payload: _.payload.page,
      });
    },
  },
  
  reducers: {
    changeStateData(state, action) {
      return { 
        ...state,
        staffData:action.payload.data.list,
        total:action.payload.data.total,
      };
    },
    changeStaffId(state, action){
      return{
        ...state,
        staffId:action.payload
      }
    }
  },
};
export default StaffModel;
