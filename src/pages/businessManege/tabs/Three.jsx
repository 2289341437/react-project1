import React, { Component } from 'react';
import {Table} from 'antd';
import styles from './tabs.less';

export class Three extends Component {
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
        title: '任务类型',
        dataIndex: '3',
        key: '3',
        align:'center',
      }, 
      {
        title: '商品名称',
        dataIndex: '4',
        key: '4',
        align:'center',
      }, 
      {
        title: '接单时间',
        dataIndex: '5',
        key: '5',
        align:'center',
      },   
      {
        title: '接单账号',
        dataIndex: '6',
        key: '6',
        align:'center',
      },   
      {
        title: '商家押金',
        dataIndex: '7',
        key: '7',
        align:'center',
      },
      {
        title: '买手付款',
        dataIndex: '8',
        key: '8',
        align:'center',
      },
      {
        title: '商家返款',
        dataIndex: '9',
        key: '9',
        align:'center',
      },   
      {
        title: '电商订单号',
        dataIndex: '10',
        key: '10',
        align:'center',
      },  
      {
        title: '订单状态',
        dataIndex: '11',
        key: '11',
        align:'center',
      }, 
    ];
    const data = []
    return (
      <div className={styles.content}>
        <div className={styles.content_title}>进行中订单</div>
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

export default Three;
