import React from 'react';
import {connect} from 'dva';
import styles from './shopManage.less';
import dateParse from '@/myutils/index';
import {Input,Button,Icon,Table,DatePicker,Select,Modal } from 'antd';
const {RangePicker} = DatePicker;
const { Option } = Select;

class Shop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      form:{
        page:0,
        pageSize:10
      },
      searchData:{
        businesId:'',
      }
    }
  }
  
  //页面将要挂载，获取页面所需的数据
  componentWillMount(){
    this.props.dispatch({
      type:'shopManage/fetchLoadShopManege',
      payload:this.state.form,
    })
  }
  //时间表单改变事件
  onChangeTime = (date, dateString) => {
    let beginTime = (date[0] === undefined?null:date[0]._d.getTime());
    let endTime = (date[1]=== undefined?null:date[1]._d.getTime());
    this.setState({
      searchData:{
        ...this.state.searchData,
        beginTime:beginTime,
        endTime: endTime,
      }
    })
  }
  //改变查询栏的输入框触发的事件
  changeStoreInputData = (attr,e)=>{
    this.setState({
      searchData:{
        ...this.state.searchData,
        [attr]:e.target.value
      }
    })
  }
  //改变查询栏的输入框触发的事件
  changeStoreSelecttData = (attr,value)=>{
    this.setState({
      searchData:{
        ...this.state.searchData,
        [attr]:value
      }
    })
  }
  //点击搜索触发的事件
  search = ()=>{
    this.props.dispatch({
      type:'shopManage/fetchLoadShopManege',
      payload:{
        ...this.state.form,
        ...this.state.searchData
      }
    })
  }
  render(){
    //表格的表头信息
    const columns = [
      {
        title: '商铺ID',
        dataIndex: 'id',
        align:'center',
        fixed: 'left',
        width:80,
      },
      {
        title: '商家ID',
        dataIndex: 'businesId',
        align:'center',
        fixed: 'left',
        width:80,
      },
      {
        title: '商家手机号',
        dataIndex: 'businessVM.telephone',
        align:'center',
        fixed: 'left',
        width:120,
      },
      {
        title: '商铺名称',
        dataIndex: 'name',
        align:'center',
      },
      {
        title: '商铺旺旺ID',
        dataIndex: 'wwid',
        align:'center',
      },
      {
        title: '所属平台',
        dataIndex: 'platform',
        align:'center',
      },
      {
        title: '接单间隔时间',
        dataIndex: 'intervalTime',
        align:'center',
      },
      {
        title: '注册时间',
        dataIndex: 'registerTime',
        align:'center',
        render:(text,record)=>{
          return (
            dateParse(text)
          )
        }
      },
      {
        title: '店铺状态',
        dataIndex: 'status',
        align:'center',
      },
      {
        title: '操作',
        dataIndex: 'actionTime',
        align:'center',
      },
    ];
    return (
      <div className={styles.content}>
        <div className={styles.content_title}>商铺管理</div>
        <div className={styles.content_search}>
          <div className={styles.content_search_time}>
            <RangePicker onChange={this.onChangeTime} />
          </div>
          <div className={styles.content_search_input}>            
            <Select placeholder="所属平台" style={{width: 120 ,margin: 10}} 
            onChange={this.changeStoreSelecttData.bind(this,'platform')} allowClear	 >
              <Option value="天猫">天猫</Option>
            </Select>
            <Input placeholder="商家ID" onChange={this.changeStoreInputData.bind(this,'businesId')} value={this.state.searchData.businesId} />
            <Select placeholder="商铺状态" style={{width: 120 ,margin: 10}}
            onChange={this.changeStoreSelecttData.bind(this,'status')} allowClear >
              <Option value="待审核">待审核</Option>
              <Option value="审核通过">审核通过</Option>
              <Option value="审核未通过">审核未通过</Option>
            </Select>
            <Button type="primary" onClick={this.search}>搜索</Button>
          </div>
        </div>
        <div className={styles.content_table}>
          <Table size="small" bordered scroll={{x:1300}} columns={columns} dataSource={this.props.shopManage.shopManageData} pagination={
            {
              total:this.props.shopManage.total,
              onChange:this.changePage,
              pageSize:10,
            }
          } / >
        </div>
      </div>
    )
  }
}

export default connect(state => state) (Shop);