import React, { Component } from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
const {TextArea} = Input;

export class MarketForm extends Component {
  render() {
    const { getFieldDecorator } = this.props.form;
    getFieldDecorator('id');
    getFieldDecorator('status');
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 18 },
      },
    };
    return (
      <Form {...formItemLayout} onSubmit={this.handleSubmit} className="login-form">
        <Form.Item label="用户名">
          {getFieldDecorator('username', {
            rules: [{ required: true, message: '请输入用户名' }],
          })(
            <Input  />,
          )}
        </Form.Item>
        <Form.Item label="微信号">
          {getFieldDecorator('wxid', {
          })(
            <Input  />,
          )}
        </Form.Item>
        <Form.Item label="手机号">
          {getFieldDecorator('telephone', {
            rules: [{ required: true, message: '请输入您的手机号' }],
          })(
            <Input  />,
          )}
        </Form.Item>
        <Form.Item label="QQ">
          {getFieldDecorator('qq', {
            rules: [{ required: true, message: '请输入您的QQ号' }],
          })(
            <Input  />,
          )}
        </Form.Item>
        <Form.Item label="登入密码">
          {getFieldDecorator('password', {
            rules: [{ required: true, message: '请输入您的登入密码' }],
          })(
            <Input.Password />
          )}
        </Form.Item>
        <Form.Item label="抽成比例">
          {getFieldDecorator('ratio', {
            rules: [{ required: true, message: '请输入抽成比例' }],
          })(
            <Input  />,
          )}
        </Form.Item>
        <Form.Item label="备注">
          {getFieldDecorator('content', {
            rules: [{ required: true, message: '请输入内容' }],
          })(
            <TextArea  placeholder="请输入内容" autosize={{ minRows: 2, maxRows: 6 }}/>
          )}
        </Form.Item>
      </Form>
    );
  }
}
const mapPropsToFields=(props)=> {
  // console.log(props.initData);
  //将父组件传过来的参数放到表单里面
	var obj={}
	for(var key in props.initData){
		var val=props.initData[key]
		obj[key] = Form.createFormField({ value: val})
  }
  // console.log(obj);
	return obj
  }
export default Form.create({mapPropsToFields})(MarketForm) ;
