// Components
import { InputMask } from 'primereact/inputmask';
// Images
// Imports
// Styles
import s from './MaskField.module.scss';

export interface IMaskFieldProps {
    fildName: string;
    fildLabel: string;
    fildMask: string;
    slotChar?: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    formik: any;
    placeholder?: string;
    disabled?: boolean;
}

export default function MaskField({
  fildName, fildLabel, fildMask, slotChar, formik, placeholder = "Digite...", disabled
}: IMaskFieldProps) {
    return (
        <main className={s.wrapperMain}>
            <label>{fildLabel}</label>
            <InputMask
                name={fildName}
                value={formik.values[fildName]}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                mask={fildMask}
                slotChar={slotChar}
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
