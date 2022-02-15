import { Button, Col, DatePicker, Form, Input, Radio, Row, Select } from "antd";
import { FC, useEffect } from "react"
import { useForm, Controller } from 'react-hook-form';
import { Option } from "antd/lib/mentions";
import './App3.scss'

export interface FormValues {
  id: string;
  name: any;
  applyGroup: any;
  applyLevel: string;
  applytype: string;
  dateFrom: Date;
  dateTo: Date;
}

const App3: FC = () => {

  const { handleSubmit, control, setFocus, formState: { errors } } = useForm<FormValues>();

  const onSubmit = (data: FormValues) => {
    console.log(data);
  }

  useEffect(() => {
    setFocus('id');
  }, [setFocus])

  return (
    <div className="form-create">
      <div className="header">
        <div className="d-flex justify-content-between align-items-center">
          <h4 className="fz-26">Tạo mới chính sách chiết khấu</h4>
          <button className="btn">Hủy thao tác</button>
        </div>
        <span className="nofitication">thông tin chi tiết</span>
      </div>
      <div className="content my-4">
        <Row>
          <Col span={14}>
            <Form onFinish={handleSubmit(onSubmit)} >
              <Row>
                <Col>
                  <span>Mã CSCK</span>
                </Col>
                <Col>
                  <Controller
                    name="id"
                    // defaultValue=''
                    control={control}
                    rules={{
                      required: { value: true, message: ' trường này không được để trống' },
                      maxLength: { value: 20, message: 'không quá 20 kí tự' },
                    }}
                    render={({ field }) => <Input {...field} placeholder="Mã CSCK"></Input>}
                  />
                  {errors?.id?.type == 'required' && <span style={{ color: 'red' }}>{errors?.id.message}</span>}
                  {errors?.id?.type == 'maxLength' && <span style={{ color: 'red' }}>{errors?.id?.message}</span>}
                </Col>
              </Row>
              <Row>
                <Col>
                  <span>Tên CSCK</span>
                </Col>
                <Col>
                  <Controller
                    name="name"
                    // defaultValue=''
                    control={control}
                    rules={{
                      required: { value: true, message: ' trường này không được để trống' },
                      maxLength: { value: 20, message: 'không quá 20 kí tự' },
                    }}
                    render={({ field }) => <Input {...field} placeholder="Tên CSCK"></Input>}
                  />
                  {errors?.name?.type == 'required' && <span style={{ color: 'red' }}>{errors?.name?.message}</span>}
                  {errors?.name?.type == 'maxLength' && <span style={{ color: 'red' }}>{errors?.name?.message}</span>}
                </Col>
              </Row>
              <Row>
                <Col>
                  <span>Áp dụng cho</span>
                </Col>
                <Col>
                  <Controller
                    name="applyGroup"
                    // defaultValue=''
                    control={control}
                    rules={{
                      required: { value: true, message: ' trường này không được để trống' },
                      maxLength: { value: 20, message: 'không quá 20 kí tự' },
                    }}
                    render={({ field }) => <Radio.Group {...field} size="middle" >
                      <Radio value="Nhà phân phối">Nhà phân phối (NPP)</Radio>
                      <Radio value="Đại lý">Đại lý</Radio>
                    </Radio.Group>}
                  />
                  {errors?.applyGroup?.type == 'required' && <span style={{ color: 'red' }}>{errors?.applyGroup.message}</span>}
                  {errors?.applyGroup?.type == 'maxLength' && <span style={{ color: 'red' }}>{errors?.applyGroup?.message}</span>}
                </Col>
              </Row>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form>
          </Col>
          <Col span={10}>
            <div className="row">
              <div className="col-4">
                <p>Trạng thái:</p>
              </div>
              <div className="col-8">
                <p>Nguyễn Tân Tiến</p>
              </div>
            </div>
            <div className="row mt-4">
              <div className="col-4">
                <p>Ngày tạo:</p>
              </div>
              <div className="col-8">
                <p>19/01/2022</p>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-4">
                <p>Người tạo:</p>
              </div>
              <div className="col-8">
                <p>Nguyễn Tân Tiến</p>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-4">
                <p>Ghi chú:</p>
              </div>
              <div className="col-8">
                <textarea className="" style={{ width: '100%', height: '5rem' }}></textarea>
              </div>
            </div>
          </Col>
        </Row>
      </div>
      <div className="" style={{ borderBottom: '1px solid #ccc' }}>
        <span className="nofitication">Chính sách chiếu khấu (cấu hình giá) (*)</span>
      </div>
      <div className="footer" style={{ textAlign: 'right' }}>
        <button className="btn">Xóa và điền lại</button>
        <Button className="btn mx-4" htmlType="submit">Lưu thông tin</Button>
        <button className="btn">Ban hành</button>
      </div>
    </div>
  )
}

export default App3;