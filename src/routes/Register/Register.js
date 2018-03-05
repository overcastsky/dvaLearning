import React from 'react';
import {
	connect,
} from 'dva';

import RegisterComponent from '../../components/Register/Register';
import styles from './Register.css';
import MainLayout from '../../components/MainLayoutLogin/MainLayoutLogin';

function Register() {
  return (
    <MainLayout location={location}>
      <div className={styles.normal}>
        <RegisterComponent />
      </div>
    </MainLayout>
  );
}

export default connect()(Register);