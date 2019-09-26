import React from 'react';
import {connect} from 'dva';
import styles from './logs.less';
import dateParse from '@/myutils/index'
import {Input,Button,Icon,Table,DatePicker } from 'antd';
const {RangePicker} = DatePicker;
class Logs extends React.Component {
 constructor(props) {
   super(props);
   this.state = {
     table:{
       page:0,
       pageSize:10,
       userId:this.props.staff.staffId,
     },
     
   }
 }
 //组件将要挂载,获取表格里面的数据
 componentWillMount (){
   this.props.dispatch({
     type:"logs/fetchLoadLogs",
     payload:{
       ...this.state.table,
     }
   })
 }
 //组件将要卸载,主要执行的的操作是置空staff仓库数据里面的staffId，让下一次打开的时候查找数据是不会带上上次的staffI数据
 componentWillUnmount(){
   this.props.dispatch({
     type:'staff/changeStaffId',
   })
 }
 //点击跳转页面，获取当前页数对应的表格数据
 changePage = (page,pageSize)=>{
  this.props.dispatch({
    type:'logs/fetchLoadLogs',
    payload:{
      ...this.state.table,
      page:page-1,
    },
  })
  this.setState({
    current:page,
    table:{
      ...this.state.table,
      page:page-1
    }
  })
 }
 //操作人ID输入框改变事件，改变本地state里面的userId
 changeUserId = (event)=>{
  this.setState({
    table:{
      ...this.state.table,
      userId:event.target.value
    }
  })
 }
 //时间表单改变事件
 onChangeTime = (date, dateString) => {
  // console.log(date[0]._d.getTime()) //获得开始的时间戳
  // console.log(date[1]._d.getTime())
  let beginTime = (date[0] === undefined?null:date[0]._d.getTime());
  let endTime = (date[1]=== undefined?null:date[1]._d.getTime());
  this.setState({
    table:{
      ...this.state.table,
      beginTime:beginTime,
      endTime: endTime,
    }
  })
}
 //点击查找触发的事件,去查询输入框里的日志内容
 search = ()=>{
  this.props.dispatch({
    type:'logs/fetchLoadLogs',
    payload:this.state.table
  })
 }

  render(){
    //表格的表头信息
    const columns = [
      {
        title: '日志ID',
        dataIndex: 'id',
        align:'center',
      },
      {
        title: '操作者ID',
        dataIndex: 'userId',
        align:'center',
      },
      {
        title: '内容',
        dataIndex: 'actionContent',
        align:'center',
      },
      {
        title: '操作时间',
        dataIndex: 'actionTime',
        align:'center',
        render:(text,record)=>{
          return (
            dateParse(text)
          )
        }
      },
    ];
    return (
      <div className={styles.content}>
        <div className={styles.content_title}>日志中心</div>
        <div className={styles.content_search}>
          <div className={styles.content_search_time}>
            <RangePicker onChange={this.onChangeTime}/>
          </div>
          <Input placeholder="操作人ID" onChange={this.changeUserId} value={this.state.table.userId} style={{margin:'10px',width:'150px'}}/>
          <Button type="primary" onClick={this.search}>
          <Icon type="search" />
          搜索
          </Button>
        </div>
        <div className={styles.content_table}>
          <Table size="small" columns={columns} dataSource={this.props.logs.logsData} pagination={
            {
              total:this.props.logs.total,
              onChange:this.changePage,
              pageSize:10,
            }
          } / >
        </div>
      </div>
    )
  }
}

export default connect(state => state) (Logs);
