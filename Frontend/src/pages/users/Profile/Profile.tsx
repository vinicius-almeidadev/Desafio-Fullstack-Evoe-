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
import  { updateUser, getUserById, createUser } from '../../../services/UserService';
import { toast } from 'react-toastify';
// Styles
import s from './Profile.module.scss';

export default function Profile() {
    // Variables
    const navigate = useNavigate();
    const params = useParams();
    const { id } = params;
    const [userToUpdate, setUserToUpdate] = useState<IUser>();

    const formik = useFormik<IUser>({
        enableReinitialize: true,
        initialValues: {
            name: "",
            cpf: "",
            email: "",
            phoneNumber: "",
            birthDate: "",
            password: "",
            confirmPassword: "",
        },
        validationSchema: Yup.object().shape({
            name: Yup.string().required("Nome é obrigatório."),
            cpf: Yup.string().required("CPF é obrigatório."),
            email: Yup.string().email("E-mail inválido.").required("E-mail é obrigatório."),
            phoneNumber: Yup.string().required("O campo telefone é obrigatório."),
            // birthDate: Yup.string().required("O campo data de nascimento é obrigatório."),
            birthDate: Yup.date()
                .required("O campo data de nascimento é obrigatório.")
                .max(new Date(new Date().setFullYear(new Date().getFullYear() - 16)), "Você deve ter pelo menos 16 anos."),
            ...((id === "novo") && {
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
        }),
        onSubmit: async (values) => {
            if (id === "novo") {
                // Create user logic
                handleCreateUser(values);
                return;
            }

            // Update user logic
            handleUpdateUser(values);
        }
    });

    // Effects
    useEffect(() => {
        const fetchData = async () => {
            if (id && id !== "novo") await fetchUserById(id);
        };

        fetchData();
    }, [id]);

    useEffect(() => {
        if (userToUpdate && userToUpdate.cpf && userToUpdate.phoneNumber) {
            formik.setValues({
              name: userToUpdate.name || "",
              cpf: userToUpdate.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4") || "",
              email: userToUpdate.email || "",
              phoneNumber: userToUpdate.phoneNumber.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3") || "",
              birthDate: convertToISO(userToUpdate.birthDate) || "",
              password: "",
              confirmPassword: "",
            });
        }
    }, [userToUpdate]);

    // Functions
    async function fetchUserById(userId: string) {
        const response = await getUserById(userId);

        if (response?.type !== "success") {
            toast.error(response.message, {
                position: "top-right",
                autoClose: 4500,
                toastId: "fetchUserError",
            });

            navigate("/users");

            return;
        }

        toast.success(response.message, {
            position: "top-right",
            autoClose: 2500,
            toastId: "fetchUserSuccess",
        });

        setUserToUpdate(response?.user || {});
    }

    async function handleCreateUser(values: IUser): Promise<void> {
        const birthDate = convertDateISO(values.birthDate);
        values.birthDate = birthDate;

        const response = await createUser(values);

        if (response?.type === "success") {
            toast.success(response.message, {
                position: "top-right",
                autoClose: 2500,
                toastId: "createUserSuccess",
            });

            formik.resetForm();
            navigate("/users");
            return;
        }

        toast.error(response.message, {
            position: "top-right",
            autoClose: 4500,
            toastId: "createUserError",
        });
    }

    async function handleUpdateUser(values: IUser): Promise<void> {
        const data: IUser = {
            name: values.name,
            cpf: values.cpf,
            email: values.email,
            phoneNumber: values.phoneNumber,
            birthDate: convertDateISO(values.birthDate),
        };

        const response = await updateUser(id, data);

        if (response?.type === "success") {
            toast.success(response.message, {
                position: "top-right",
                autoClose: 2500,
                toastId: "createUserSuccess",
            });
            
            navigate("/users");
            return;
        }

        toast.error(response.message, {
            position: "top-right",
            autoClose: 4500,
            toastId: "createUserError",
        });
    }

    function convertDateISO(isoDate: string): string {
        return new Date(isoDate).toISOString().split("T")[0];
    }

    function convertToISO(dateString: string): string {
        const formattedDateString = dateString + "T03:00:00.000Z";
        const date = new Date(formattedDateString);

        if (isNaN(date.getTime())) return "";

        return date.toISOString();
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
                                        value={userToUpdate?.cpf}
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
                                        value={userToUpdate?.phoneNumber}
                                        slotChar="(00) 00000-0000"
                                        formik={formik}
                                    />

                                    <CalendarField
                                        fieldName="birthDate"
                                        fieldLabel="Data de Nascimento"
                                        formik={formik}
                                    />
                                </div>

                                {id === "novo" && (
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
                                )}
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
