import React from 'react';
import styles from './newsCenter.less';
import {connect} from 'dva';
import dateParse from '@/myutils/index';
import NewsForm from './Form'
import {Input,Button,Icon,Table,DatePicker,Select,Modal } from 'antd';
const {RangePicker} = DatePicker;
const { Option } = Select;

class NewsCenter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalTitle:'新增',
      form:{
        page:0,
        pageSize:10,
        siteId:2
      },
      formItem:{},
      searchData:{
        title:''
      }
    }
  }
  //组件将要挂载，获取数据
  componentWillMount(){
    this.props.dispatch({
      type:'news/fetchLoadNews',
      payload:this.state.form,
    })
  }
  //点击删除按钮触发事件
  toDelete = (record)=>{
    this.props.dispatch({
      type:'news/fetchDeleteNews',
      payload:{page:this.state.form,form:{id:record.id}},
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
    this.newsForm.validateFields((err, values) => {
      if (!err) {
        values.receiver = values.receiver.toString();
        values.siteId= 2
        this.props.dispatch({
          type:'news/fetchSaveOrUpdateNews',
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
  //获取表格数据
  getForm = (form)=>{
    this.newsForm = form;
  }
  //点击新增触发的事件
  toAdd = (record)=>{
    this.setState({
      modalTitle:'新增'
    })
    this.showModal();
  }
  //点击编辑触发的事件
  toEdit = (record)=>{
    // record.receiver = record.receiver.split(','); //这里直接修改record里面的receiver，会使页面的数据也会修改
    console.log(record)
    this.setState({
      modalTitle:'修改',
      //这里不能直接修改record里面的receiver为数组，不然页面的receiver数据也会同步修改，只能改传给模态框表单的数据里面的receiver
      formItem:{
        ...record,
        receiver:record.receiver.split(',')
      },
    });
    this.showModal();

  }
  //点击修改状态
  changeStatus = (record)=>{
    console.log(111);
    status = record.status === '已发布'?'未发布':'已发布';
    this.props.dispatch({
      type:'news/fetchChangeStatus',
      payload:{
        form:{
          status,
          id:record.id
        },
        page:this.state.form
      }
    })
  }
  //点击跳转页面
  changePage = (page)=>{
    this.props.dispatch({
      type:'news/fetchLoadNews',
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
  //搜索框改变事件
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
  //改变下拉搜索输入框触发的事件
  changeSeletehData = (attr,e)=>{
    //这里的e就是下拉框的value值
    this.setState({
      searchData:{
        ...this.state.searchData,
        [attr]:e
      }
    })
  }
  //改变输入框触发的事件
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
      type:'news/fetchLoadNews',
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
        title: '公告标题',
        dataIndex: 'title',
        align:'center',
      },
      {
        title: '通知人群',
        dataIndex: 'receiver',
        align:'center',
      },
      {
        title: '状态',
        dataIndex: 'status',
        align:'center',
      },
      {
        title: '创建时间',
        dataIndex: 'createTime',
        align:'center',
        render:(text,record)=>{
          return (
            dateParse(text)
          )
        }
      },
      {
        title: '发布时间',
        dataIndex: 'checkTime',
        align:'center',
        render:(text,record)=>{
          return (
            dateParse(text)
          )
        }
      },
      {
        title: '操作',
        dataIndex: 'actionTime',
        align:'center',
        render:(text,record)=> {
          if(record.status == '已发布'){
            return (
              <div>
                <Icon type="edit" title="编辑" onClick={this.toEdit.bind(this,record)} />
                <Icon type="check-circle" title="发布" style={{color:"green",margin:"5px"}} 
                onClick={this.changeStatus.bind(this,record)}/>
                <Icon type="delete" title="删除" onClick={this.toDelete.bind(this,record)}/>
              </div>
           );
          }
          return (
            <div>
              <Icon type="edit" title="编辑" onClick={this.toEdit.bind(this,record)} />
              <Icon type="close-circle" title="取消发布" style={{color:'red',margin: '5px'}}
              onClick={this.changeStatus.bind(this,record)} />
              <Icon type="delete" title="删除" onClick={this.toDelete.bind(this,record)}/>
            </div>
         );
          
        }
      },
    ];
    return (
      <div className={styles.content}>
        <div className={styles.content_title}>消息管理</div>
        <Button className={styles.content_add} type="primary" onClick={this.toAdd}>新增</Button>
        <Modal
          title={this.state.modalTitle}
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <NewsForm initData={this.state.formItem} ref={this.getForm}></NewsForm>
        </Modal>
        <div className={styles.content_search}>
          <div className={styles.content_search_time}>
            <RangePicker onChange={this.onChangeTime} />
          </div>
          <div className={styles.content_search_input}>            
            <Select placeholder="通知人群" style={{width: 120 ,margin: 10}} 
            onChange={this.changeSeletehData.bind(this,'receiver')} allowClear	 >
              {/* <Option value="分站">分站</Option>
              <Option value="买手">买手</Option> */}
              <Option value="商家">商家</Option>
              <Option value="推广员">推广员</Option>
            </Select>
            <Select placeholder="状态" style={{width: 120 ,margin: 10}}
            onChange={this.changeSeletehData.bind(this,'status')} allowClear >
              <Option value="已发布">已发布</Option>
              <Option value="未发布">未发布</Option>
            </Select>
            <Input placeholder="标题" onChange={this.changeInputData.bind(this,'title')} value={this.state.searchData.title} />
            <Button type="primary" onClick={this.search}>搜索</Button>
          </div>
        </div>
        <div className={styles.content_table}>
          <Table size="small" columns={columns} dataSource={this.props.news.newsData} pagination={
            {
              total:this.props.news.total,
              onChange:this.changePage,
              pageSize:10,
            }
          } / >
        </div>
      </div>
    )
  }
}

export default connect(state => state) (NewsCenter);