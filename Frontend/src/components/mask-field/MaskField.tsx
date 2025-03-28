// Components
import { InputMask } from 'primereact/inputmask';
// Images
// Imports
import { IUser } from '../../interfaces/users/profile/IUser';
import { FormikProps } from 'formik';
// Styles
import s from './MaskField.module.scss';

export interface IMaskFieldProps {
    fieldName: string;
    fieldLabel: string;
    fieldMask: string;
    value?: string;
    slotChar?: string;
    formik: FormikProps<IUser>;
    placeholder?: string;
    disabled?: boolean;
}

export default function MaskField({
  fieldName, fieldLabel, fieldMask, value, slotChar, formik,
  placeholder = "Digite...", disabled
}: IMaskFieldProps) {
    return (
        <main className={s.wrapperMain}>
            <label>{fieldLabel}</label>
            <InputMask
                name={fieldName}
                value={formik.values[fieldName as keyof IUser] || value}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                mask={fieldMask}
                slotChar={slotChar}
                placeholder={placeholder}
                className={s.field}
                disabled={disabled}
            />
            {formik.touched[fieldName as keyof IUser] && formik.errors[fieldName as keyof IUser] && (
                <small className={s.errorMessage}>{formik.errors[fieldName as keyof IUser]}</small>
            )}
        </main>
    );
}
