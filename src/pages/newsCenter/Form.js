import { Form, Icon, Input, Button, Checkbox } from 'antd';
const {TextArea} = Input;

class NewsForm extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const plainOptions = ['商家', '推广员'];
    getFieldDecorator('id');
    getFieldDecorator('status');

    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <Form.Item>
          {getFieldDecorator('title', {
            rules: [{ required: true, message: '请输入标题' }],
          })(
            <Input placeholder="标题" />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('receiver', {
            rules: [{ required: true, message: '请选择要推广的对象' }],
          })(
             <Checkbox.Group options={plainOptions} />
          )}
        </Form.Item>
        <Form.Item>
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
//将父组件传过来的参数放到表单里面
const mapPropsToFields=(props)=> {
  // console.log(props.initData);
	var obj={}
	for(var key in props.initData){
		var val=props.initData[key]
		obj[key] = Form.createFormField({ value: val})
  }
  // console.log(obj);
	return obj
  }

export default  Form.create({mapPropsToFields})(NewsForm);