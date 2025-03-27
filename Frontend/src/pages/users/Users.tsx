// Components
import Title from '../../components/title/Title';
import ActionButton from '../../components/action-button/ActionButton';
// Images
// Imports
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import  { getUsers } from '../../services/userService';
import { toast } from 'react-toastify';
// Styles
import s from './Users.module.scss';

export default function Users() {
    // Variables
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);

    // Effects
    useEffect(() => {
        const fetchData = async () => {
            await fetchUsers();
        };

        fetchData();
    }, []);

    // Functions
    async function fetchUsers() {
        const response = await getUsers();

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

        setUsers(response?.users || {});
    }

    function handleAddUser() {
        navigate('/perfil/novo');
    };

    return (
        <main className={s.wrapperMain}>
            <div className={s.internWrapper}>
                <section id="title">
                    <Title title="Desafio FullStack" />
                </section>

                <section id="content">
                    <div className={s.wrapperContent}>
                        <div className={s.contentHeader}>
                            <h1 className={s.contentTitle}>Usuários Cadastrados</h1>
                            <ActionButton
                                label="Adicionar Usuário"
                                onclickHandler={handleAddUser}
                            />
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
}
