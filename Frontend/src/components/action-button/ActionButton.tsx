// Components
import { Button } from 'primereact/button';
// Images
// Imports
// Styles
import s from './ActionButton.module.scss';

interface ActionButtonProps {
    label: string;
    onclickHandler?: () => void;
    icon?: string;
    iconPosition?: 'left' | 'right';
    disabled?: boolean;
}

export default function ActionButton({ 
  label, onclickHandler, icon, iconPosition, disabled
}: ActionButtonProps) {
    return (
        <main className={s.wrapperMain}>
            <Button
                label={label}
                onClick={() => onclickHandler ? onclickHandler() : null}
                icon={icon ? icon : ''}
                iconPos={iconPosition ? iconPosition : 'left'}
                disabled={disabled}
            />
        </main>
    );
}