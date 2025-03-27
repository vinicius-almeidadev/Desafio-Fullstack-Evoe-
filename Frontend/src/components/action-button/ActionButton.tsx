// Components
import { Button } from 'primereact/button';
// Images
// Imports
// Styles
import s from './ActionButton.module.scss';

interface ActionButtonProps {
    type?: 'button' | 'submit';
    label: string;
    onclickHandler?: () => void;
    icon?: string;
    iconPosition?: 'left' | 'right';
    disabled?: boolean;
}

export default function ActionButton({ 
  type = "button", label, onclickHandler, icon, iconPosition, disabled
}: ActionButtonProps) {
    return (
        <main className={s.wrapperMain}>
            <Button
                type={type}
                label={label}
                onClick={() => onclickHandler ? onclickHandler() : null}
                icon={icon ? icon : ''}
                iconPos={iconPosition ? iconPosition : 'left'}
                disabled={disabled}
            />
        </main>
    );
}