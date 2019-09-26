import React from 'react';
import router from 'umi/router';
import dateParse from '@/myutils/index';
import styles from './BusinessManege.less';
import {connect} from 'dva';
import {Input,Button,Icon,Table,DatePicker,Select } from 'antd';
const {RangePicker} = DatePicker;
const { Option } = Select;

class BusinessManege extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchData:{},
      form:{
        page:0,
        pageSize:10,
      }
    }
  }
  //页面将要挂载，获取页面数据
  componentWillMount(){
    this.props.dispatch({
      type:'businessManege/fetchLoadBusinessManege',
      payload:this.state.form,
    })
  }
  //改变查询栏的输入框触发的事件
  changeBusinessInputData = (attr,e)=>{
    this.setState({
      searchData:{
        ...this.state.searchData,
        [attr]:e.target.value
      }
    })
  }
  //改变查询栏的输入框触发的事件
  changeBusinessSelecttData = (attr,value)=>{
    this.setState({
      searchData:{
        ...this.state.searchData,
        [attr]:value
      }
    })
  }
 //改变排序选择框触发的事件
 changeBusinessOrder = (value)=>{
   if(value === undefined){
     value = [null,null];
   }
  this.setState({
    searchData:{
      ...this.state.searchData,
      orderField:value[0],
      orderType:value[1],
    }
  })
 }
 //点击搜索触发的事件
 search = ()=>{
  this.props.dispatch({
    type:'businessManege/fetchLoadBusinessManege',
    payload:{
      ...this.state.form,
      ...this.state.searchData
    }
  })
 }
 //点击商家ID，展示商家详情
 toDetails = (record)=>{
   //使用j5的localStorage来传递给MarketDetail页面传递参数
   let storage = window.localStorage;
   storage.setItem("businessManegeId", record.id);
   router.push('/businessManege/businessManegeDetail');
 }
  render(){
    //表格的表头信息
    const columns = [
      {
        title: '商家ID',
        dataIndex: 'id',
        key: 'id',
        fixed: 'left',
        width:80,
        align:'center',
        render:(text,record)=> <a onClick={this.toDetails.bind(this,record)}>{text}</a>
      },
      {
        title: '手机号',
        dataIndex: 'telephone',
        key: 'telephone',
        width:120,
        align:'center',
      },
      {
        title: 'QQ',
        dataIndex: 'qq',
        key: 'qq',
        width:120,
        align:'center',
      },
      {
        title: '本金余额',
        dataIndex: 'accountBj',
        key: 'accountBj',
        align:'center',
      },
      {
        title: '佣金余额',
        dataIndex: 'accountYj',
        key: 'accountYj',
        align:'center',
      },
      {
        title: '累积充值',
        dataIndex: 'recharge',
        key: 'recharge',
        align:'center',
      },
      {
        title: '邀请ID',
        dataIndex: 'agentId',
        key: 'agentId',
        align:'center',
      },
      {
        title: '注册时间',
        dataIndex: 'registerTime',
        key: 'registerTime',
        align:'center',
        render:(text,record)=>{
          return (
            dateParse(text)
          )
        }
      },
      {
        title: '用户等级',
        dataIndex: 'rank',
        key: 'rank',
        align:'center',
      },
      {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        align:'center',
        render:(text,record)=>{
          if(text === 'true'){
            return (<span style={{color:'green'}}>正常</span>)
          }
          return (<span style={{color:'red'}}>禁用</span>)
        }
      },
      {
        title: '备注',
        dataIndex: 'comment',
        key: 'comment',
        align:'center',
      },
      {
        title: '操作',
        key: 'action',
        align:'center',
        fixed: 'right',
        width: 100,
      },
    ];
    return (
      <div className={styles.content}>
        <div className={styles.content_title}>商户管理</div>
        <div className={styles.content_search}>  
          <div className={styles.content_search_time}>
            <RangePicker onChange={this.onChangeTime} style={{width: 200 ,margin: 5}}/>
          </div>
          <div className={styles.content_search_input}>
            <Input placeholder="商家ID"  onChange={this.changeBusinessInputData.bind(this,'id')} />
            <Input placeholder="手机号" onChange={this.changeBusinessInputData.bind(this,'telephone')} />
            <Input placeholder="推广员ID" onChange={this.changeBusinessInputData.bind(this,'agentId')} />
            <Select placeholder="用户等级" allowClear style={{width: 105 ,margin: 5}} onChange={this.changeBusinessSelecttData.bind(this,'rank')}>
              <Option value="新手上路">新手上路</Option>
              <Option value="普通用户">普通用户</Option>
              <Option value="高级用户">高级用户</Option>
            </Select>
            <Select placeholder="状态" allowClear style={{width: 80 ,margin: 5}}  onChange={this.changeBusinessSelecttData.bind(this,'status')}>
              <Option value="true">正常</Option>
              <Option value="false">停用</Option>
            </Select>
            <Select placeholder="排序规则" allowClear style={{width: 120 ,margin: 5}} onChange={this.changeBusinessOrder}>
              <Option value={['registerTime','asc']}>时间升序</Option>
              <Option value={['registerTime','desc']}>时间降序</Option>
              <Option value={['accountBj','asc']}>本金余额升序</Option>
              <Option value={['accountBj','desc']}>本金余额降序</Option>
              <Option value={['recharge','asc']}>累积充值升序</Option>
              <Option value={['recharge','desc']}>累积充值降序</Option>
            </Select>
            <Button type="primary" onClick={this.search}>搜索</Button>
          </div>
        </div>
        <div className={styles.content_table}>
          <Table size="small" bordered scroll={{ x: 1300 }} columns={columns} dataSource={this.props.businessManege.businessManegeData} pagination={
            {
              total:this.props.businessManege.total,
              onChange:this.changePage,
              pageSize:10,
            }
          }  />
        </div>
      </div>
    )
  }
}

export default connect(state => state) (BusinessManege);