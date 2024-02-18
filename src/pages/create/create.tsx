import React from 'react';
import { useNavigate } from 'react-router-dom';
import { object, string, InferType, boolean } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { FormInput } from 'components/common/Input';
import { Role, useAppDispatch } from 'interfaces/interfaces';
import { Checkbox, DatePicker, Form, message, Select } from 'antd';
import PhoneInput from 'react-phone-number-input';
import dayjs from 'dayjs';
import 'react-phone-number-input/style.css';
import { createEmployees } from 'store/slices/main/actions';
import { ROUTES } from 'data/Routes';

export const schema = object({
  name: string().min(3).required(),
  role: string()
    .min(1, 'At least 1 element must be specified.')
    .required('At least 1 element must be specified.'),
  isArchive: boolean().required(),
  birthday: string().required(),
  phone: string().required(),
});

type IForm = InferType<typeof schema>;

const CreatePage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [messageApi, contextHolder] = message.useMessage();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<IForm>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<IForm> = async (data) => {
    console.log(data);
    dispatch(
      createEmployees({
        employeeData: {
          name: data.name,
          role: data.role,
          isArchive: data.isArchive,
          birthday: dayjs(data.birthday).format('DD.MM.YYYY'),
          phone: data.phone,
        },
      }),
    );
    messageApi.success({
      content: 'Entity has been created.',
    });
    navigate(ROUTES.MAIN);
  };

  return (
    <div>
      {contextHolder}
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
        }}
      >
        <FormInput error={errors.name} label="name" {...register('name')} />
        <Controller
          name="role"
          control={control}
          render={({ field }) => (
            <Form.Item label="role" help={errors.role?.message}>
              <Select
                {...field}
                options={Object.values(Role).map((el) => ({
                  label: el,
                  value: el,
                }))}
                status={errors.role && 'error'}
              />
            </Form.Item>
          )}
        />
        <Controller
          name="isArchive"
          control={control}
          defaultValue={true}
          render={({ field: { ...rest } }) => (
            <Form.Item label="isArchive">
              <Checkbox
                {...rest}
                defaultChecked={true}
                onChange={(e) => setValue('isArchive', e.target.checked)}
                checked={rest.value}
              />
            </Form.Item>
          )}
        />
        <Controller
          name="birthday"
          control={control}
          render={({ field: { ...rest } }) => (
            <Form.Item label="birthday" help={errors.birthday?.message}>
              <DatePicker {...rest} format="DD.MM.YYYY" />
            </Form.Item>
          )}
        />
        <Controller
          name="phone"
          control={control}
          render={({ field: { ...rest } }) => (
            <Form.Item label="phone" help={errors.phone?.message}>
              <PhoneInput placeholder="Enter phone number" {...rest} />
            </Form.Item>
          )}
        />
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default CreatePage;
