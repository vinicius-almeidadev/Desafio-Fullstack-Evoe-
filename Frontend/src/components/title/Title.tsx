// Components
// Images
// Imports
// Styles
import s from './Title.module.scss';

interface TitleProps {
    title: string;
}

export default function Title({ 
  title
}: TitleProps) {
    return (
        <main className={s.wrapperMain}>
            <h1>{title}</h1>
        </main>
    );
}