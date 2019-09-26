import React, { Component } from 'react';
import {connect} from 'dva';
import { Tabs } from 'antd';
import One from './tabs/One';
import Two from './tabs/Two';
import Three from './tabs/Three';
import Four from './tabs/Four';
import Five from './tabs/Five';
import Six from './tabs/Six';
import Seven from './tabs/Seven';
import Eight from './tabs/Eight';

const { TabPane } = Tabs;

export class BusinessManegeDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  //在页面将要挂载的时候，获取页面所需要的数据
  componentWillMount(){
    //获取businessManege页面传递的参数
    let storage = window.localStorage;
    this.props.dispatch({
      type:'businessManegeDetail/fetchFindBusinessDetailsById',
      payload:{
        id:storage.getItem("businessManegeId")
      }
    })
  }
  //页面将要卸载，清除localStorage的marketId
  componentWillUnmount(){
    let storage = window.localStorage;
    storage.removeItem("businessManegeId");
  }
  callback = (key)=> {
    console.log(key);
  }
  render() {
    let data = this.props.businessManegeDetail.businessManegeDetailData;
    return (
      <div>
        <Tabs defaultActiveKey="1" onChange={this.callback}>
          <TabPane tab="商家详情" key="1">
            <One data={data}></One>
          </TabPane>
          <TabPane tab="代接订单" key="2">
            <Two data={data}></Two>
          </TabPane>
          <TabPane tab="进行中订单" key="3">
            <Three data={data}></Three>
          </TabPane>
          <TabPane tab="已完成订单" key="4">
            <Four data={data}></Four>
          </TabPane>
          <TabPane tab="已撤销订单" key="5">
            <Five data={data}></Five>
          </TabPane>
          <TabPane tab="绑定店铺" key="6">
            <Six data={data}></Six>
          </TabPane>
          <TabPane tab="充值记录" key="7">
            <Seven data={data}></Seven>
          </TabPane>
          <TabPane tab="资金日志" key="8">
            <Eight data={data}></Eight>
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

export default connect(stata => stata) (BusinessManegeDetail);
