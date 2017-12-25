import React, { Component } from 'react';
import { hashHistory } from 'dva/router';
// import connect from 'dva';
// import routerRedux from 'dva/router';
import { Form, Input, Checkbox, Button } from 'antd';

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
    this.props.form.validateFieldsAndScroll((err) => {
      if (!err) {
        // 发送异步请求得到结果，判断是否注册成功
        // console.log(values);
        // hashHistory.push('/');
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

    return (
      <div className={styles.registerImg}>
        <div className={styles.registerModel}>
          <Form onSubmit={this.handleSubmit}>
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