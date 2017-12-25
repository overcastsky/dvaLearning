import React, { Component } from 'react';

import { Select, Button } from 'antd';
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
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
  }

  handleChange(value) {
    // console.log(`${value}`);
    // this._bookname.value = `${value}`

  }

  handleBlur() {
    // console.log(2);
  }

  handleFocus() {
    // console.log(3);
  }

  submitBtn() {
    // const booknameText = this.bookname.value;
    // const authornameText = this.authorname.value;
    // const afterReadContentText = this.afterReadcontent.value;
  }


  render() {
    return (
      <div className={styles.normal}>
        <div className={styles.creader}>
          <span>书籍名称:</span>
          <input placeholder="书籍名称" ref={(bookname) => { this.bookname = bookname; }} />
          <span className={styles.selectbook}>
            <Select
              showSearch
              style={{ width: 200 }}
              placeholder="Select a Book"
              optionFilterProp="children"
              onChange={this.handleChange}
              onFocus={this.handleFocus}
              onBlur={this.handleBlur}
              filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            >
              <Option value="jack">Jack</Option>
              <Option value="lucy">Lucy</Option>
              <Option value="tom">Tom</Option>
            </Select>
          </span>
       
          <div className={styles.authorname}>
            <span>作者:</span>
            <input placeholder="姓名" ref={(authorname) => { this.authorname = authorname; }} />
          </div>
        </div>
        <div className={styles.readContent}>
          <textarea placeholder="Please write your journal entry" ref={(afterReadcontent) => { this.afterReadcontent = afterReadcontent; }} />
        </div>
        <Button type="primary" className={styles.submitBtn} onClick={() => { this.submitBtn(); }}>提交</Button>
      </div>
    );
  }
}