import React, { Component } from 'react';
import {Table} from 'antd';
import styles from './tabs.less';

export class Six extends Component {
  render() {
    const columns = [
      {
        title: '所属平台',
        dataIndex: '1',
        key: '1',
        align:'center',
      },
      {
        title: '店铺名称',
        dataIndex: '2',
        key: '2',
        align:'center',
      },  
      {
        title: '旺旺ID',
        dataIndex: '3',
        key: '3',
        align:'center',
      }, 
      {
        title: '店铺网址',
        dataIndex: '4',
        key: '4',
        align:'center',
      }, 
      {
        title: '绑定时间',
        dataIndex: '5',
        key: '5',
        align:'center',
      },   
      {
        title: '店铺审核状态',
        dataIndex: '6',
        key: '6',
        align:'center',
      },     
    ];
    const data = []
    return (
      <div className={styles.content}>
        <div className={styles.content_title}>绑定店铺</div>
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

export default Six;
