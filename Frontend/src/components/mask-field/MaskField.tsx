// Components
import { InputMask } from 'primereact/inputmask';
// Images
// Imports
// Styles
import s from './MaskField.module.scss';

export interface IMaskFieldProps {
    fieldName: string;
    fieldLabel: string;
    fieldMask: string;
    value?: string;
    slotChar?: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    formik: any;
    placeholder?: string;
    disabled?: boolean;
}

export default function MaskField({
  fieldName, fieldLabel, fieldMask, value, slotChar, formik, placeholder = "Digite...", disabled
}: IMaskFieldProps) {
    return (
        <main className={s.wrapperMain}>
            <label>{fieldLabel}</label>
            <InputMask
                name={fieldName}
                value={formik.values[fieldName] || value}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                mask={fieldMask}
                slotChar={slotChar}
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
