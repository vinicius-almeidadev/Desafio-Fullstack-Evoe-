// Components
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import ActionButton from '../../components/action-button/ActionButton';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
// Images
// Imports
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import  { getUsers } from '../../services/userService';
import { toast } from 'react-toastify';
import { IUser } from '../../interfaces/users/profile/IUser';
// Styles
import s from './Users.module.scss';


export default function Users() {
    // Variables
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState<IUser[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const columns = [
        {field: 'name', header: 'Nome Completo'},
        {field: 'cpf', header: 'CPF'},
        {field: 'email', header: 'E-mail'},
        {field: 'birthDate', header: 'Data de Nascimento'},
        {field: 'phoneNumber', header: 'Telefone'},
    ];

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

        setUsers(response?.users?.map((user: IUser) => ({
            id: user.id,
            name: user.name || "",
            cpf: user.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4") || "",
            email: user.email || "",
            phoneNumber: user.phoneNumber.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3") || "",
            birthDate: convertDate(user.birthDate) || "",
        })));
    }

    function convertDate(value: string) {
        const date = new Date(value);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();

        return `${day}/${month}/${year}`;
    }

    function handleAddUser() {
        navigate('/perfil/novo');
    };

    function handleOpenDeleteDialog() {
        setIsModalOpen(true);
    };

    function handleCloseDeleteDialog() {
        setIsModalOpen(false);
    };

    // Template
    const header = (
        <div className={s.header}>
            <p className={s.reportTitle}>Usuários Cadastrados</p>
        </div>
    );

    const actionBodyTemplate = (rowData: IUser) => {
        return (
            <div className={s.actionBody}>
                <Button icon="pi pi-pencil" className={s.actionButton} onClick={() => navigate(`/perfil/${rowData.id}`)} />

                <Button icon="pi pi-trash" className={s.actionButton} onClick={() => handleOpenDeleteDialog()} />
            </div>
        );
    };

    const deleteProductDialogFooter = (
        <div className={s.dialogFooter}>
            <ActionButton label="Confirmar" onclickHandler={handleCloseDeleteDialog} />
            <ActionButton label="Cancelar" onclickHandler={handleCloseDeleteDialog} reverseStyle />
        </div>
    );

    return (
        <main className={s.wrapperMain}>
            <Dialog
                visible={isModalOpen}
                className={s.deleteDialog}
                closeIcon={<i className="pi pi-times-circle" style={{ fontSize: "1.75rem", color: "var(--scale-white-color-0)" }} />}
                modal
                headerClassName={s.dialogHeader}
                footer={deleteProductDialogFooter}
                onHide={handleCloseDeleteDialog}
            >
                <div className={s.dialogContent}>
                    <i className="pi pi-exclamation-triangle" style={{ fontSize: "5rem", color: "var(--scale-white-color-0)" }} />
                    <span>
                        Tem certeza de que deseja excluir este usuário?
                    </span>
                </div>
            </Dialog>

            <div className={s.internWrapper}>
                <section id="title">
                    <Header text="Desafio FullStack" />
                </section>

                <section id="content">
                    <div className={s.wrapperContent}>
                        <div className={s.contentHeader}>
                            <h1 className={s.contentTitle}>Usuários Cadastrados</h1>
                            <ActionButton
                                label="Adicionar usuário"
                                onclickHandler={handleAddUser}
                                icon="pi pi-user-plus"
                            />
                        </div>

                        <div className={s.contentBody}>
                            <DataTable
                                header={header}
                                value={users}
                                className={s.customDataTable} 
                                tableStyle={{ width: '100%', minWidth: '50rem' }}
                                selection={selectedUsers} 
                                selectionMode="multiple"
                                onSelectionChange={(e) => setSelectedUsers(e.value)}
                                emptyMessage="Nenhum usuário cadastrado."
                            >
                                <Column selectionMode="multiple" exportable={false} />
                                {columns.map((col) => (
                                    <Column key={col.field} field={col.field} header={col.header} />
                                ))}
                                <Column body={actionBodyTemplate} exportable={false} />
                            </DataTable>
                        </div>
                    </div>
                </section>
            </div>

            <Footer />
        </main>
    );
}
