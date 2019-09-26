import React from 'react';
import router from 'umi/router';
import {connect} from 'dva';
import styles from './market.less';
import dateParse from '@/myutils/index';
import MarketForm from './Form';
import {Input,Button,Icon,Table,DatePicker,Select,Modal } from 'antd';
const {RangePicker} = DatePicker;
const { Option } = Select;

class Market extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchData:{},
      form:{
        page:0,
        pageSize:10,
        siteId:2
      },
      modalTitle:'新增推广员信息',
      formItem:{},
    }
  }
  //页面将要挂载,获取表单数据
  componentWillMount(){
    this.props.dispatch({
      type:'market/fetchLoadMarket',
      payload:this.state.form,
    })
  }
  //分页，跳转页面
  changePage = (page)=>{
    this.props.dispatch({
      type:'market/fetchLoadMarket',
      payload:{
        ...this.state.form,
        page:page-1,
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
  toDetails=(record)=>{
    //使用j5的localStorage来传递给MarketDetail页面传递参数
    let storage = window.localStorage;
    storage.setItem("marketId", record.id);
    router.push('/market/marketDetail');
  }
  //搜索的输入框改变触发的事件
  changeInputData = (attr,e)=>{
    this.setState({
      searchData:{
        ...this.state.searchData,
        [attr]:e.target.value
      }
    })
  }
  //点击搜索，触发搜索事件
  search = ()=>{
    this.props.dispatch({
      type:'market/fetchLoadMarket',
      payload:{
        ...this.state.form,
        ...this.state.searchData
      }
    })
   }
  //模态框相关
  showModal = () => {
    this.setState({
      visible: true,
    });
  };
  //点击模态框确定触发的事件
  handleOk = e => {
    e.preventDefault();
    //提交表单marketForm里面的数据
    this.marketForm.validateFields((err, values) => {
      if (!err) {
        values.roleId= 3;
        this.props.dispatch({
          type:'market/fetchSaveOrUpdateMarket',
          payload:{
            page:this.state.form,
            form:values
          }
        })
      }
    });
    this.setState({
      visible: false,
    });
  };
  //点击模态框取消触发的事件
  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };
  toAdd = ()=>{
    this.showModal()
  }
  //点击编辑按钮
  toEdit = (record)=>{
    this.setState({
      modalTitle:'修改推广员信息',
      formItem:{
        ...record,
        roleId:3,
      },
    });
    this.showModal();
  }
  //获取表单子组件里面的数据，通过一个回调函数
  getForm = (form)=>{
    this.marketForm = form;
  }
  render(){
    //表格的表头信息
    const columns = [
      {
        title: '推广员ID',
        dataIndex: 'id',
        key: 'id',
        fixed: 'left',
        width:100,
        align:'center',
        render:(text,record)=> <a onClick={this.toDetails.bind(this,record)}>{text}</a>
      },
      {
        title: '用户名',
        dataIndex: 'username',
        key: 'username',
        align:'center',
        width:100,
      },
      {
        title: '手机号',
        dataIndex: 'telephone',
        key: 'telephone',
        align:'center',
        width:150,
      },
      {
        title: 'QQ',
        dataIndex: 'qq',
        key: 'qq',
        align:'center',
        width:150,
      },
      {
        title: '微信',
        dataIndex: 'wxid',
        key: 'wxid',
        align:'center',
        width:150,
      },
      {
        title: '推广商家数',
        dataIndex: 'allBusinesNum',
        key: 'allBusinesNum',
        align:'center',
        width:150,
      },
      {
        title: '账户余额',
        dataIndex: 'totalDeposits',
        key: 'totalDeposits',
        align:'center',
        width:150,
      },
      {
        title: '订单成分比例',
        dataIndex: 'ratio',
        key: 'ratio',
        align:'center',
        width:150,
      },
      {
        title: '上次登入时间',
        dataIndex: 'lastLoginTime',
        key: 'lastLoginTime',
        align:'center',
        width:200,
        render:(text,record)=>{
          return (
            dateParse(text)
          )
        }
      },
      {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        align:'center',
        width:100,
      },
      {
        title: '备注',
        dataIndex: 'comment',
        key: 'comment',
        align:'center',
        width:200,
      },
      {
        title: '操作',
        key: 'actionTime',
        align:'center',
        fixed: 'right',
        width: 100,
        render:(text,record)=> {
          return (
            <div>
              <Icon type="edit" title="修改基本信息" onClick={this.toEdit.bind(this,record)} style={{color:'red',margin: '5px'}} />
              <Icon type="pay-circle" title='结算' style={{color:"green",margin:"5px"}}/>
            </div>
         );
          
        }
      },
    ];
    return (
      <div className={styles.content}>
        <div className={styles.content_title}>推广员管理</div>
        <Button className={styles.content_add} type="primary" onClick={this.toAdd}>新增</Button>
        <Modal
          title={this.state.modalTitle}
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          {/* 父子组件传参，父传给子通过在子组件上面写一个属性，子组件通过props拿到属性的值，子传父，通过一个ref的回调函数 */}
          <MarketForm initData={this.state.formItem} ref={this.getForm}></MarketForm>
        </Modal>
        <div className={styles.content_search}>
          <div className={styles.content_search_input}>            
            <Input placeholder="推广员ID" onChange={this.changeInputData.bind(this,'id')} value={this.state.searchData.id} />
            <Input placeholder="手机号" onChange={this.changeInputData.bind(this,'telephone')} value={this.state.searchData.telephone} />
            <Input placeholder="用户名" onChange={this.changeInputData.bind(this,'username')} value={this.state.searchData.username} />
            <Input placeholder="QQ" onChange={this.changeInputData.bind(this,'qq')} value={this.state.searchData.qq} />
            <Input placeholder="微信" onChange={this.changeInputData.bind(this,'wxid')} value={this.state.searchData.wxid} />
            <Button type="primary" onClick={this.search}>搜索</Button>
          </div>
        </div>
        <div className={styles.content_table}>
          <Table size="small" bordered columns={columns} scroll={{ x: 1400 }} dataSource={this.props.market.marketData} pagination={
            {
              total:this.props.market.total,
              onChange:this.changePage,
              pageSize:10,
            }
          }  />
        </div>
      </div>
    )
  
  }
}

export default connect(state => state) (Market);