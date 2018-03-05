import React from 'react';
import {
	connect,
} from 'dva';
import LoginComponent from '../../components/Login/Login';
import styles from './Login.css';
import MainLayout from '../../components/MainLayoutLogin/MainLayoutLogin';


function Login() {
  return (
    <MainLayout location={location}>
      <div className={styles.normal}>
        <LoginComponent />
      </div>
    </MainLayout>
  );
}

export default connect()(Login);