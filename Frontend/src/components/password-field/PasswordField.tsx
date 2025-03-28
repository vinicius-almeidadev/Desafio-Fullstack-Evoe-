// Components
import { Password } from "primereact/password";
// Images
// Imports
import { FormikProps } from "formik";
import { IUser } from "../../interfaces/users/profile/IUser";
// Styles
import s from './PasswordField.module.scss';

export interface IPasswordFieldProps {
    fieldName: string;
    fieldLabel: string;
    toggleMask?: boolean;
    passwordPanel?: boolean;
    formik: FormikProps<IUser>;
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
                value={formik.values[fieldName as keyof IUser]}
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
                    isLowercase={/[a-z]/.test(formik.values[fieldName as keyof IUser] as string)}
                    isUppercase={/[A-Z]/.test(formik.values[fieldName as keyof IUser] as string)}
                    isNumber={/[0-9]/.test(formik.values[fieldName as keyof IUser] as string)}
                    isLengthValid={(formik.values[fieldName as keyof IUser] as string)?.length >= 8}
                  />
                }
                disabled={disabled}
            />
            {formik.touched[fieldName as keyof IUser] && formik.errors[fieldName as keyof IUser] && (
                <small className={s.errorMessage}>{formik.errors[fieldName as keyof IUser]}</small>
            )}
        </main>
    );
}
