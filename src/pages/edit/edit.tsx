import { schema as createEmployeeSchema } from 'pages/create/create';
import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getEmployeesId, updateEmployee } from 'store/slices/main/actions';
import { InferType } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { FormInput } from 'components/common/Input';
import { Role, useAppDispatch, useAppSelector } from 'interfaces/interfaces';
import { Checkbox, DatePicker, Form, message, Select } from 'antd';
import PhoneInput from 'react-phone-number-input';
import dayjs from 'dayjs';
import 'react-phone-number-input/style.css';
import { ROUTES } from 'data/Routes';
import Loading from 'components/common/Loading';

const schema = createEmployeeSchema.clone();
type IForm = InferType<typeof schema>;

const EditPage = () => {
  const { id } = useParams<{
    id: string;
  }>();
  if (!id) {
    throw new Error();
  }

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { employeeId } = useAppSelector((state) => state.main);

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

  useEffect(() => {
    if (id) {
      dispatch(getEmployeesId({ id }));
    }
  }, [dispatch, id]);

  const onSubmit: SubmitHandler<IForm> = async (data) => {
    if (id) {
      dispatch(
        updateEmployee({
          id: +id,
          updatedEmployeeData: {
            name: data.name,
            role: data.role,
            isArchive: data.isArchive,
            birthday: dayjs(data.birthday).format('DD.MM.YYYY'),
            phone: data.phone,
          },
        }),
      );
      messageApi.success({
        content: 'Entity has been updated.',
      });
      navigate(ROUTES.MAIN);
    }
  };

  if (!employeeId) {
    return <Loading />;
  }

  const newDate = dayjs(
    new Date(employeeId!.birthday.split('.').reverse().join('-')),
  ) as unknown as string;

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
        <FormInput
          defaultValue={employeeId?.name}
          error={errors.name}
          label="name"
          {...register('name')}
        />
        <Controller
          name="role"
          control={control}
          defaultValue={employeeId?.role}
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
          defaultValue={employeeId?.isArchive}
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
          defaultValue={newDate}
          control={control}
          render={({ field: { ...rest } }) => (
            <Form.Item label="birthday" help={errors.birthday?.message}>
              <DatePicker {...rest} format="DD.MM.YYYY" />
            </Form.Item>
          )}
        />
        <Controller
          name="phone"
          defaultValue={employeeId?.phone}
          control={control}
          render={({ field: { ...rest } }) => (
            <Form.Item label="phone" help={errors.phone?.message}>
              <PhoneInput
                defaultValue={employeeId?.phone}
                placeholder="Enter phone number"
                {...rest}
              />
            </Form.Item>
          )}
        />
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default EditPage;
