import { ChangeEvent, ClipboardEvent, KeyboardEvent, useRef } from 'react';
import styles from '@/pages/verification/components/input-otp/InputOTP.module.css';
import InputOTPSlot from '@/pages/verification/components/input-otp/slot/InputOTPSlot';
import { isDigit, extractDigits } from '@/helpers/checkDigits';

type InputOTPProps = {
  length?: number;
};

const InputOTP = ({ length = 4 }: InputOTPProps) => {
  if (length <= 0) throw new Error('Length must be positive integer');

  const inputRefs = useRef<(HTMLInputElement | null)[]>(
    Array(length).fill(null),
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value;

    if (value && !isDigit(value)) {
      e.target.value = '';
      return;
    }

    if (!value && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (value && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    } else if (index === length - 1 && value) {
      inputRefs.current[index]?.blur();
      const enteredOTP = inputRefs.current
        .map((input) => input?.value || '')
        .join('');
      console.log(enteredOTP);
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>, index: number) => {
    e.preventDefault();
    const pastedData = extractDigits(e.clipboardData.getData('text'));

    Array.from(pastedData).forEach((char, i) => {
      const inputRef = inputRefs.current[index + i];
      if (inputRef) {
        inputRef.value = char;
        inputRef.dispatchEvent(new Event('input', { bubbles: true }));

        if (index + i < inputRefs.current.length - 1) {
          inputRefs.current[index + i + 1]?.focus();
        }
      }
    });
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    if (
      e.key === 'Backspace' &&
      !inputRefs.current[index]?.value &&
      index > 0
    ) {
      const previousInput = inputRefs.current[index - 1];
      if (previousInput) {
        previousInput.value = '';
        previousInput.focus();
      }
    }
  };

  return (
    <div className={styles.inputs}>
      {Array.from({ length }, (_, index) => (
        <InputOTPSlot
          key={index}
          ref={(el: HTMLInputElement) => (inputRefs.current[index] = el)}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            handleChange(e, index)
          }
          onPaste={(e: ClipboardEvent<HTMLInputElement>) =>
            handlePaste(e, index)
          }
          onKeyDown={(e: KeyboardEvent<HTMLInputElement>) =>
            handleKeyDown(e, index)
          }
        />
      ))}
    </div>
  );
};

export default InputOTP;
