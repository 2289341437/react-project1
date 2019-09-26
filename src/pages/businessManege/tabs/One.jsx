import React, { Component } from 'react';
import styles from './tabs.less'

export class One extends Component {

  render() {
    let data = this.props.data;
    data.status = data.status == 'false'?'停用':'正常';
    let domain = data.site == null?null:data.site.domain;
    return (
      <div className={styles.content}>
        <div className={styles.content_title}>基本信息</div>
        <div className={styles.content_fTitle}>【基本信息】</div>
        <div className={styles.content_row}>
          <div className={styles.content_col3}>商家ID：</div>
          <div className={styles.content_col2}>{data.id}</div>
          <div className={styles.content_col3}>名称：</div>
          <div className={styles.content_col2}>{data.username}</div>
        </div>
        <div className={styles.content_row}>
          <div className={styles.content_col3}>来源：</div>
          <div className={styles.content_col2}>{domain}</div>
          <div className={styles.content_col3}>注册时间：</div>
          <div className={styles.content_col2}>{data.registerTime}</div>
        </div>
        <div className={styles.content_row}>
          <div className={styles.content_col3}>手机号：</div>
          <div className={styles.content_col2}>{data.telephone}</div>
          <div className={styles.content_col3}>QQ：</div>
          <div className={styles.content_col2}>{data.qq}</div>
        </div>
        <div className={styles.content_row}>
          <div className={styles.content_col3}>备注：</div>
          <div className={styles.content_col2}>{data.comment}</div>
        </div>
        <div className={styles.content_row}>
          <div className={styles.content_col3}>状态：</div>
          <div className={styles.content_col2}>{data.status}</div>
          <div className={styles.content_col3}>用户等级：</div>
          <div className={styles.content_col2}>{data.rank}</div>
        </div>
        <div className={styles.content_line}></div>
        <div className={styles.content_fTitle}>【账号信息】</div>
        <div className={styles.content_row}>
          <div className={styles.content_col3}>本金余额：</div>
          <div className={styles.content_col2}>{data.accountBj}</div>
          <div className={styles.content_col3}>佣金余额：</div>
          <div className={styles.content_col2}>{data.accountYj}</div>
        </div>
        <div className={styles.content_row}>
          <div className={styles.content_col3}>累计充值：</div>
          <div className={styles.content_col2}>{data.recharge}</div>
        </div>
        <div className={styles.content_line}></div>
      </div>
    );
  }
}

export default One;
