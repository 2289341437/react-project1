import React, { Component } from 'react';
import {Table} from 'antd';
import styles from './tabs.less';

export class Seven extends Component {
  render() {
    const columns = [
      {
        title: '充值ID',
        dataIndex: '1',
        key: '1',
        align:'center',
      },
      {
        title: '充值金额',
        dataIndex: '2',
        key: '2',
        align:'center',
      },  
      {
        title: '首款银行',
        dataIndex: '3',
        key: '3',
        align:'center',
      }, 
      {
        title: '充值时间',
        dataIndex: '4',
        key: '4',
        align:'center',
      }, 
      {
        title: '审核状态',
        dataIndex: '5',
        key: '5',
        align:'center',
      },   
      {
        title: '备注',
        dataIndex: '6',
        key: '6',
        align:'center',
      },     
    ];
    const data = []
    return (
      <div className={styles.content}>
        <div className={styles.content_title}>充值记录</div>
        <div className={styles.content_table}>
          <Table bordered size="small" scroll={{ x: 1200 }} columns={columns} dataSource={this.data} pagination={
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

export default Seven;
