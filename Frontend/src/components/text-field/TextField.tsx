// Components
import { InputText } from 'primereact/inputtext';
// Images
// Imports
// Styles
import s from './TextField.module.scss';

export interface ITextFieldProps {
    fieldType?: string;
    fieldName: string;
    fieldLabel: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    formik: any;
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
                value={formik.values[fieldName]}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder={placeholder}
                className={s.field}
                disabled={disabled}
            />
            {formik.touched[fieldName] && formik.errors[fieldName] && (
                <small className={s.errorMessage}>{formik.errors[fieldName]}</small>
            )}
        </main>
    );
}
