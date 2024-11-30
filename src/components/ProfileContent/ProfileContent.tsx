import React, {useContext, useEffect, useState} from 'react';
import {Button, Form, Input, message} from 'antd';
import {AuthContext} from '../../AuthContext';
import {ResultUserProfile} from '../../types/result-user-profile';

const ProfileContent: React.FC = () => {
  const {userEmail, userNickname, userId, setUserNickname} = useContext(AuthContext);
  const [form] = Form.useForm();
  const [userProfile, setUserProfile] = useState<ResultUserProfile | null>(null);
  const [isNicknameChanged, setIsNicknameChanged] = useState(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_USER_PROFILE_URL}/by/user-id/${userId}`, {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        });
        const data: ResultUserProfile = await response.json();

        if (data.code === 1) {
          setUserProfile(data);
          // set form fields value
          form.setFieldsValue({
            email: userEmail,
            nickName: userNickname,
            integral: data.data.integral,
          });
        } else {
          message.error(data.error?.message || 'Failed to fetch user profile');
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
        message.error('Failed to fetch user profile');
      }
    };

    fetchUserProfile();
  }, [userEmail, userNickname, form]);

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newNickname = e.target.value;
    setIsNicknameChanged(newNickname !== userNickname);
  };

  const handleUpdate = async () => {
    try {
      const values = await form.validateFields();
      const response = await fetch(`${process.env.REACT_APP_USER_URL}`, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: userId,
          nickName: values.nickName
        })
      });

      const data = await response.json();
      if (data.code === 1) {
        message.success('Profile updated successfully');
        setIsNicknameChanged(false);
        setUserNickname(values.nickName);
      } else {
        message.error(data.error?.message || 'Failed to update profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      message.error('Failed to update profile');
    }
  };

  return (
    <div>
      <h2>Profile Information</h2>
      <Form
        form={form}
        name="profile"
        layout="vertical"
        style={{maxWidth: 600}}
      >
        <Form.Item
          label="User name"
          name="nickName"
        >
          <Input onChange={handleNicknameChange}/>
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
        >
          <Input disabled/>
        </Form.Item>

        <Form.Item
          label="Integral"
          name="integral"
        >
          <Input disabled/>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            onClick={handleUpdate}
            disabled={!isNicknameChanged}
          >
            Update
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ProfileContent;
