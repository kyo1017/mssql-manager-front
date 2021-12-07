/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { Table, Space, Button, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

function LogContent() {

    const [isLoading, setIsLoading] = React.useState(false);
    const [logData, setLogData] = React.useState([]);
    const [talbleHeight, setTableHeight] = React.useState(window.innerHeight-260);
    const [pagination, setPagenation] = React.useState({
        current: 1,
        pageSize: 10,
        position: ['bottomCenter', 'none']
    });

    React.useEffect(() => {
        setIsLoading(true);
        fetch(`${process.env.REACT_APP_API}/view-log`).then(res => res.json()).then((result) => {
            if (result.message === 'success') {
                setLogData(result.data);
                setIsLoading(false);
            }
        });
    }, []);

    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }}>
                <Input
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={confirm}
                    style={{ marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={confirm}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Search
                    </Button>
                    <Button onClick={clearFilters} size="small" style={{ width: 90 }}>
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({ closeDropdown: false });
                        }}
                    >
                        Filter
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
        onFilter: (value, record) =>
            record[dataIndex]
                ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
                : '',
    });

    const columns = [
        {
            title: 'Log Time',
            dataIndex: 'logTime',
            width: '15%',
            ...getColumnSearchProps('logTime')
        },
        {
            title: 'User Name',
            dataIndex: 'username',
            width: '15%',
            ...getColumnSearchProps('username')
        },
        {
            title: 'Table Name',
            dataIndex: 'tablename',
            width: '20%',
            ...getColumnSearchProps('tablename')
        },
        {
            title: 'Log Content',
            dataIndex: 'logContent',
            width: '50%',
            render: (_, elm) => (
                elm.action === 'create' ?
                <span><b>Created a new row</b> {elm.newContent}</span>
                : elm.action === 'update' ?
                <span><b>Updated a row from</b> {elm.oldContent} <b>to</b> {elm.newContent}</span>
                : elm.action === 'delete' ?
                <span><b>Deleted a row</b> {elm.oldContent}</span>
                : null
            ),
        }
    ]

    const handleResize = () => {
        setTableHeight(window.innerHeight-260);
    }
    
    window.addEventListener("resize", handleResize);

    const handleTableChange = (pagination) => {
        setPagenation(pagination);
    };

    return (
        <React.Fragment>
            <Table
                bordered
                rowKey="id"
                columns={columns}
                dataSource={logData}
                loading={isLoading}
                pagination={pagination}
                onChange={handleTableChange}
                scroll={{ y: talbleHeight }}
            />
        </React.Fragment>
    );
}

export default LogContent;
