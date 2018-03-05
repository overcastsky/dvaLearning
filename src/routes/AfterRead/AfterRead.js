import React from 'react';
import {
	connect,
} from 'dva';
import AfterReadComponent from '../../components/AfterRead/AfterRead';
import styles from './AfterRead.css';
import MainLayout from '../../components/MainLayout/MainLayout';


function AfterRead() {
  return (
    <MainLayout location={location}>
      <div className={styles.normal}>
        <AfterReadComponent />
      </div>
    </MainLayout>
  );
}

export default connect()(AfterRead);