import React, { Component } from 'react';
import {Table} from 'antd';
import styles from './tabs.less';

export class Two extends Component {
  render() {
    const columns = [
      {
        title: '订单ID',
        dataIndex: '1',
        key: '1',
        align:'center',
      },
      {
        title: '任务ID',
        dataIndex: '2',
        key: '2',
        align:'center',
      },  
      {
        title: '商家ID',
        dataIndex: '3',
        key: '3',
        align:'center',
      }, 
      {
        title: '任务类型',
        dataIndex: '4',
        key: '4',
        align:'center',
      }, 
      {
        title: '商家押金',
        dataIndex: '5',
        key: '5',
        align:'center',
      },   
      {
        title: '商家支付押金',
        dataIndex: '6',
        key: '6',
        align:'center',
      },      
    ];
    const data = []
    return (
      <div className={styles.content}>
        <div className={styles.content_title}>代接订单</div>
        <div className={styles.content_table}>
          <Table bordered size="small" columns={columns} dataSource={this.data} pagination={
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

export default Two;
