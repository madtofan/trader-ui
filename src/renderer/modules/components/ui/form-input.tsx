import * as React from 'react';
import { ControllerProps, FieldPath, FieldValues } from 'react-hook-form';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './form';
import { Input } from './input';
import Icons from '../icons';

type FormFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = Omit<ControllerProps<TFieldValues, TName>, 'render'> & {
  inputType: React.HTMLInputTypeAttribute;
  placeholder?: string;
  label?: string;
  inputClassName?: string;
  icon?: keyof typeof Icons;
};

function FormInput<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(props: FormFieldProps<TFieldValues, TName>) {
  const { label, inputType, placeholder, inputClassName, icon } = props;
  const Icon = icon && Icons[icon];
  return (
    <FormField
      {...props}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <div className="relative !mt-0">
              <Input
                type={inputType}
                placeholder={placeholder}
                {...field}
                className={inputClassName}
              />
              {Icon && (
                <span className="absolute inset-y-0 end-0 grid place-content-center px-4 !mt-0">
                  <Icon />
                </span>
              )}
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export default FormInput;
