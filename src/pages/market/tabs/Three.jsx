import React, { Component } from 'react';
import {Table} from 'antd';
import styles from './tab.less';

export class Three extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form:{
        page:0,
        pageSize:10,
      }
    }
  }
  //点击分页跳转
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
  render() {
    const columns = [
      {
        title: '商家ID',
        dataIndex: 'id',
        key: 'id',
        align:'center',
      },
      {
        title: '手机号',
        dataIndex: 'username',
        key: 'username',
        align:'center',
      },  
      {
        title: 'QQ',
        dataIndex: 'username',
        key: 'username',
        align:'center',
      }, 
      {
        title: '累计放单',
        dataIndex: 'username',
        key: 'username',
        align:'center',
      },    
      {
        title: '已完成订单',
        dataIndex: 'username',
        key: 'username',
        align:'center',
      }, 
      {
        title: '注册时间',
        dataIndex: 'username',
        key: 'username',
        align:'center',
      },   
    ];
    const data = []
    return (
      <div className={styles.content}>
        <div className={styles.content_title}>推广商家</div>
        <div className={styles.content_table}>
          <Table size="small" columns={columns} dataSource={this.data} pagination={
            {
              total:10,
              onChange:this.changePage,
              pageSize:10,
            }
          }  />
        </div>
      </div>
    );
  }
}

export default Three;
