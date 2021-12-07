/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { Form, Input, Button, notification, Popconfirm } from 'antd';

function PasswordForm() {

    const [form] = Form.useForm();

    const onFinish = (values) => {
        if (values.newPassword !== values.confirmPassword) {
            notification.warning({
                message: "Input Error",
                description: "Confirm Password must be same with new password.",
                placement: 'topRight'
            });
        }
        else {
            fetch(`${process.env.REACT_APP_API}/change-password`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({...values, user: localStorage.getItem('user')})
            }).then(res => res.json()).then((result) => {
                if(result.message === 'Change Success') {
                    notification.info({
                        message: result.message,
                        description: result.description,
                        placement: 'topRight'
                    });
                    form.resetFields();
                } else {
                    notification.warning({
                        message: result.message,
                        description: result.description,
                        placement: 'topRight'
                    });
                }
            });
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Form
            form={form}
            labelCol={{ span: 9 }}
            wrapperCol={{ span: 9 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            style={{
                padding: '75px 20px 50px 20px'
            }}
        >
            <Form.Item
                label="Old Password"
                name="oldPassword"
                rules={[{ required: true, message: 'Please input your old password!' }]}
            >
                <Input.Password size='large' />
            </Form.Item>

            <Form.Item
                label="New Password"
                name="newPassword"
                rules={[{ required: true, message: 'Please input your new password!' }]}
            >
                <Input.Password size='large' />
            </Form.Item>

            <Form.Item
                label="Confirm Password"
                name="confirmPassword"
                rules={[{ required: true, message: 'Please input your confirm password!' }]}
            >
                <Input.Password size='large' />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 9, span: 9 }}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
}

export default PasswordForm;
