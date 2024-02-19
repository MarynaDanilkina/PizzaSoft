import { Select, Form, Checkbox } from 'antd';
import {
  FilterRole,
  SortingOrder,
  useAppDispatch,
  useAppSelector,
} from 'interfaces/interfaces';
import React from 'react';
import { setChecked, setRole, setSort } from 'store/slices/main';
import './SortForm.scss';

const SortForm = () => {
  const dispatch = useAppDispatch();
  const { role, checked, sort } = useAppSelector((state) => state.main);

  return (
    <div className="container_sort-form">
      <Form.Item label="Sort by" className="sort-form_form-item">
        <Select
          defaultValue={sort}
          options={Object.values(SortingOrder).map((el) => ({
            label: el,
            value: el,
          }))}
          onChange={(v) => dispatch(setSort(v))}
        />
      </Form.Item>
      <Form.Item label="Role" className="sort-form_form-item">
        <Select
          defaultValue={role}
          options={Object.values(FilterRole).map((el) => ({
            label: el,
            value: el,
          }))}
          onChange={(v) => dispatch(setRole(v))}
        />
      </Form.Item>
      <Checkbox
        className="sort-form_checkbox"
        onChange={(v) => dispatch(setChecked(v.target.checked))}
        defaultChecked={checked}
      >
        isArchive
      </Checkbox>
    </div>
  );
};

export default SortForm;
