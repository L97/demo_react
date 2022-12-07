import { useState } from 'react';
import {
  Routes,
  BrowserRouter,
  Route,
  Link,
  useLocation
} from "react-router-dom";
import './App.css';
import { Menu, Switch } from 'antd';
import { RightOutlined, LeftOutlined } from '@ant-design/icons';
import Form from './pages/Form/Form'
import Chart from './pages/Chart/Chart'

function App() {
  const [theme, setTheme] = useState('light');
  const changeTheme = (value) => {
    setTheme(value ? 'dark' : 'light');
  };

  // const location = useLocation()
  // defaultSelectedKeys={items.filter(i => i.key === location.pathName.replace('/', '')).map(i => i.key)}
  const items = [
    {key: 'form', label: <Link to="/form">基础表单</Link>},
    {key: 'chart', label: <Link to="/chart">echarts图表</Link>}
  ]

  const onSelect = () => {

  }
 
  const [expand, setExpand] = useState(true);
  const handleExpand = () => {
    setExpand(!expand);
  }

  return (
    <BrowserRouter >
      <div className="App">
        {/* 菜单 */}
        <div className='menu'>
          <div className='expand' onClick={handleExpand}>
            {!expand && <RightOutlined style={{color: "#40a9ff"}}/>}
            {expand && <LeftOutlined style={{color: "#40a9ff"}}/>}
          </div>
          {expand && <div>
            <Switch onChange={changeTheme} /> 更换菜单主题
          </div>
          }
          {expand && <Menu
            style={{
              width: 235,
            }}
            theme={theme}
            items={items}
            onSelect={onSelect}
          />}
        </div>

        {/* 页面 */}
        <div className='right'>
          <Routes>
            <Route path="/form" element={<Form />}/>
            <Route path="/chart" element={<Chart />}/>
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
