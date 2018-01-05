import React, { Component } from 'react';

import PropTypes from 'prop-types';

import { Select, Button, message } from 'antd';
// import connect from 'dva';
// const { TextArea } = Input;
// import routerRedux from 'dva/router';
import styles from './AfterRead.css';

const Option = Select.Option;

export default class AfterRead extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dataList: [],
      bookname: undefined,
      barcode: undefined,
      disabled: false,
    };

    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    fetch('/book/book_select', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    })
    .then((response) => response.json())
    .then((data) => {
      this.setState({
        dataList: data.data,
      });
    })
    .catch((error) => {
      message.info('数据请求失败');
    });
  }

  handleChange(value) {
    // 选中项的书名
    const bookname = value;
    // 定义一个新数组用来接收筛选选中项的这条数据，用来获取这条数据的barcode
    let list = [];
    this.state.dataList.filter((item, index) => {
      if (item.name === bookname) {
        list = this.state.dataList.slice(index, index + 1);
      }
      return false;
    });
    // 获取选中项的barcode
    const barcode = list[0].barcode;
    // 将书名和此书名对应的barcode保存到state中
    this.setState({
      bookname: bookname,
      barcode: barcode,
    });
  }

  submitBtn() {
    const review = this.afterReadcontent.value;
    const bookname = this.state.bookname;
    const barcode = this.state.barcode;
    // 将读书感信息发送异步请求
    fetch('/book/after_read', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        review: review,
        bookname: bookname,
        barcode: barcode,
      }),
    })
    .then((response) => response.json())
    .then((data) => {
      if (data.resultCode === '000000') {
        message.info('提交成功');
        // 提交成功清空文本域
        this.afterReadcontent.value = '';
        // 更改开关状态
        this.setState({
          disabled: true,
        });
        // 3s后让开关放开
        setTimeout(() => {
          this.setState({
            disabled: false,
          });
        }, 3000);
      } else {
        message.info('提交失败,请重新提交');
        this.setState({
          disabled: true,
        });
        setTimeout(() => {
          this.setState({
            disabled: false,
          });
        }, 3000);
      }
    });
  }

  renderOption() {
    return this.state.dataList.map((item) => (
      <Option value={item.name} key={item.barcode}>{item.name}</Option>
    ));
  }
  render() {
    return (
      <div className={styles.normal}>
        <div className={styles.creader}>
          <span>书籍名称:</span>
          <span className={styles.selectbook}>
            <Select
              showSearch
              style={{ width: 200 }}
              placeholder="Select a Book"
              optionFilterProp="children"
              onChange={this.handleChange}
              filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            >
              {this.renderOption()}
            </Select>
          </span>
        </div>
        <div className={styles.readContent}>
          <textarea placeholder="Please write your journal entry" ref={(afterReadcontent) => { this.afterReadcontent = afterReadcontent; }} />
        </div>
        <span className={styles.submitBtn}>
          <Button disabled={this.state.disabled} type="primary" className={styles.submitBtn} onClick={() => { this.submitBtn(); }}>提交</Button>
        </span>
      </div>
    );
  }
}
AfterRead.propTypes = {
  bookname: PropTypes.string,
  barcode: PropTypes.string,
  disabled: PropTypes.bool,
};