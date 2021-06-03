import React from "react";
import { Layout } from "antd";
import "./BasicLayout.scss";

console.log(Layout);

const { Sider, Header, Content, Footer } = Layout;

const BasicLayout: React.FC = () => {
  return (
    <React.Fragment>
      <Layout className="basic-layout-container">
        <Sider className="basic-layout-sider">Sider</Sider>
        <Layout>
          <Header className="basic-layout-header">Header</Header>
          <Content>Content</Content>
        </Layout>
        <Footer className="basic-layout-footer">Footer</Footer>
      </Layout>
    </React.Fragment>
  );
};

export default BasicLayout;
