import React from 'react';

import { connect } from 'dva';

import { Form, Icon, Input, Button, Checkbox } from 'antd';

import PropTypes from 'prop-types';

import { Link } from 'dva/router';

import styles from './Login.css';

const FormItem = Form.Item;

const Login = ({ dispatch, form: { validateFields, getFieldDecorator } }) => {
  function handleSubmit(e) {
    e.preventDefault();
    validateFields((errors, values) => {
      const params = values;
      if (errors) {
        return false;
      } else {
        dispatch({ type: 'login/login', payload: params });
      }
    });
  }
  
  return (
    <div className={styles.bgImg}>
      <div className={styles.Formbox}>
        <Form onSubmit={handleSubmit} className="login-form">
          <FormItem>
            {getFieldDecorator('userName', {
              rules: [{ required: true, message: 'Please input your username!' }],
            })(
              <div className={styles.username}>
                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
              </div>,
              )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please input your Password!' }],
            })(
              <div className={styles.keyword}>
                <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
              </div>,
              )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: true,
            })(
              <Checkbox><span className={styles.fontColor}>Remember me</span></Checkbox>,
              )}
            <div className={styles.loginbtn}>
              <div className={styles.forgetPass}>
                <Link to="/reset">
                  修改密码?
                </Link>
              </div>
              <Button type="primary" htmlType="submit" className="login-form-button">
                  Login
                </Button>
            </div>
          </FormItem>
        </Form>
      </div>
    </div>
  );
};

Login.propTypes = {
  form: PropTypes.object,
  dispatch: PropTypes.func,
};


export default connect()(Form.create()(Login));