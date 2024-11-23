import React, { useState } from "react";
import { Form, Input, Upload, Image, GetProp, UploadProps, UploadFile, Button, message } from "antd";
import './UploadBook.css';
import TextArea from "antd/es/input/TextArea";
import { ResultBook } from "../../types/result-book";
import { BookDto } from "../../types/boo-dto";



const UploadBook: React.FC = () => {
  const url = process.env.REACT_APP_BOOK_URL!;
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: BookDto) => {
    setLoading(true);
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(values),
      });
      const result: ResultBook = await response.json();
      if (result.code === 1) {
        message.success('Create book success');
        form.resetFields();
      } else {
        message.error('Create book failed');
      }
    } catch (error) {
      console.error('Create book error:', error);
      message.error('Create book failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="upload-book" id="upload-book">
      <div id="backtotop">
        <a href="#upload-book" id="backtotop-value">
          <i className="fa-solid fa-arrow-up"></i>
        </a>
      </div>
      <Form
        form={form}
        layout="horizontal"
        onFinish={onFinish}
        clearOnDestroy={true}
        style={{ padding: '1rem' }}
      >
        <Form.Item<BookDto>
          label="Title"
          name="title"
          rules={[{ required: true, message: 'Please input your title!' }]}>
          <Input />
        </Form.Item>
        <Form.Item<BookDto>
          label="Description"
          name="description"
        >
          <TextArea
            showCount
            maxLength={500}
            placeholder="Despcription"
            style={{ height: 120, resize: 'none' }}
          />
        </Form.Item>
        <Form.Item<BookDto>
          label={'Image URL'}
          name={'imageURL'}
        >
          <Input />
        </Form.Item>
        <Form.Item<BookDto>
          label={'Download URL'}
          name={'downloadURL'}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" disabled={loading} loading={loading}>Submit</Button>
        </Form.Item>
      </Form>
    </section>
  )
};

export default UploadBook;
