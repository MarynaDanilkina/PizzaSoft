/* eslint-disable react/display-name */
import { Transition } from '@headlessui/react';
import React from 'react';
import {
  AriaAttributes,
  DetailedHTMLProps,
  ForwardedRef,
  forwardRef,
  InputHTMLAttributes,
} from 'react';

import { FieldError } from 'react-hook-form';

interface IProps
  extends DetailedHTMLProps<
      InputHTMLAttributes<HTMLInputElement>,
      HTMLInputElement
    >,
    AriaAttributes {
  error?: FieldError;
  confirmationError?: boolean | null;
  label?: string;
}

const FormInput = forwardRef(
  (
    { error, type = 'text', label, ...props }: IProps,
    ref: ForwardedRef<HTMLInputElement>,
  ) => {
    return (
      <div>
        {label && <div>{label}</div>}
        <input ref={ref} type={type} autoComplete="none" {...props} />
        <Transition show={!!error}>
          <Transition.Child
            className="opacity-0"
            enter="transition-opacity ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
          >
            <div>{error && error.message}</div>
          </Transition.Child>
        </Transition>
      </div>
    );
  },
);

export default FormInput;
