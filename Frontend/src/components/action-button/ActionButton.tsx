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
    loading?: boolean;
    size?: 'small' | 'medium' | 'large';
    icon?: string;
    iconPosition?: 'left' | 'right';
    reverseStyle?: boolean;
    disabled?: boolean;
}

export default function ActionButton({ 
  type = "button", label, onclickHandler, loading = false, size, icon,
  iconPosition = "right", reverseStyle = false, disabled
}: ActionButtonProps) {
    // Functions
    function handleInputSize(size: 'small' | 'medium' | 'large') {
        const sizes = {
            small: '32px',
            medium: '40px',
            large: '48px',
        };

        return sizes[size] || '48px';
    }

    return (
        <main className={s.wrapperMain}>
            <Button
                type={type}
                label={label}
                disabled={disabled}
                onClick={() => onclickHandler ? onclickHandler() : null}
                loading={loading}
                icon={icon ? icon : ''}
                iconPos={iconPosition ? iconPosition : 'left'}
                className={reverseStyle ? s.reverseStyle : ""}
                style={{
                    display: "flex",
                    gap: icon ? "0.5rem" : "",
                    height: handleInputSize(size || 'large')
                }}
            />
        </main>
    );
}