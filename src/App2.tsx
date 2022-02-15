import { Button, Col, DatePicker, Form, Input, InputNumber, List, message, Radio, Row, Select, } from "antd";
import locale from "antd/lib/date-picker/locale/en_US";
import FormItem from "antd/lib/form/FormItem";
import { Option } from "antd/lib/mentions";
import { type } from "os";
import { listenerCount } from "process";
import { FC, useState } from "react";
import { Controller, SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { Value } from "sass";
import "./App2.scss";

type FormValues = {
  sell: {
    infomation: {
      user: {
        no: number,
        name: string,
      }
      applyGroup: string,
      applyLevel: string,
      applyType: string,
      datePickerPlanFrom: Date,
      datePickerPlanTo: Date,
      datePickerReality: Date,
    }
    salesDiscountItems: {
      product: string
      productionUnit: string
      rootPriceUSA: string
      rootPriceVND: string
      qty: number
      currencyUnit: string
      fixedPriceUSD: number
      fixedPriceVND: number
      discountPercent: number
      note: string;
    }
  }[];
}


const App2: FC = () => {

  const { register, control, handleSubmit, formState: { errors } } = useForm<FormValues>({
    defaultValues: {
      sell: [{}]
    }
  })

  const { fields, append } = useFieldArray({
    control,
    name: "sell",
  })

  const onSubmit = (data: FormValues) => {
    const values = {
      ...data,
      // 'datePickerFrom': data.sell.map(x => x.infomation.datePickerFrom.getDate),
      // datePickerFrom.format('DD-MM-YYYY'),

    }
    console.log(values);
  }
  console.log("Errors:", errors);


  // const onFinish = (data: FormValues) => {
  //   // const values = {
  //   //   ...data,
  //   //   // 'datePickerFrom': data['datePickerFrom'].format('DD-MM-YYYY'),
  //   //   // 'datePickerTo': data['datePickerTo'].format('DD-MM-YYYY'),
  //   //   // 'date-picker-from': fieldsValue['date-picker-from'],
  //   //   // 'date-picker-to': fieldsValue['date-picker-to'],
  //   // }
  //   // console.log('Object',JSON.stringify(values));
  //   console.log(data);
  //   // alert( JSON.stringify(values));
  // };

  const validateMessages = {
    required: 'Trường ${label} là bắt buộc!',
    types: {
      email: '${label} is not a valid email!',
      number: '${label} is not a valid number!',
    },
    number: {
      range: '${label} must be between ${min} and ${max}',
    },
  };

  const data = [
    {
      // title: 'Title 1',
    },
  ];


  const discountPolicyForm = () => {
    return (
      <div className="">
        <List.Item style={{ display: 'block' }}>
          <Row className="header-name-permission">
            <Col span={1} style={{ textAlign: 'center' }}>
              STT
            </Col>
            <Col span={3}>Sản phẩm</Col>
            <Col span={2}>Đơn vị sản xuất</Col>
            <Col span={2}>Giá gốc (VND)</Col>
            <Col span={2}>Giá gốc (USD)</Col>
            <Col span={2}>Số lượng mua từ</Col>
            <Col span={2}>Đơn vị tiền tệ</Col>
            <Col span={2}>Giá cố định (VND)</Col>
            <Col span={2}>Giá cố định (USD)</Col>
            <Col span={2}>Chiết khấu (%)</Col>
            <Col span={2}>Ghi chú</Col>
            <Col span={2} style={{ textAlign: 'center' }}>
              Thao tác
            </Col>
          </Row>
        </List.Item>
        <List
          dataSource={data ?? []}
          renderItem={(item, index) => {
            return (
              <List.Item >
                <Row style={{ width: '100%' }}>
                  <Col span={1} style={{ textAlign: 'center' }}>
                    {index + 1}
                  </Col>
                  <Col span={3}>
                    <Form.Item
                      // name={[`salesDiscountItems[${index}].product`, 'value']}
                      rules={[
                        {
                          required: true,
                          message: 'Trường này là bắt buộc',
                        },
                      ]}
                    >
                      <Controller
                        rules={{required: {value: true, message: 'Trường này không được để trống!'}}}
                        control={control}
                        name={`sell.${index}.salesDiscountItems.product`}
                        render={({ field }) => (
                          <Select
                            // disabled={isDetailPage}
                            {...field}
                            className="input-select"
                            allowClear
                            style={{ width: '100%' }}
                            placeholder="Chọn"
                          >
                            <Select.Option value="47">Đắk Lắk</Select.Option>
                            <Select.Option value="43">Đà Nẵng</Select.Option>
                          </Select>
                        )}
                      />
                      {<span style={{ color: 'red', display: 'block' }}>{errors.sell?.map(x => x.salesDiscountItems?.product?.message)}</span>}
                    </Form.Item>
                  </Col>
                  <Col span={2}>
                    <Form.Item
                    // name={[`salesDiscountItems[${index}]`, 'productionUnit']}
                    >
                      <Controller
                        control={control}
                        name={`sell.${index}.salesDiscountItems.productionUnit`}
                        render={({ field }) => (
                          <Input disabled {...field} />
                        )}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={2}>
                    <Form.Item
                    // name={[`salesDiscountItems[${index}]`, 'rootPriceVND']}
                    >
                      <Controller
                        control={control}
                        name={`sell.${index}.salesDiscountItems.rootPriceVND`}
                        render={({ field }) => (
                          <InputNumber {...field} disabled formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} />
                        )}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={2}>
                    <Form.Item
                    // name={[`salesDiscountItems[${index}]`, 'rootPriceUSA']}
                    >
                      <Controller
                        control={control}
                        name={`sell.${index}.salesDiscountItems.rootPriceUSA`}
                        render={({ field }) => (
                          <InputNumber {...field} disabled formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} />
                        )}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={2}>
                    <Form.Item
                      // name={[`salesDiscountItems[${index}]`, 'qty']}
                      rules={[
                        {
                          required: true,
                          message: 'Trường này là bắt buộc',
                        },
                        {
                          type: 'number',
                          min: 1,
                          message: 'Giá trị phải lớn hơn 0',
                        },
                      ]}
                    >
                      <Controller
                        control={control}
                        name={`sell.${index}.salesDiscountItems.qty`}
                        render={({ field }) => (
                          <InputNumber min={0} {...field}
                          />
                        )}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={2}>
                    <FormItem
                      // name={[`salesDiscountItems[${index}].currencyUnit`, 'value']}
                      rules={[
                        {
                          required: true,
                          message: 'Trường này là bắt buộc',
                        },
                      ]}
                    >
                      <Controller
                        control={control}
                        name={`sell.${index}.salesDiscountItems.currencyUnit`}
                        render={({ field }) => (
                          <Select
                            // disabled={isDetailPage}
                            {...field}
                            className="input-select"
                            style={{ width: '100%' }}
                          // onChange={value => changeCurrencyUnitItem(index, value?.toString() || '')}
                          >
                            <Select.Option value="VN">VND</Select.Option>
                            <Select.Option value="US">USA</Select.Option>
                          </Select>
                        )}
                      />
                    </FormItem>
                  </Col>
                  <Col span={2}>
                    <FormItem
                      // name={[`salesDiscountItems[${index}]`, 'fixedPriceVND']}
                      rules={[
                        {
                          required: true,
                          message: 'Trường này là bắt buộc',
                        },
                      ]}
                    >
                      <Controller
                        control={control}
                        name={`sell.${index}.salesDiscountItems.fixedPriceVND`}
                        render={({ field }) => (
                          <InputNumber {...field}
                            formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                          />
                        )}
                      />
                    </FormItem>
                  </Col>
                  <Col span={2}>
                    <FormItem
                      // name={[`salesDiscountItems[${index}]`, 'fixedPriceUSD']}
                      rules={[
                        {
                          required: true,
                          message: 'Trường này là bắt buộc'
                        },
                      ]}
                    >
                      <Controller
                        control={control}
                        name={`sell.${index}.salesDiscountItems.fixedPriceUSD`}
                        render={({ field }) => (
                          <InputNumber {...field}
                            formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                          />
                        )}
                      />
                    </FormItem>
                  </Col>
                  <Col span={2}>
                    <FormItem
                    // name={[`salesDiscountItems[${index}]`, 'discountPercent']}
                    >
                      <Controller
                        control={control}
                        name={`sell.${index}.salesDiscountItems.discountPercent`}
                        render={({ field }) => (
                          <InputNumber disabled={true} {...field} />
                        )}
                      />
                    </FormItem>
                  </Col>
                  <Col span={2}>
                    <FormItem
                    // name={[`salesDiscountItems[${index}]`, 'note']}
                    >
                      <Controller
                        control={control}
                        name={`sell.${index}.salesDiscountItems.note`}
                        render={({ field }) => (
                          <Input {...field} />
                        )}
                      />
                    </FormItem>
                  </Col>
                  <Col span={2}>
                    {
                      <div style={{ display: 'flex', justifyContent: 'center' }}>
                        {/* <Button
                          className="btn-circle"
                          style={{
                            display: 'flex',
                            visibility: listSalesDiscountItems.length > 1 ? 'visible' : 'hidden',
                          }}
                          onClick={() => removeItem(index)}
                        >
                          <MinusOutlined />
                        </Button> */}
                        <div style={{ width: '1rem' }}></div>
                        <Button className="btn-circle" htmlType="button" onClick={() => append({
                          // salesDiscountItems: {
                          //   product: '', 
                          //   productionUnit: '', 
                          //   rootPriceUSA: '',
                          //   rootPriceVND: '',
                          //   qty: 0,
                          //   currencyUnit: '',
                          //   fixedPriceUSD: 0,
                          //   fixedPriceVND: 0,
                          //   discountPercent: 0,
                          //   note: ''
                          // }
                        })} >
                          +
                        </Button>
                      </div>
                    }
                  </Col>
                </Row>
              </List.Item>
            );
          }}
        />
      </div>
    )
  }


  return (
    <div className="form-create" >
      <div className="header">
        <div className="d-flex justify-content-between align-items-center">
          <h4 className="fz-26">Tạo mới chính sách chiết khấu</h4>
          <button className="btn">Hủy thao tác</button>
        </div>
        <span className="nofitication">thông tin chi tiết</span>
      </div>
      <div className="content my-4">
        <Row>
          <Col span={24}>
            <Form onFinish={handleSubmit(onSubmit)} className="form" name="nest-messages" validateMessages={validateMessages}>
              {fields.map((field, index) => {
                return (
                  <div className="row" key={field.id}>
                    <section className="col-6" key={field.id}>
                      <Form.Item className="d-flex" label="Mã CSCK" >
                        <Controller
                          rules={{
                            required: { value: true, message: ' trường này không được để trống!' },
                            maxLength: { value: 20, message: 'không quá 20 kí tự!' },
                          }}
                          name={`sell.${index}.infomation.user.no`}
                          control={control}
                          render={({ field }) => (
                            <Input {...field} type={'text'} className="border-radius" />
                          )}
                        />
                        {<span style={{ color: 'red', display:'block' }}>{errors.sell?.map(x=>x.infomation?.user?.no?.message)}</span> }
                      </Form.Item>
                      <Form.Item className="d-flex my-3" label="Tên CSCK">
                        <Controller
                          rules={{
                            required: { value: true, message: ' trường này không được để trống!' },
                            maxLength: { value: 30, message: 'không quá 30 kí tự!' },
                          }}
                          name={`sell.${index}.infomation.user.name`}
                          control={control}
                          render={({ field }) => (
                            <Input {...field} type={'text'} className="border-radius" />
                          )}
                        />
                        {<span style={{ color: 'red', display: 'block' }}>{errors.sell?.map(x => x.infomation?.user?.name?.message)}</span>}
                      </Form.Item>
                      <Form.Item className="d-flex my-3" label="Áp dụng cho" rules={[{ required: true }]}>
                        <Controller
                          rules={{
                            required: { value: true, message: ' trường này không được để trống!' }
                          }}
                          name={`sell.${index}.infomation.applyGroup`}
                          control={control}
                          render={({ field }) => (
                            <Radio.Group {...field} size="middle" >
                              <Radio value="Nhà phân phối">Nhà phân phối (NPP)</Radio>
                              <Radio value="Đại lý">Đại lý</Radio>
                            </Radio.Group>
                          )}
                        />
                        {<span style={{ color: 'red', display: 'block' }}>{errors.sell?.map(x => x.infomation?.applyGroup?.message)}</span>}
                      </Form.Item>
                      <Form.Item
                        label="Hạng áp dụng"
                        // hasFeedback
                        // rules={[{ required: true, message: 'Vui lòng chọn hạng áp dụng!' }]}
                      >
                        <Controller
                          rules={{
                            required: { value: true, message: ' trường này không được để trống!' }
                          }}
                          name={`sell.${index}.infomation.applyLevel`}
                          control={control}
                          render={({ field }) => (
                            <Select
                              {...field}
                              // {...register(`sell.${index}.infomation.applyLevel` as const)}
                              className="border-radius"
                              showSearch={true}
                              allowClear={true}
                              // disabled
                              placeholder="Chọn hạng áp dụng">
                              <Select.Option value="Normal">Thông thường</Select.Option>
                              <Select.Option value="Gold">Vàng</Select.Option>
                              <Select.Option value="Silver">Bạc</Select.Option>
                              <Select.Option value="Bronze">Đồng</Select.Option>
                            </Select>
                          )}
                        />
                        {<span style={{ color: 'red', display: 'block' }}>{errors.sell?.map(x => x.infomation?.applyLevel?.message)}</span>}
                      </Form.Item>
                      <Form.Item
                        label="Loại áp dụng"
                        // hasFeedback
                        // rules={[{ required: true, message: 'Vui lòng chọn loại áp dụng!' }]}
                      >
                        <Controller
                          rules={{
                            required: { value: true, message: ' trường này không được để trống!' }
                          }}
                          name={`sell.${index}.infomation.applyType`}
                          control={control}
                          render={({ field }) => (
                            <Select
                              {...field}
                              // {...register(`sell.${index}.infomation.applyType` as const)}
                              className="border-radius"
                              showSearch={true}
                              allowClear={true}
                              placeholder="Chọn loại áp dụng">
                              <Select.Option value="typeOfSim">Loại
                                Sim</Select.Option>
                              <Select.Option value="packageData">Gói Data</Select.Option>
                            </Select>
                          )}
                        />
                        {<span style={{ color: 'red', display: 'block' }}>{errors.sell?.map(x => x.infomation?.applyType?.message)}</span>}
                      </Form.Item>
                      <Form.Item
                        label="Hiệu lực (kế hoạch)"
                        // hasFeedback
                        // rules={[{ required: true }]}
                        >
                        <Controller
                          rules={{
                            required: { value: true, message: ' trường này không được để trống!' }
                          }}
                          name={`sell.${index}.infomation.datePickerPlanFrom`}
                          control={control}
                          render={({ field: { onBlur, onChange, value, ref } }) => (
                            <DatePicker locale={locale} onChange={onChange} onBlur={onBlur} className="border-radius" format="DD/MM/YYYY" placeholder="Từ: dd/mm/yyyy" />
                          )}
                        />
                        {<span style={{ color: 'red', display: 'block' }}>{errors.sell?.map(x => x.infomation?.datePickerPlanFrom?.message)}</span>}
                      </Form.Item>
                      <Form.Item
                        name="datePickerTo"
                        label="."
                      // hasFeedback
                      // rules={[{ required: true }]}
                      >
                        <Controller
                          rules={{
                            required: { value: true, message: ' trường này không được để trống!' }
                          }}
                          name={`sell.${index}.infomation.datePickerPlanTo`}
                          control={control}
                          render={({ field: { onBlur, onChange, value, ref } }) => (
                            <DatePicker locale={locale} onChange={onChange} onBlur={onBlur} className="border-radius" format="DD/MM/YYYY" placeholder="Từ: dd/mm/yyyy" />
                          )}
                        />
                        {<span style={{ color: 'red', display: 'block' }}>{errors.sell?.map(x => x.infomation?.datePickerPlanTo?.message)}</span>}
                      </Form.Item>
                      <Form.Item
                        label="Hiệu lực (thực tế)"
                        hasFeedback
                        rules={[{ required: true }]}>
                        <Controller
                          name={`sell.${index}.infomation.datePickerReality`}
                          control={control}
                          render={({ field: { onBlur, onChange, value, ref } }) => (
                            <DatePicker disabled locale={locale} onChange={onChange} onBlur={onBlur} className="border-radius" format="DD/MM/YYYY" placeholder="Từ: dd/mm/yyyy" />
                          )}
                        />
                      </Form.Item>
                    </section>
                    <section className="col-6">
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
                    </section>
                    <div className="" style={{ borderBottom: '1px solid #ccc' }}>
                      <span className="nofitication">Chính sách chiếu khấu (cấu hình giá) (*)</span>
                    </div>
                    <div className="">{discountPolicyForm()}</div>
                    <div className="footer" style={{ textAlign: 'right' }}>
                      <button className="btn">Xóa và điền lại</button>
                      <Button className="btn mx-4" htmlType="submit">Lưu thông tin</Button>
                      <button className="btn">Ban hành</button>
                    </div>
                  </div>
                );
              })}
            </Form>
          </Col>
        </Row>
      </div>

      {/* <ModalAlertClearForm></ModalAlertClearForm> */}
    </div>
  );
}

export default App2;