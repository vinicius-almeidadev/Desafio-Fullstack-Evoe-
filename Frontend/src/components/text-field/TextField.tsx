// Components
import { InputText } from 'primereact/inputtext';
// Images
// Imports
// Styles
import s from './TextField.module.scss';

export interface ITextFieldProps {
    fildType?: string;
    fildName: string;
    fildLabel: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    formik: any;
    placeholder?: string;
    disabled?: boolean;
}

export default function TextField({
  fildType = "text", fildName, fildLabel, formik,
  placeholder = "Digite...", disabled
}: ITextFieldProps) {
    return (
        <main className={s.wrapperMain}>
            <label>{fildLabel}</label>
            <InputText
                type={fildType}
                name={fildName}
                value={formik.values[fildName]}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder={placeholder}
                className={s.field}
                disabled={disabled}
            />
            {formik.touched[fildName] && formik.errors[fildName] && (
                <small className={s.errorMessage}>{formik.errors[fildName]}</small>
            )}
        </main>
    );
}
