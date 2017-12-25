import React from 'react';
import styles from './MainLayoutLogin.css';

function MainLayout({ children }) {
  return (
    <div className={styles.normal}>
      {/* <Header location={location} /> */}
      <div className="styles.content">
        <div className="styles.main">
          {children}
        </div>
      </div>
    </div>
  );
}

export default MainLayout;