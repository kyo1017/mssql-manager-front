/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { Table, Space, Button, Input, Popconfirm } from 'antd';
import { SearchOutlined, DeleteOutlined } from '@ant-design/icons';

function UserContent() {

    const [isLoading, setIsLoading] = React.useState(false);
    const [userData, setUserData] = React.useState([]);
    const [talbleHeight, setTableHeight] = React.useState(window.innerHeight - 260);
    const [pagination, setPagenation] = React.useState({
        current: 1,
        pageSize: 10,
        position: ['bottomCenter', 'none']
    });

    const getUsers = () => {
        setIsLoading(true);
        fetch(`${process.env.REACT_APP_API}/get-users`).then(res => res.json()).then((result) => {
            if (result.message === 'success') {
                setUserData(result.data);
                setIsLoading(false);
            }
        });
    }

    const deleteUser = (id) => {
        setIsLoading(true);
        fetch(`${process.env.REACT_APP_API}/delete-user`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id })
        }).then(res => res.json()).then((result) => {
            if (result.message === 'success') {
                getUsers();
            }
        });
    }

    React.useEffect(() => {
        getUsers();
    }, []);

    const tableSorter = (a, b, key) => {
        if (typeof a[key] === 'number' && typeof b[key] === 'number') {
            return a[key] - b[key];
        }
        if (typeof a[key] === 'string' && typeof b[key] === 'string') {
            a = a[key].toLowerCase();
            b = b[key].toLowerCase();
            return a > b ? -1 : b > a ? 1 : 0;
        }
        return 0;
    }

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
            key: 'username',
            title: 'User Name',
            dataIndex: 'username',
            sorter: (a, b) => tableSorter(a, b, 'username'),
            ...getColumnSearchProps('username')
        },
        {
            key: 'email',
            title: 'Email',
            dataIndex: 'email',
            sorter: (a, b) => tableSorter(a, b, 'email'),
            ...getColumnSearchProps('email')
        },
        {
            key: 'action',
            title: 'Action',
            dataIndex: 'action',
            render: (_, elm) => (
                <Popconfirm
                    placement="left"
                    title="Are you deleting this row?"
                    onConfirm={() => { deleteUser(elm.id) }}
                    okText="Yes"
                    cancelText="No"
                >
                    <Button type="text" danger size="small" icon={<DeleteOutlined />}>Delete</Button>
                </Popconfirm>
            )
        }
    ]

    const handleResize = () => {
        setTableHeight(window.innerHeight - 260);
    }

    window.addEventListener("resize", handleResize);

    const handleTableChange = (pagination) => {
        setPagenation(pagination);
    };

    return (
        <React.Fragment>
            <Table
                className="user-table"
                bordered
                rowKey="id"
                columns={columns}
                dataSource={userData}
                loading={isLoading}
                pagination={pagination}
                onChange={handleTableChange}
                scroll={{ y: talbleHeight }}
            />
        </React.Fragment>
    );
}

export default UserContent;
