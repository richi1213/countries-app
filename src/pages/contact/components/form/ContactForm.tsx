import { Form, useParams } from 'react-router-dom';
import styles from '@/pages/contact/components/form/ContactForm.module.css';
import { useState } from 'react';
import { Lang } from '@/types';
import { translations } from '@/pages/contact/components/translations';

const ContactForm = () => {
  const { lang } = useParams<{ lang: Lang }>();

  const translated = translations[lang ?? 'en'];

  const [contactFormDataError, setContactFormDataError] = useState({
    firstNameError: '',
    lastNameError: '',
    emailError: '',
    messageError: '',
  });

  const validateInput = (name: string, value: string) => {
    let errorMessage = '';

    switch (name) {
      case 'firstName':
      case 'lastName':
        if (value.length < 3 || value.length > 30) {
          errorMessage = `${
            name === 'firstName' ? 'First name' : 'Last name'
          } ${translated.nErr}`;
        }
        break;
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          errorMessage = translated.mailErr;
        }
        break;
      case 'message':
        if (value.length < 4) {
          errorMessage = translated.mErr;
        }
        break;
      default:
        break;
    }

    setContactFormDataError((prevError) => ({
      ...prevError,
      [`${name}Error`]: errorMessage,
    }));

    return errorMessage === '';
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLFormElement>) => {
    if (event.ctrlKey && event.key === 'Enter') {
      event.preventDefault();
      const form = event.currentTarget;

      const formData = new FormData(form);
      const isFirstNameValid = validateInput(
        'firstName',
        formData.get('firstName') as string
      );
      const isLastNameValid = validateInput(
        'lastName',
        formData.get('lastName') as string
      );
      const isEmailValid = validateInput(
        'email',
        formData.get('email') as string
      );
      const isMessageValid = validateInput(
        'message',
        formData.get('message') as string
      );

      if (
        isFirstNameValid &&
        isLastNameValid &&
        isEmailValid &&
        isMessageValid
      ) {
        form.requestSubmit();
      } else {
        alert(translated.bSubmitAlert);
      }
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    validateInput(name, value);
  };

  return (
    <div className={styles.formContainer}>
      <Form method='post' onKeyDown={handleKeyDown}>
        <label className={styles.label} htmlFor='firstName'>
          {translated.yFName}:
          <input
            type='text'
            id='firstName'
            name='firstName'
            className={styles.input}
            onChange={handleInputChange}
            required
          />
          {contactFormDataError.firstNameError && (
            <p className={styles.errorMessage}>
              {contactFormDataError.firstNameError}
            </p>
          )}
        </label>

        <label className={styles.label} htmlFor='lastName'>
          {translated.yLName}:
          <input
            type='text'
            id='lastName'
            name='lastName'
            className={styles.input}
            onChange={handleInputChange}
            required
          />
          {contactFormDataError.lastNameError && (
            <p className={styles.errorMessage}>
              {contactFormDataError.lastNameError}
            </p>
          )}
        </label>

        <label className={styles.label} htmlFor='email'>
          {translated.yEmail}:
          <input
            type='email'
            id='email'
            name='email'
            className={styles.input}
            onChange={handleInputChange}
            required
          />
          {contactFormDataError.emailError && (
            <p className={styles.errorMessage}>
              {contactFormDataError.emailError}
            </p>
          )}
        </label>

        <label className={styles.label} htmlFor='message'>
          {translated.yMessage}:
          <textarea
            id='message'
            name='message'
            className={styles.textarea}
            onChange={handleInputChange}
            required
          />
          {contactFormDataError.messageError && (
            <p className={styles.errorMessage}>
              {contactFormDataError.messageError}
            </p>
          )}
        </label>

        <button type='submit' className={styles.submitButton}>
          {translated.submit}
        </button>
      </Form>
    </div>
  );
};

export default ContactForm;
