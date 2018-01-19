import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './SearchInput.css';
// import { connect } from 'dva';

export default class SearchInput extends Component {
  // constructor(props) {
  //   super(props)
  // }
  searchVal() {
    const keywords = this.input.value;
    this.props.searchHandle(keywords);
  }

  render() {
    return (
      <div className={styles.searchBox}>
        <input type="text" maxLength="50" ref={(input) => { this.input = input; }} className={styles.serachInput} placeholder="请输入关键字" />
        <button className={styles.serachBtn} onClick={() => { this.searchVal(); }}>搜索</button>
      </div>
    );
  }
}