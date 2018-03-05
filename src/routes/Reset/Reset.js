import React from 'react';
import {
	connect,
} from 'dva';
import ResetComponent from '../../components/Reset/Reset';
import styles from './Reset.css';
import MainLayout from '../../components/MainLayoutLogin/MainLayoutLogin';


function Reset() {
  return (
    <MainLayout location={location}>
      <div className={styles.normal}>
        <ResetComponent />
      </div>
    </MainLayout>
  );
}

export default connect()(Reset);