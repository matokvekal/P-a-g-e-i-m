import React, { useState ,useContext} from 'react';

import 'antd/dist/antd.css';
import { Link } from 'react-router-dom';
import { Menu, Button } from 'antd';
import { MenuContext } from '../../context/MenuContext';
import {
    AppstoreOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    PieChartOutlined,
    DesktopOutlined,
    ContainerOutlined,
    MailOutlined,
} from '@ant-design/icons';

const { SubMenu } = Menu;

export const Navbar3 = () => {
    const [collapsed, setCollapsed] = useState(false);
    const { menuList } = useContext(MenuContext);
    const toggleCollapsed = () => {
        setCollapsed(state => !state)
    };



    return (
        <div style={{ width: 170 }}>
            <Menu
                // defaultSelectedKeys={['1']}
                // defaultOpenKeys={['sub1']}
                mode="inline"
                theme="dark"
                inlineCollapsed={collapsed}
            >
                {
                    menuList?  menuList.sort((a, b) => (a.key > b.key) ? 1 : -1).map((item, index) => (
                        <Menu.Item key={item.id} icon={<DesktopOutlined />}>
                            <Link to={'/' + item.linkTo} params={"table"} key={item.key} app={item.app}>
                                {item.text}
                            </Link>
                        </Menu.Item>

                    )):null}

    
                <SubMenu key="sub1" icon={<MailOutlined />} title="Navigation One">
                    <Menu.Item key="5">Option 5</Menu.Item>
                    <Menu.Item key="6">Option 6</Menu.Item>
                    <Menu.Item key="7">Option 7</Menu.Item>
                    <Menu.Item key="8">Option 8</Menu.Item>
                </SubMenu>
                <SubMenu key="sub2" icon={<AppstoreOutlined />} title="Navigation Two">
                    <Menu.Item key="9">Option 9</Menu.Item>
                    <Menu.Item key="10">Option 10</Menu.Item>
                    <SubMenu key="sub3" title="Submenu">
                        <Menu.Item key="11">Option 11</Menu.Item>
                        <Menu.Item key="12">Option 12</Menu.Item>
                    </SubMenu>
                </SubMenu>

            </Menu>
        </div>
    );

}
export default Navbar3;
