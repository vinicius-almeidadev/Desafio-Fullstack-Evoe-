// Components
import { Password } from "primereact/password";
// Images
// Imports
// Styles
import s from './PasswordField.module.scss';

export interface IPasswordFieldProps {
    fieldName: string;
    fieldLabel: string;
    toggleMask?: boolean;
    passwordPanel?: boolean;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    formik: any;
    placeholder?: string;
    disabled?: boolean;
}

interface IPasswordRequirementsProps {
    isLowercase: boolean;
    isUppercase: boolean;
    isNumber: boolean;
    isLengthValid: boolean;
}

export default function PasswordField({
  fieldName, fieldLabel, toggleMask = true, passwordPanel = false, formik,
  placeholder = "Digite...", disabled
}: IPasswordFieldProps) {
    // Variables
    const header = <div className={s.header}>Escolha uma senha</div>;
    const PasswordRequirements = ({
        isLowercase,
        isUppercase,
        isNumber,
        isLengthValid,
    }: IPasswordRequirementsProps) => {
        return (
            <div className={s.passwordRequirements}>
                <p>Pelo menos uma letra minúscula {isLowercase ? "✔" : ""}</p>
                <p>Pelo menos uma letra maiúscula {isUppercase ? "✔" : ""}</p>
                <p>Pelo menos um número {isNumber ? "✔" : ""}</p>
                <p>Mínimo de 8 caracteres {isLengthValid ? "✔" : ""}</p>
            </div>
        );
    };

    return (
        <main className={s.wrapperMain}>
            <label>{fieldLabel}</label>
            <Password
                name={fieldName}
                value={formik.values[fieldName]}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                toggleMask={toggleMask}
                feedback={passwordPanel}
                placeholder={placeholder}
                weakLabel="Fraca"
                mediumLabel="Média"
                strongLabel="Forte"
                promptLabel="..."
                className={s.field}
                header={header}
                footer={
                  <PasswordRequirements
                    isLowercase={/[a-z]/.test(formik.values[fieldName])}
                    isUppercase={/[A-Z]/.test(formik.values[fieldName])}
                    isNumber={/[0-9]/.test(formik.values[fieldName])}
                    isLengthValid={formik.values[fieldName]?.length >= 8}
                  />
                }
                disabled={disabled}
            />
            {formik.touched[fieldName] && formik.errors[fieldName] && (
                <small className={s.errorMessage}>{formik.errors[fieldName]}</small>
            )}
        </main>
    );
}
