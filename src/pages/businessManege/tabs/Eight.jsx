import React, { Component } from 'react';
import {Table} from 'antd';
import styles from './tabs.less';

export class Eight extends Component {
  render() {
    const columns = [
      {
        title: '变动时间',
        dataIndex: '1',
        key: '1',
        align:'center',
      },
      {
        title: '变动账户',
        dataIndex: '2',
        key: '2',
        align:'center',
      },  
      {
        title: '变动金额',
        dataIndex: '3',
        key: '3',
        align:'center',
      }, 
      {
        title: '账户余额',
        dataIndex: '4',
        key: '4',
        align:'center',
      }, 
      {
        title: '任务ID',
        dataIndex: '5',
        key: '5',
        align:'center',
      },   
      {
        title: '订单ID',
        dataIndex: '6',
        key: '6',
        align:'center',
      },   
      {
        title: '备注',
        dataIndex: '7',
        key: '7',
        align:'center',
      },   
    ];
    const data = []
    return (
      <div className={styles.content}>
        <div className={styles.content_title}>资金日志</div>
        <div className={styles.content_table}>
          <Table bordered size="small" scroll={{ x: 1400 }} columns={columns} dataSource={this.data} pagination={
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

export default Eight;
