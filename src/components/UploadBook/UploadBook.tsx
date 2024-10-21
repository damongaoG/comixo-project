import React, {useState} from "react";
import {Form, Input, Upload, Image, GetProp, UploadProps, UploadFile} from "antd";
import './UploadBook.css';
import TextArea from "antd/es/input/TextArea";
import { PlusOutlined } from '@ant-design/icons';


type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const normFile = (e: any) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });



const UploadBook: React.FC = () => {
  const [previewOpen, setPreviewOpen] = React.useState(false);
  const [previewImage, setPreviewImage] = React.useState('');
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  }

  const handleChange: UploadProps['onChange'] = ({fileList: newFileList}) =>
    setFileList(newFileList);

  const uploadButton = (
    <button style={{border: 0, background: 'none'}} type="button">
      <PlusOutlined/>
      <div style={{marginTop: 8}}>Upload</div>
    </button>
  )

  return (
    <section className="upload-book" id="upload-book">
      <div id="backtotop">
        <a href="#upload-book" id="backtotop-value">
        <i className="fa-solid fa-arrow-up"></i>
        </a>
      </div>
      <Form
        labelCol={{span: 4}}
        wrapperCol={{span: 14}}
        layout="horizontal"
      >
        <Form.Item label="Book Name" name="bookName" rules={[{required: true, message: 'Please input!'}]}>
          <Input/>
        </Form.Item>

        <Form.Item label="Introduction">
          <TextArea rows={4}/>
        </Form.Item>

        <Form.Item label="Upload Cover Image" valuePropName="fileList" getValueFromEvent={normFile}>
          <Upload
            action="/upload.do"
            listType="picture-card"
            fileList={fileList}
            onPreview={handlePreview}
            onChange={handleChange}
            maxCount={1}
          >
            {uploadButton}
          </Upload>
          {previewImage && (
            <Image
              wrapperStyle={{ display: 'none' }}
              preview={{
                visible: previewOpen,
                onVisibleChange: (visible) => setPreviewOpen(visible),
                afterOpenChange: (visible) => !visible && setPreviewImage(''),
              }}
              src={previewImage}
            />
          )}
        </Form.Item>
      </Form>
    </section>
  )
};

export default UploadBook;
