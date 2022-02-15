import React, { FC, useState } from "react";
import "./App.scss";
import { Layout, Menu } from "antd";

import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined
} from '@ant-design/icons'
import App2 from "./App2";
import App3 from "./App3";

const { Header, Sider, Content } = Layout;

interface HeaderProps {
  collapsed?: boolean;
  toggle: () => void;
}


const App: FC = () => {

  // const [state, setState] = useState();
  
  const state = {
    collapsed: false,
  };

  const toggle = () => {
    const setState = ({
      collapsed: !state.collapsed,
    });
  };

  return (
    <div className="App">
      <Layout className="layout">
        <Sider trigger={null} collapsible collapsed={state.collapsed}>
          <div className="logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="1" icon={<UserOutlined />}>
              nav 1
            </Menu.Item>
            <Menu.Item key="2" icon={<VideoCameraOutlined />}>
              nav 2
            </Menu.Item>
            <Menu.Item key="3" icon={<UploadOutlined />}>
              nav 3
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }}>
            {React.createElement(state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: toggle,
            })}
          </Header>
          <Content
            className="site-layout-background"
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
            }}
          >
            <App2></App2>
            {/* <App3></App3> */}
          </Content>
        </Layout>
      </Layout>
    </div>
  );
}

export default App;
