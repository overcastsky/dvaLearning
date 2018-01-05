import React from 'react';
import { connect } from 'dva';

import { Table, Pagination, Popconfirm, Button } from 'antd';

import { routerRedux, Link } from 'dva/router';

import styles from './Books.css';

import { PAGE_SIZE } from '../../constants';

import BookModal from './BookModal';
import SearchInput from '../SearchInput/SearchInput';

function Books({ dispatch, list: dataSource, total, page: current }) {
  const query = { dispatch, list: dataSource, total, page: current };
  query.page = query.page ? query.page : 1;
  // current = current ? current : 1;
  const booksListData = dataSource && dataSource.booksListData;
  const data = booksListData && booksListData.slice((query.page - 1) * PAGE_SIZE, query.page * PAGE_SIZE);

  const typeOptions = {
    'paper': '实物书',
    'elec': '电子书',
  };

  const classtypeOptions = {
    'code': '编程',
    'db': '数据库',
    'art': '文学',
    'think': '思维',
    'project': '项目管理',
  };

  function createHandle(values) {
    dispatch({
      type: 'books/create',
      payload: values,
    });
  }

  function deleteHandler(id) {
    dispatch({
      type: 'books/remove',
      payload: id,
    });
  }

  function pageChangeHandle(page) {
    dispatch(routerRedux.push({
      pathname: '/books',
      query: {
        page,
      },
    }));
  }

  function eidtHandle(id, values) {
    dispatch({
      type: 'books/patch',
      payload: {
        id,
        values,
      },
    });
  }

  function searchHandle(keywords) {
    dispatch({
      type: 'books/query',
      payload: {
        keywords,
      },
    });
  }

  const columns = [{
    title: '书名',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a href="">{text}</a>,
  }, {
    title: '作者',
    dataIndex: 'author',
    key: 'author',
  }, {
    title: '出版社',
    dataIndex: 'publish',
    key: 'publish',
  }, {
    title: '类别',
    dataIndex: 'type',
    key: 'type',
    render: (text) => <span>{
			typeOptions[text]
		}</span>,
  }, {
    title: '分类',
    dataIndex: 'classType',
    key: 'classType',
    render: (text) => <span>{
			classtypeOptions[text]
		}</span>,
  }, {
    title: '位置',
    dataIndex: 'location',
    key: 'location',
  }, {
    title: '所有者',
    dataIndex: 'owner',
    key: 'owner',
  }, {
    title: '编码',
    dataIndex: 'barcode',
    key: 'barcode',
  }, {
    title: '摘要',
    dataIndex: 'abstracts',
    key: 'abstracts',
  }, {
    title: '价格',
    dataIndex: 'price',
    key: 'price',
  }, {
    title: '当前借阅人',
    dataIndex: 'borrower',
    key: 'borrower',
  }, {
    title: '预计归还时间',
    dataIndex: 'planReturnDate',
    key: 'planReturnDate',
  }, {
    title: '当前状态',
    dataIndex: 'status',
    key: 'status',
  }, {
    title: '操作',
    key: 'operation',
    render: (text, record) => (
      <span className={styles.operation}>
        {record.status === '空闲' &&
          <BookModal record={record} onOk={eidtHandle.bind(null, record.idLoanBook)}>
            <a>借用</a>
          </BookModal>
			}
        {(record.status === '借用') && record.borrower !== sessionStorage.getItem('username') ? null :
          (<BookModal record={record} onOk={eidtHandle.bind(null, record.idLoanBook)}>
            <a>归还</a>
          </BookModal>)
      }
        <Popconfirm title="Confirm to delete?" onConfirm={deleteHandler.bind(null, record.idLoanBook)}>
          {sessionStorage.getItem('state') === '1' ? (<Button type="primary">删除</Button>) : null}
        </Popconfirm>
      </span>
		),
  }];

  return (
    <div className={styles.normal}>
      <div>
        <div className={styles.create}>
          <BookModal record={{}} onOk={createHandle}>
            <Button type="primary">添加图书</Button>
            {sessionStorage.getItem('state') === '1' ?
              (<span className={styles.resBtn}>
                <Button type="primary" htmlType="submit">
                  <Link to="/register">Register</Link>
                </Button>
              </span>) : null
            }
          </BookModal>
          <SearchInput searchHandle={searchHandle} />
        </div>
        <Table
          columns={columns}
          dataSource={data}
          rowKey={(record) => record.id}
          pagination={false}
        />
        <Pagination
          className="ant-table-pagination"
          total={total}
          current={current}
          pageSize={PAGE_SIZE}
          onChange={pageChangeHandle}
        />
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  const {
		list,
		total,
		page,
	} = state.books;
  return {
    list,
    total,
    page,
  };
}

export default connect(mapStateToProps)(Books);