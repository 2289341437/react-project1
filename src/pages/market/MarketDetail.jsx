import React, { Component } from 'react';
import {connect} from 'dva';
import { Tabs } from 'antd';
import One from './tabs/One';
import Two from './tabs/Two';
import Three from './tabs/Three';
import Four from './tabs/Four';

const { TabPane } = Tabs;


class MarketDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form:{

      }
    }
  }
  //页面将要加载，获取到页面所需要的数据。
  componentWillMount(){
    //获取Market页面传递的参数
    let storage = window.localStorage;
    console.log(storage.getItem("marketId"));
    this.props.dispatch({
      type:'marketDetail/fetchFindUserDetailsById',
      payload:{
        id:storage.getItem("marketId")
      }
    })
  }
  //页面将要卸载，清除localStorage的marketId
  componentWillUnmount(){
    let storage = window.localStorage;
    storage.removeItem("marketId");
  }
  callback = (key)=> {
    console.log(key);
  }
  render() {
    return (
      <div>
        <Tabs defaultActiveKey="1" onChange={this.callback}>
          <TabPane tab="推广员详情" key="1">
            <One data={this.props.marketDetail.marketDetailData}></One>
          </TabPane>
          <TabPane tab="账户详情" key="2">
            <Two data={this.props.marketDetail.marketDetailData}></Two>
          </TabPane>
          <TabPane tab="推广商家" key="3">
            <Three data={this.props.marketDetail.marketDetailData}></Three>
          </TabPane>
          <TabPane tab="资金日志" key="4">
            <Four data={this.props.marketDetail.marketDetailData}></Four>
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

export default connect(state => state) (MarketDetail);