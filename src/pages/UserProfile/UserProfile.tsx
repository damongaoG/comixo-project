import React, {useState} from 'react';
import type {MenuProps} from 'antd';
import {Layout, Menu} from 'antd';
import {CreditCardOutlined, LockOutlined, UserOutlined,} from '@ant-design/icons';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import ProfileContent from '../../components/ProfileContent/ProfileContent';
import SubscriptionsContent from '../../components/SubscriptionsContent/SubscriptionsContent';
import ChangePasswordContent from '../../components/ChangePasswordContent/ChangePasswordContent';
import OffcanvasMenu from '../../components/OffcanvasMenu/OffcanvasMenu';

const {Content, Sider} = Layout;

const UserProfile: React.FC = () => {
  const [selectedKey, setSelectedKey] = useState('profile');

  const menuItems: MenuProps['items'] = [
    {
      key: 'profile',
      icon: <UserOutlined/>,
      label: 'Profile',
    },
    {
      key: 'subscriptions',
      icon: <CreditCardOutlined/>,
      label: 'Subscriptions',
    },
    {
      key: 'changePassword',
      icon: <LockOutlined/>,
      label: 'Change Password',
    },
  ];

  const renderContent = () => {
    switch (selectedKey) {
      case 'profile':
        return <ProfileContent/>;
      case 'subscriptions':
        return <SubscriptionsContent/>;
      case 'changePassword':
        return <ChangePasswordContent/>;
      default:
        return <ProfileContent/>;
    }
  };

  return (
    <>
      <Navbar/>
      <OffcanvasMenu/>
      <section id="page-title">
        <div id="backtotop">
          <a href="#page-title" id="backtotop-value">
            <i className="fa-solid fa-arrow-up"></i>
          </a>
        </div>
      </section>
      <Layout style={{minHeight: '100vh', backgroundColor: 'rgb(240, 235, 229)'}}>
        <Sider width={200} theme="light">
          <Menu
            mode="inline"
            selectedKeys={[selectedKey]}
            style={{height: '100%', borderRight: 0, background: 'rgb(240, 235, 229)'}}
            onClick={({key}) => setSelectedKey(key)}
            items={menuItems}
          />
        </Sider>
        <Layout style={{padding: '24px', backgroundColor: 'rgb(240, 235, 229)'}}>
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: 'rgb(240, 235, 229)',
              borderRadius: '8px',
            }}
          >
            {renderContent()}
          </Content>
        </Layout>
      </Layout>
      <Footer/>
    </>
  );
};

export default UserProfile;
