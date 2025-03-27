// Components
import Title from '../../components/title/Title';
import ActionButton from '../../components/action-button/ActionButton';
// Images
// Imports
import { useNavigate } from 'react-router-dom';
// Styles
import s from './Users.module.scss';

export default function Users() {
    // Variables
    const navigate = useNavigate();

    // Effects

    // Functions
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
                                icon="pi-user-plus"
                                iconPosition="right"
                            />
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
}
