import React, { Component } from 'react';

import styles from './AfterReadShow.css';

export default class AfterReadShow extends Component {
  constructor(props) {
    super(props);

    this.state = {
      list: [],
    };
  }

  componentDidMount() {
    
  }

  render() {
    return (
      <div>
        <ul className={styles.AfterReadlist}>
          <li className={styles.AfterReadLi}>
            <p className={styles.bookname}>书籍名称：</p>
            <p className={styles.author}>作者：</p>
            <p className={styles.contents}>读后感：</p>
          </li>
        </ul>
      </div>
    );
  }
}