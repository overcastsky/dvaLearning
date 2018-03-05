import React from 'react';
import {
	connect,
} from 'dva';
import AfterReadShowComponent from '../../components/AfterReadShow/AfterReadShow';
import styles from './afterReadShow.css';
import MainLayout from '../../components/MainLayout/MainLayout';

function AfterReadShow() {
  return (
    <MainLayout location={location}>
      <div className={styles.normal}>
        <AfterReadShowComponent />
      </div>
    </MainLayout>
  );
}

export default connect()(AfterReadShow);