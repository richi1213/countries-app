import styles from '@/pages/verification/components/input-otp/slot/InputOTPSlot.module.css';
import { ChangeEvent, ClipboardEvent, KeyboardEvent, forwardRef } from 'react';

type InputOTPSlotProps = {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onPaste: (e: ClipboardEvent<HTMLInputElement>) => void;
  onKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void;
};

const InputOTPSlot = forwardRef<HTMLInputElement, InputOTPSlotProps>(
  ({ onChange, onPaste, onKeyDown }, ref) => {
    return (
      <input
        maxLength={1}
        className={styles.inputField}
        ref={ref}
        onChange={onChange}
        onPaste={onPaste}
        onKeyDown={onKeyDown}
      />
    );
  },
);

export default InputOTPSlot;
