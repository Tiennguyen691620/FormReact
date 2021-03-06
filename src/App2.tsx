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
    required: 'Tr?????ng ${label} l?? b???t bu???c!',
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
            <Col span={3}>S???n ph???m</Col>
            <Col span={2}>????n v??? s???n xu???t</Col>
            <Col span={2}>Gi?? g???c (VND)</Col>
            <Col span={2}>Gi?? g???c (USD)</Col>
            <Col span={2}>S??? l?????ng mua t???</Col>
            <Col span={2}>????n v??? ti???n t???</Col>
            <Col span={2}>Gi?? c??? ?????nh (VND)</Col>
            <Col span={2}>Gi?? c??? ?????nh (USD)</Col>
            <Col span={2}>Chi???t kh???u (%)</Col>
            <Col span={2}>Ghi ch??</Col>
            <Col span={2} style={{ textAlign: 'center' }}>
              Thao t??c
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
                          message: 'Tr?????ng n??y l?? b???t bu???c',
                        },
                      ]}
                    >
                      <Controller
                        rules={{required: {value: true, message: 'Tr?????ng n??y kh??ng ???????c ????? tr???ng!'}}}
                        control={control}
                        name={`sell.${index}.salesDiscountItems.product`}
                        render={({ field }) => (
                          <Select
                            // disabled={isDetailPage}
                            {...field}
                            className="input-select"
                            allowClear
                            style={{ width: '100%' }}
                            placeholder="Ch???n"
                          >
                            <Select.Option value="47">?????k L???k</Select.Option>
                            <Select.Option value="43">???? N???ng</Select.Option>
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
                          message: 'Tr?????ng n??y l?? b???t bu???c',
                        },
                        {
                          type: 'number',
                          min: 1,
                          message: 'Gi?? tr??? ph???i l???n h??n 0',
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
                          message: 'Tr?????ng n??y l?? b???t bu???c',
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
                          message: 'Tr?????ng n??y l?? b???t bu???c',
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
                          message: 'Tr?????ng n??y l?? b???t bu???c'
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
          <h4 className="fz-26">T???o m???i ch??nh s??ch chi???t kh???u</h4>
          <button className="btn">H???y thao t??c</button>
        </div>
        <span className="nofitication">th??ng tin chi ti???t</span>
      </div>
      <div className="content my-4">
        <Row>
          <Col span={24}>
            <Form onFinish={handleSubmit(onSubmit)} className="form" name="nest-messages" validateMessages={validateMessages}>
              {fields.map((field, index) => {
                return (
                  <div className="row" key={field.id}>
                    <section className="col-6" key={field.id}>
                      <Form.Item className="d-flex" label="M?? CSCK" >
                        <Controller
                          rules={{
                            required: { value: true, message: ' tr?????ng n??y kh??ng ???????c ????? tr???ng!' },
                            maxLength: { value: 20, message: 'kh??ng qu?? 20 k?? t???!' },
                          }}
                          name={`sell.${index}.infomation.user.no`}
                          control={control}
                          render={({ field }) => (
                            <Input {...field} type={'text'} className="border-radius" />
                          )}
                        />
                        {<span style={{ color: 'red', display:'block' }}>{errors.sell?.map(x=>x.infomation?.user?.no?.message)}</span> }
                      </Form.Item>
                      <Form.Item className="d-flex my-3" label="T??n CSCK">
                        <Controller
                          rules={{
                            required: { value: true, message: ' tr?????ng n??y kh??ng ???????c ????? tr???ng!' },
                            maxLength: { value: 30, message: 'kh??ng qu?? 30 k?? t???!' },
                          }}
                          name={`sell.${index}.infomation.user.name`}
                          control={control}
                          render={({ field }) => (
                            <Input {...field} type={'text'} className="border-radius" />
                          )}
                        />
                        {<span style={{ color: 'red', display: 'block' }}>{errors.sell?.map(x => x.infomation?.user?.name?.message)}</span>}
                      </Form.Item>
                      <Form.Item className="d-flex my-3" label="??p d???ng cho" rules={[{ required: true }]}>
                        <Controller
                          rules={{
                            required: { value: true, message: ' tr?????ng n??y kh??ng ???????c ????? tr???ng!' }
                          }}
                          name={`sell.${index}.infomation.applyGroup`}
                          control={control}
                          render={({ field }) => (
                            <Radio.Group {...field} size="middle" >
                              <Radio value="Nh?? ph??n ph???i">Nh?? ph??n ph???i (NPP)</Radio>
                              <Radio value="?????i l??">?????i l??</Radio>
                            </Radio.Group>
                          )}
                        />
                        {<span style={{ color: 'red', display: 'block' }}>{errors.sell?.map(x => x.infomation?.applyGroup?.message)}</span>}
                      </Form.Item>
                      <Form.Item
                        label="H???ng ??p d???ng"
                        // hasFeedback
                        // rules={[{ required: true, message: 'Vui l??ng ch???n h???ng ??p d???ng!' }]}
                      >
                        <Controller
                          rules={{
                            required: { value: true, message: ' tr?????ng n??y kh??ng ???????c ????? tr???ng!' }
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
                              placeholder="Ch???n h???ng ??p d???ng">
                              <Select.Option value="Normal">Th??ng th?????ng</Select.Option>
                              <Select.Option value="Gold">V??ng</Select.Option>
                              <Select.Option value="Silver">B???c</Select.Option>
                              <Select.Option value="Bronze">?????ng</Select.Option>
                            </Select>
                          )}
                        />
                        {<span style={{ color: 'red', display: 'block' }}>{errors.sell?.map(x => x.infomation?.applyLevel?.message)}</span>}
                      </Form.Item>
                      <Form.Item
                        label="Lo???i ??p d???ng"
                        // hasFeedback
                        // rules={[{ required: true, message: 'Vui l??ng ch???n lo???i ??p d???ng!' }]}
                      >
                        <Controller
                          rules={{
                            required: { value: true, message: ' tr?????ng n??y kh??ng ???????c ????? tr???ng!' }
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
                              placeholder="Ch???n lo???i ??p d???ng">
                              <Select.Option value="typeOfSim">Lo???i
                                Sim</Select.Option>
                              <Select.Option value="packageData">G??i Data</Select.Option>
                            </Select>
                          )}
                        />
                        {<span style={{ color: 'red', display: 'block' }}>{errors.sell?.map(x => x.infomation?.applyType?.message)}</span>}
                      </Form.Item>
                      <Form.Item
                        label="Hi???u l???c (k??? ho???ch)"
                        // hasFeedback
                        // rules={[{ required: true }]}
                        >
                        <Controller
                          rules={{
                            required: { value: true, message: ' tr?????ng n??y kh??ng ???????c ????? tr???ng!' }
                          }}
                          name={`sell.${index}.infomation.datePickerPlanFrom`}
                          control={control}
                          render={({ field: { onBlur, onChange, value, ref } }) => (
                            <DatePicker locale={locale} onChange={onChange} onBlur={onBlur} className="border-radius" format="DD/MM/YYYY" placeholder="T???: dd/mm/yyyy" />
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
                            required: { value: true, message: ' tr?????ng n??y kh??ng ???????c ????? tr???ng!' }
                          }}
                          name={`sell.${index}.infomation.datePickerPlanTo`}
                          control={control}
                          render={({ field: { onBlur, onChange, value, ref } }) => (
                            <DatePicker locale={locale} onChange={onChange} onBlur={onBlur} className="border-radius" format="DD/MM/YYYY" placeholder="T???: dd/mm/yyyy" />
                          )}
                        />
                        {<span style={{ color: 'red', display: 'block' }}>{errors.sell?.map(x => x.infomation?.datePickerPlanTo?.message)}</span>}
                      </Form.Item>
                      <Form.Item
                        label="Hi???u l???c (th???c t???)"
                        hasFeedback
                        rules={[{ required: true }]}>
                        <Controller
                          name={`sell.${index}.infomation.datePickerReality`}
                          control={control}
                          render={({ field: { onBlur, onChange, value, ref } }) => (
                            <DatePicker disabled locale={locale} onChange={onChange} onBlur={onBlur} className="border-radius" format="DD/MM/YYYY" placeholder="T???: dd/mm/yyyy" />
                          )}
                        />
                      </Form.Item>
                    </section>
                    <section className="col-6">
                      <Col span={10}>
                        <div className="row">
                          <div className="col-4">
                            <p>Tr???ng th??i:</p>
                          </div>
                          <div className="col-8">
                            <p>Nguy???n T??n Ti???n</p>
                          </div>
                        </div>
                        <div className="row mt-4">
                          <div className="col-4">
                            <p>Ng??y t???o:</p>
                          </div>
                          <div className="col-8">
                            <p>19/01/2022</p>
                          </div>
                        </div>
                        <div className="row mt-3">
                          <div className="col-4">
                            <p>Ng?????i t???o:</p>
                          </div>
                          <div className="col-8">
                            <p>Nguy???n T??n Ti???n</p>
                          </div>
                        </div>
                        <div className="row mt-3">
                          <div className="col-4">
                            <p>Ghi ch??:</p>
                          </div>
                          <div className="col-8">
                            <textarea className="" style={{ width: '100%', height: '5rem' }}></textarea>
                          </div>
                        </div>
                      </Col>
                    </section>
                    <div className="" style={{ borderBottom: '1px solid #ccc' }}>
                      <span className="nofitication">Ch??nh s??ch chi???u kh???u (c???u h??nh gi??) (*)</span>
                    </div>
                    <div className="">{discountPolicyForm()}</div>
                    <div className="footer" style={{ textAlign: 'right' }}>
                      <button className="btn">X??a v?? ??i???n l???i</button>
                      <Button className="btn mx-4" htmlType="submit">L??u th??ng tin</Button>
                      <button className="btn">Ban h??nh</button>
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