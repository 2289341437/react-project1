import React from 'react';
import styles from './staff.less';
import router from 'umi/router';
import {connect} from 'dva';
import { Input ,Button, Table, Icon,Select,Pagination} from 'antd';
const { Option } = Select;

class Staff extends React.Component {
 constructor(props){
 		super(props)
 		this.state={
      current:1,
      form:{
        page:0,
        pageSize:6,
      }
 		}
   }
  //页面将要挂载
  componentWillMount(){
     this.props.dispatch({
       type:'staff/fetchLoadStaff',
       payload:this.state.form,
     });
   }
  // handleChange = (value) => {
  //   console.log(`selected ${value}`);
  // }
  //页面改变
  changPage = (page)=>{
    this.props.dispatch({
      type:'staff/fetchLoadStaff',
      payload:{
        page:page-1,
        pageSize:6,
      },
    })
    this.setState({
      current:page,
      form:{
				...this.state.form,
				page:page-1
			}
    })
  }
  //改变员工Id输入框触发的事件
  changeStaffId = (e)=>{
    this.setState({
      form:{
        ...this.state.form,
        id:e.target.value,
      }
    })
  }
  //改变用户名输入框触发的事件
  changeStaffUsername = (e)=>{
    this.setState({
      form:{
        ...this.state.form,
        username:e.target.value,
      }
    })
  }
  //改变手机号输入框触发的事件
  changeStaffTel = (e)=>{
    this.setState({
      form:{
        ...this.state.form,
        telephone:e.target.value,
      }
    })
  }
  //改变状态下拉框触发的事件
  changeStaffStatus = (value)=>{
    this.setState({
      form:{
        ...this.state.form,
        enabled:value,
      }
    })
  }
  //改变所属分站下拉框触发的事件
  changeStaffSiteId = (value)=>{
    this.setState({
      form:{
        ...this.state.form,
        siteId:value,
      }
    })
  }
  //点击搜索触发的事件
  search = ()=>{
    this.props.dispatch({type:'staff/fetchLoadStaff',payload:this.state.form});
  }
  //改变状态触发
  changeStatus = (record)=>{
    if(record.enabled == true){
      this.props.dispatch({
        type:'staff/fetchChangeStatus',
        payload:{
          page:this.state.form,
          forms:{id:record.id,enabled:false}
        },
      })
    }else{
      this.props.dispatch({
        type:'staff/fetchChangeStatus',
        payload:{
          page:this.state.form,
          forms:{id:record.id,enabled:true}
        }
      })
    }
  }
  //跳转到日志页面
  tolog = (record)=>{
    this.props.dispatch({
      type:'staff/changeStaffId',
      payload:record.id
    })
    router.push('/logs');
  }
  render(){
    const columns = [
      {
        title: '员工ID',
        dataIndex: 'id',
        align:'center',
      },
      {
        title: '所属分站',
        dataIndex: 'siteVM.name',
        align:'center',
      },
      {
        title: '用户名',
        dataIndex: 'username',
        align:'center',
      },
      {
        title: '真实姓名',
        dataIndex: 'realname',
        align:'center',
      },
      {
        title: '手机号',
        dataIndex: 'telephone',
        align:'center',
      },
      {
        title: 'QQ号',
        dataIndex: 'qq',
        align:'center',
      },
      {
        title: '上次登入时间',
        dataIndex: 'lastLoginTime',
        align:'center',
      },
      {
        title: '上次登入IP',
        dataIndex: 'lastLoginIp',
        align:'center',
      },
      {
        title: '状态',
        // dataIndex: 'enabled',
        align:'center',
        render(test,record) {
          if(record.enabled == true){
            return (
              <div>正常</div>
            )
          }
          return (
             <div>停用</div>
          );
        }
      },
      {
        title: '操作',
        dataIndex: '',
        align:'center',
        render:(text,record) =>{
          if(record.enabled == true){
            return (
              <div>
                <Icon type="poweroff" title="禁用" style={{color:'red',marginRight: '5px'}} onClick={this.changeStatus.bind(this,record)}/>
                <Icon type="solution" title="查看日志" onClick={this.tolog.bind(this,record)}/>
              </div>
            )
          }
          return(
            <div>
              <Icon type="check-circle" title="启用" style={{color:"green",marginRight:"5px"}} onClick={this.changeStatus.bind(this,record)}/>
              <Icon type="solution" title="查看日志" onClick={this.tolog.bind(this,record)}/>
            </div>
          )
        }
      },
    ];
    const data = [];
    return (
      <div className={styles.content}>
        <div className={styles.content_title}>员工管理</div>
        <div className={styles.content_search}>
          <Input placeholder="员工ID" onChange={this.changeStaffId} value={this.state.form.id}/>
          <Input placeholder="用户名" onChange={this.changeStaffUsername} value={this.state.form.username}/>
          <Input placeholder="手机号" onChange={this.changeStaffTel} value={this.state.form.telephone}/>
          <Select placeholder="状态" allowClear style={{ width: 120 ,margin: 10}} onChange={this.changeStaffStatus} value={this.state.form.enabled}>
            <Option value="1">正常</Option>
            <Option value="0">停用</Option>
          </Select>
          <Select placeholder="所属分站" allowClear style={{ width: 120 ,margin: 10}} onChange={this.changeStaffSiteId} value={this.state.form.siteId}>
            <Option value="1">赚多多</Option>
            <Option value="2">发大财</Option>
            <Option value="123" >123</Option>
          </Select>
          <Button type="primary" onClick={this.search}>
          <Icon type="search" />
          搜索
          </Button>
        </div>
        <div className={styles.content_table}>
          <Table size="small" columns={columns} dataSource={this.props.staff.staffData} pagination={
            {
              total:this.props.staff.total,
              onChange:this.changPage,
              pageSize:6,
            }
          } / >
        </div>
      </div>
    )
  }
}

export default connect(state => state)(Staff);