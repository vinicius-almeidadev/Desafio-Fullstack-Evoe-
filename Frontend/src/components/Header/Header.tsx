// Components
// Images
// Imports
// Styles
import s from './Header.module.scss';

interface HeaderProps {
    text: string;
}

export default function Header({ 
  text
}: HeaderProps) {
    return (
        <main className={s.wrapperMain}>
            <h1>{text}</h1>
        </main>
    );
}
