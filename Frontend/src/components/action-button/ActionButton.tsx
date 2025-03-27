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
    reverseStyle?: boolean;
    disabled?: boolean;
}

export default function ActionButton({ 
  type = "button", label, onclickHandler, icon, iconPosition, reverseStyle = false, disabled
}: ActionButtonProps) {
    return (
        <main className={s.wrapperMain}>
            <Button
                type={type}
                label={label}
                onClick={() => onclickHandler ? onclickHandler() : null}
                className={reverseStyle ? s.reverseStyle : ''}
                icon={icon ? icon : ''}
                iconPos={iconPosition ? iconPosition : 'left'}
                disabled={disabled}
            />
        </main>
    );
}