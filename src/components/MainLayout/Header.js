import React from 'react';
import { Menu, Icon } from 'antd';
import { Link } from 'dva/router';

function Header({
	location,
}) {
  return (
    <Menu selectedKeys={[location.pathname]} mode="horizontal" theme="dark">
      <Menu.Item key="/">
        <Link to="/indexPage"><Icon type="home" />首页</Link>
      </Menu.Item>
      <Menu.Item key="/books">
        <Link to="/books"><Icon type="book" />图书列表</Link>
      </Menu.Item>
      <Menu.Item key="/afterRead">
        <Link to="/afterRead"><Icon type="edit" />读后感</Link>
      </Menu.Item>
      <Menu.Item key="/afterReadShow">
        <Link to="/afterReadShow"><Icon type="file-text" />读后感展示</Link>
      </Menu.Item>
      <Menu.Item key="/bookquery">
        <Link to="/bookquery"><span></span></Link>
      </Menu.Item>
    </Menu>
  );
}

export default Header;