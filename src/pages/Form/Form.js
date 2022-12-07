import React from 'react';
import { Button, Form, Input, Table, Space, message, Tree  } from 'antd';
import 'antd/dist/antd.min.css';
import './Form.scss';

const { Column } = Table;
const { Search } = Input;
var data = []
for (let i = 0; i < 100; i++) {
  data.push({
    key: i,
    name: `Edrward ${i}`,
    phone: `123xxxx${i}`,
    address: `London Park no. ${i}`,
  });
}

class FormSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: data,
      loading: false,
      page: {
        current: 1,
        pageSize: 10,
        total: 100
      },
      treeData: [{
        key: 1,
        title: '1',
        children:[{
          key: 11,
          title: '1-1',
        },{
          key: 12,
          title: '1-2',
        }]
      },{
        key: 2,
        title: '2',
      }]
    };
  }

  formRef = React.createRef();
  // 查询
  onFinish = (val) => {
    this.setState({
      loading: true
    })
    let arr = data.concat([])
    for(let item in val) {
      if (val[item]) {
        arr = arr.filter(i => i[item].includes(val[item]))
      }
    }
    setTimeout(() => {
      this.setState({
        data: arr,
        loading: false,
        page: {
          ...this.state.page,
          current: 1,
          total: arr.length
        }
      })
    },300)
    
  }
  onFinishFailed = () => {

  }
  OnReset = () => {
    this.formRef.current.resetFields();
  }
  // 表格change
  onChange = (pagination, filters, sorter, extra) => {
    console.group(pagination, filters, sorter, extra)
    this.setState({
      loading: true
    })
    setTimeout(() => {
      this.setState({
        loading: false,
        page: {
          ...this.state.page,
          current: pagination.current,
          pageSize: pagination.pageSize
        }
      })
    },300)
  }

  // 点击操作按钮
  action = (param) => {
    message.info(`姓名：${param.name}`);
  }

  onInputSearch () {
    message.info('宕机了')
  }

  render() {
    return (
      <div className="container">
        <div className='left'>
          <Search
            style={{
              marginBottom: 8,
            }}
            placeholder="请输入..."
            onSearch={this.onInputSearch}
          />
          <Tree
            treeData={this.state.treeData}
            defaultExpandAll={true}
          />
        </div>
        <div className='right'>
          <Form
            className="form"
            ref={this.formRef}
            name="basic"
            onFinish={this.onFinish}
            onFinishFailed={this.onFinishFailed}
            autoComplete="off"
            layout="inline"
          >
            <Form.Item
              label="姓名"
              name="name"
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="电话"
              name="phone"
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="地址"
              name="address"
            >
              <Input />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" style={{marginRight: '8px'}}>
                查询
              </Button>
              <Button htmlType="button" onClick={this.OnReset}>
                重置
              </Button>
            </Form.Item>
          </Form>

          <Table dataSource={this.state.data} onChange={this.onChange} loading={this.state.loading} scroll={{ y: 500 }} pagination={{
              position: ['none', 'bottomCenter'],
              current: this.state.page.current,
              pageSize: this.state.page.pageSize,
              total: this.state.page.total,
              showSizeChanger: true,
              showTotal: (total) => `共 ${total} 条`
            }}>
            <Column title="姓名" dataIndex="name" key="name" />
            <Column title="电话" dataIndex="phone" key="phone" />
            <Column title="地址" dataIndex="address" key="age" />
            <Column title="操作" dataIndex="ation" key="ation" render={(text, record, index) => (
              <Space size="middle">
                <Button onClick={() => this.action(record)}>操作1{text}</Button>
                <Button type="link">操作1{index}</Button>
              </Space>
            )}/>
          </Table>
        </div>
      </div>
    );
  }
}

export default FormSearch;
