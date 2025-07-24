// Components
import { InputText } from 'primereact/inputtext';
// Images
// Imports
import { FormikProps } from 'formik';
import { IUser } from '../../interfaces/users/profile/IUser';
// Styles
import s from './TextField.module.scss';

export interface ITextFieldProps {
    fieldType?: string;
    fieldName: string;
    fieldLabel: string;
    formik: FormikProps<IUser>;
    placeholder?: string;
    disabled?: boolean;
}

export default function TextField({
    fieldType = "text", fieldName, fieldLabel, formik,
    placeholder = "Digite...", disabled
}: ITextFieldProps) {
    return (
        <main className={s.wrapperMain}>
            <label>{fieldLabel}</label>
            <InputText
                type={fieldType}
                name={fieldName}
                value={formik.values[fieldName as keyof IUser]}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
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
