import { Layout, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const { Header } = Layout;

export default function AppHeader() {
  return (
   <Header className="header">
           <div className="logo">
             # <span className="logo-sub">ROSTER GRID</span>
           </div>
           <div className="nav-menu">
             <span>Dashboard</span>
             <span>Roster</span>
             <span>Communications</span>
             <span className="active">CRM</span>
             <span>Contracts</span>
             <span>Settings</span>
             <span>More</span>
           </div>
           <div className="user-profile">
             <span>Michael</span>
             <Avatar icon={<UserOutlined />} />
           </div>
         </Header>
  );
}
