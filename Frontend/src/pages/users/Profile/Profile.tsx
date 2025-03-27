// Components
import Title from '../../../components/title/Title';
import TextField from '../../../components/text-field/TextField';
import MaskField from '../../../components/mask-field/MaskField';
import CalendarField from '../../../components/calendar-field/CalendarField';
import PasswordField from '../../../components/password-field/PasswordField';
import ActionButton from '../../../components/action-button/ActionButton';
// Images
// Imports
import { useNavigate, useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { IUser } from '../../../interfaces/users/profile/IUser';
import { useEffect, useState } from 'react';
// Styles
import s from './Profile.module.scss';

export default function Profile() {
    // Variables
    const navigate = useNavigate();
    const params = useParams();
    const { id } = params;
    const [initialValues, setInitialValues] = useState<IUser>({
        name: "",
        cpf: "",
        email: "",
        phoneNumber: "",
        birthDate: "",
        password: "",
        confirmPassword: ""
    });

    const formik = useFormik<IUser>({
        enableReinitialize: true,
        initialValues,
        validationSchema: Yup.object().shape({
            name: Yup.string().required("Nome é obrigatório."),
            cpf: Yup.string().required("CPF é obrigatório."),
            email: Yup.string().email("E-mail inválido.").required("E-mail é obrigatório."),
            phoneNumber: Yup.string().required("O campo telefone é obrigatório."),
            // birthDate: Yup.string().required("O campo data de nascimento é obrigatório."),
            birthDate: Yup.date()
                .required("O campo data de nascimento é obrigatório.")
                .max(new Date(new Date().setFullYear(new Date().getFullYear() - 16)), "Você deve ter pelo menos 16 anos."),
            password: Yup.string()
                .required("Campo Senha é obrigatório")
                .matches(
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d,.\s;:!@#*]{8,}$/,
                    "Sua senha não atende aos requisitos"
                )
                .matches(/^\S*$/, "A senha não pode conter espaços"),
            confirmPassword: Yup.string()
                .required("Campo Confirmar Senha é obrigatório")
                .oneOf([Yup.ref("password")], "As senhas não coincidem"),
        }),
        onSubmit: async (values) => {
            await submitForm(values);
        }
    });

    // Effects
    useEffect(() => {
        console.log("formik.values", formik.values);
    }, [formik.values]);

    // Functions
    async function submitForm(values: IUser): Promise<void> {
        console.log("Creating user...", values);
    }
    function handleBack() {
        navigate(-1);
    }

    return (
        <main className={s.wrapperMain}>
            <div className={s.internWrapper}>
                <section id="title">
                    <Title title="Desafio FullStack" />
                </section>

                <section id="content">
                    <div className={s.wrapperContent}>
                        <div className={s.contentHeader}>
                            <h1 className={s.contentTitle}>{id === "novo" ? "Cadastro de Usuário" : "Edição de Usuário"}</h1>
                        </div>

                        <div className={s.contentBody}>
                            <h1 className={s.contentTitle}>{id === "novo"
                                ? "Preencha os campos abaixo para adicionar um novo usuário ao sistema."
                                : "Atualize os campos abaixo para modificar as informações do usuário no sistema."}</h1>

                            <div className={s.formWrapper}>
                                <div className={s.firstGridLine}>
                                    <TextField
                                        fieldName="name"
                                        fieldLabel="Nome Completo"
                                        formik={formik}
                                        placeholder="Insira o nome completo"
                                    />
                                </div>

                                <div className={s.secondGridLine}>
                                    <MaskField
                                        fieldName="cpf"
                                        fieldLabel="CPF"
                                        fieldMask="999.999.999-99"
                                        slotChar="000.000.000-00"
                                        formik={formik}
                                    />
                                    
                                    <TextField
                                        fieldType="email"
                                        fieldName="email"
                                        fieldLabel="E-mail"
                                        formik={formik}
                                        placeholder="Insira o e-mail"
                                    />
                                </div>

                                <div className={s.thirdGridLine}>
                                    <MaskField
                                        fieldName="phoneNumber"
                                        fieldLabel="Telefone para contato"
                                        fieldMask="(99) 99999-9999"
                                        slotChar="(00) 00000-0000"
                                        formik={formik}
                                    />

                                    <CalendarField
                                        fieldName="birthDate"
                                        fieldLabel="Data de Nascimento"
                                        formik={formik}
                                    />
                                </div>

                                <div className={s.fourthGridLine}>
                                    <PasswordField
                                        fieldName="password"
                                        fieldLabel="Senha"
                                        formik={formik}
                                        placeholder="Insira a senha"
                                        passwordPanel
                                    />

                                    <PasswordField
                                        fieldName="confirmPassword"
                                        fieldLabel="Confirmar Senha"
                                        formik={formik}
                                        placeholder="Insira a senha novamente"
                                    />
                                </div>
                            </div>

                            <div className={s.contentBodyFooter}>
                                <ActionButton
                                    type="submit"
                                    label={id === "novo" ? "Cadastrar" : "Atualizar"}
                                    onclickHandler={() => formik.handleSubmit()}
                                />

                                <ActionButton
                                    type="submit"
                                    label="Voltar"
                                    onclickHandler={() => handleBack()}
                                    reverseStyle
                                />
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
}
