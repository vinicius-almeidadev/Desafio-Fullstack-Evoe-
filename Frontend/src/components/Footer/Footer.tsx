// Components
// Images
// Imports
// Styles
import s from './Footer.module.scss';

export default function Footer() {
    return (
        <main className={s.wrapperMain}>
            <h1>Desafio FullStack © {new Date().getFullYear()}</h1>
        </main>
    );
}
