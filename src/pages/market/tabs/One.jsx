import React, { Component } from 'react';
import styles from './tab.less'

export class One extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  //页面将要挂载，获取页面数据
  render() {
    let data = this.props.data;
    return (
      //这里面的数据例如data.id不能写成this.data.id，因为这里的this是指向外层的的的this，和this.props的this是一样的，
      //而外层的this里面又没有data数据导致页面在生命周期的第二个阶段的渲染页面时候会报错会报错,
      <div className={styles.content}>
        <div className={styles.content_title}>推广员详情</div>
        <div className={styles.content_fTitle}>【基本信息】</div>
        <div className={styles.content_row}>
          <div className={styles.content_col3}>推广员ID：</div>
          <div className={styles.content_col2}>{data.id}</div>
          <div className={styles.content_col3}>用户名：</div>
          <div className={styles.content_col2}>{data.username}</div>
        </div>
        <div className={styles.content_row}>
          <div className={styles.content_col3}>QQ：</div>
          <div className={styles.content_col2}>{data.qq}</div>
          <div className={styles.content_col3}>手机号：</div>
          <div className={styles.content_col2}>{data.telephone}</div>
        </div>
        <div className={styles.content_row}>
          <div className={styles.content_col3}>微信号：</div>
          <div className={styles.content_col2}>{data.wxid}</div>
          <div className={styles.content_col3}>注册时间：</div>
          <div className={styles.content_col2}>{data.registerTime}</div>
        </div>
        <div className={styles.content_row}>
          <div className={styles.content_col3}>上次登入时间：</div>
          <div className={styles.content_col2}>{data.lastLoginTime}</div>
          <div className={styles.content_col3}>状态：</div>
          <div className={styles.content_col2}>{data.status}</div>
        </div>
        <div className={styles.content_row}>
          <div className={styles.content_col3}>备注：</div>
          <div className={styles.content_col2}>{data.comment}</div>
        </div>
      </div>
    );
  }
}

// export default connect(state => state) (One);
export default One;
