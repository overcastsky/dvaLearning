import React, { Component } from 'react';
import { hashHistory } from 'dva/router';
// import connect from 'dva';
// import routerRedux from 'dva/router';
import { Form, Input, Checkbox, Button, Tooltip, Icon, Select, message } from 'antd';

import styles from './Register.css';
// import { Link, hashHistory } from 'dva/router';

const FormItem = Form.Item;
// const Option = Select.Option;
// const AutoCompleteOption = AutoComplete.Option;

class Register extends Component {
  state = {
    confirmDirty: false,
    // autoCompleteResult: [],
  };
  handleSubmit = (e) => {
    e.preventDefault();
    // 获取到文本框的值,等待传入
    // values
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        // 发送异步请求得到结果，判断是否注册成功
        delete values.prefix;
        delete values.agreement;
        fetch('/book/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            nickname: values.nickname,
            phone: values.phone,
            username: values.username,
            password: values.password,
            confirm: values.confirm,
          }),
        })
        .then((respone) => respone.json())
        .then((data) => {
          if (data.resultCode === '000000') {
            hashHistory.push('/books');
          } else {
            message.info('注册失败，请重试');
          }
        })
        .catch((error) => {
          console.log(error);
        });
      }
    });
  }
  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }
  
  checkPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  }
  checkConfirm = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    // const { autoCompleteResult } = this.state;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };

    const prefixSelector = getFieldDecorator('prefix', {
      initialValue: '86',
    })(
      <Select style={{ width: 70 }}>
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>,
    );

    return (
      <div className={styles.registerImg}>
        <div className={styles.registerModel}>
          <Form onSubmit={this.handleSubmit}>
            <FormItem
              {...formItemLayout}
              label={(
                <span>
              name&nbsp;
              <Tooltip title="What do you want others to call you?">
                <Icon type="question-circle-o" />
              </Tooltip>
                </span>
          )}
            >
              {getFieldDecorator('nickname', {
                rules: [{ required: true, message: 'Please input your nickname!', whitespace: true }],
              })(
                <Input />,
          )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="Phone Number"
            >
              {getFieldDecorator('phone', {
                rules: [{ required: true, message: 'Please input your phone number!' }],
              })(
                <Input addonBefore={prefixSelector} style={{ width: '100%' }} />,
          )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="UM-ID"
            >
              {getFieldDecorator('username', {
                rules: [{
                  message: 'The input is not valid E-mail!',
                }, {
                  required: true, message: 'Please input your UM-ID!',
                }, {
                  pattern: '^[A-Za-z0-9-]+$', message: 'Composed of capital letters Numbers',
                }],
              })(
                <div className={styles.UMid}>
                  <Input />
                </div>,
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="E-mail"
            >
              {getFieldDecorator('email', {
                rules: [{
                  type: 'email', message: 'The input is not valid E-mail!',
                }, {
                  required: true, message: 'Please input your E-mail!',
                }],
              })(
                <Input />,
          )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="Password"
            >
              {getFieldDecorator('password', {
                rules: [{
                  required: true, message: 'Please input your password!',
                }, {
                  validator: this.checkConfirm,
                }],
              })(
                <div className={styles.UMid}>
                  <Input type="password" />
                </div>,
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="Confirm Password"
            >
              {getFieldDecorator('confirm', {
                rules: [{
                  required: true, message: '两次密码不一致!',
                }, {
                  validator: this.checkPassword,
                }],
              })(
                <div className={styles.UMid}>
                  <Input type="password" />
                </div>,
              )}
            </FormItem>
            <FormItem {...tailFormItemLayout}>
              {getFieldDecorator('agreement', {
                valuePropName: 'checked',
              })(
                <Checkbox>I have read the <a href="">agreement</a></Checkbox>,
              )}
            </FormItem>
            <FormItem {...tailFormItemLayout}>
              <div className={styles.registerbtn}>
                <Button type="primary" htmlType="submit">Register</Button>
              </div>
            </FormItem>
          </Form>
        </div>
      </div>
      
    );
  }
}

export default Form.create()(Register);