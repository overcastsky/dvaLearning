import React from 'react';

import { connect } from 'dva';

import { Form, Input, Button, message } from 'antd';

import PropTypes from 'prop-types';

import { Link, hashHistory } from 'dva/router';

import styles from './Reset.css';

const FormItem = Form.Item;

const Reset = ({ form: { validateFields, getFieldDecorator } }) => {
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

  function handleSubmit(e) {
    e.preventDefault();
    validateFields((err, values) => {
      const userName = values.userName;
      const oldPassword = values.oldPassword;
      const password = values.password;
      if (!err) {
        if (oldPassword === password) {
          message.info('两次密码一致');
          return false;
        }
        fetch('/book/reset', {
          credentials: 'include',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify({
            userName: userName,
            oldPassword: oldPassword,
            password: password,
          }),
        })
        .then((respone) => respone.json())
        .then((data) => {
          if (data.resultCode === '000000') {
            hashHistory.push('/');
          } else {
            message.info(data.data.resultMesg);
          }
        });
      }
    });
  }
  return (
    <div className={styles.picture}>
      <div className={styles.FormBox}>
        <Form onSubmit={handleSubmit} className="login-form">
          <FormItem
            {...formItemLayout}
            label="UM账号"
          >
            {getFieldDecorator('userName', {
              rules: [{ required: true, message: 'Please input your username!' }],
            })(
              <div className={styles.username}>
                <Input type="text" placeholder="Username" />
              </div>,
              )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="旧密码"
          >
            {getFieldDecorator('oldPassword', {
              rules: [{ required: true, message: 'Please input your oldPassword!' }],
            })(
              <Input type="password" placeholder="old password" />,
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="新密码"
          >
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please input your Password!' }],
            })(
              <Input type="password" placeholder=" new password" />,
            )}
          </FormItem>
          <FormItem>
            <div className={styles.subBtn}>
              <Button type="primary" htmlType="submit" className="login-form-button">
                提交
              </Button>
            </div>
          </FormItem>
        </Form>
      </div>
    </div>
  );
};

Reset.propTypes = {
  form: PropTypes.object,
};

export default connect()(Form.create()(Reset));