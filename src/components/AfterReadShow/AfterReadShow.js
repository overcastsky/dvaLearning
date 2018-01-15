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
    fetch('/book/book_show', {
      credentials: 'include',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    })
    .then((response) => response.json())
    .then((data) => {
      this.setState({
        list: data.data,
      });
    });
  }

  renderAfterRead() {
    return this.state.list.map((item, index) => {
      return (
        <li className={styles.AfterReadLi} key={index}>
          <p className={styles.bookname}>书籍名称：{item.bookName}</p>
          <p className={styles.author}>作者：{item.borrower}</p>
          <p className={styles.contents}>读后感：{item.rebiew}</p>
        </li>
      );
    });
  }

  render() {
    return (
      <div>
        <ul className={styles.AfterReadlist}>
          { this.renderAfterRead() }
        </ul>
      </div>
    );
  }
}