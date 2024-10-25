import { useParams } from 'react-router-dom';
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
      case 'lastName': {
        if (value.length < 3 || value.length > 30) {
          errorMessage = `${
            name === 'firstName' ? 'First name' : 'Last name'
          } ${translated.nErr}`;
        }
        break;
      }
      case 'email': {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          errorMessage = translated.mailErr;
        }
        break;
      }
      case 'message': {
        if (value.length < 4) {
          errorMessage = translated.mErr;
        }
        break;
      }
      default:
        break;
    }

    setContactFormDataError((prevError) => ({
      ...prevError,
      [`${name}Error`]: errorMessage,
    }));

    return errorMessage === '';
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    validateInput(name, value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    const firstName = formData.get('firstName') as string;
    const lastName = formData.get('lastName') as string;
    const email = formData.get('email') as string;
    const message = formData.get('message') as string;

    const isFirstNameValid = validateInput('firstName', firstName);
    const isLastNameValid = validateInput('lastName', lastName);
    const isEmailValid = validateInput('email', email);
    const isMessageValid = validateInput('message', message);

    if (isFirstNameValid && isLastNameValid && isEmailValid && isMessageValid) {
      // Log user inputted information
      console.log({
        firstName,
        lastName,
        email,
        message,
      });
    } else {
      alert(translated.bSubmitAlert);
    }
  };

  return (
    <div className={styles.formContainer}>
      <form method='post' onSubmit={handleSubmit}>
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
      </form>
    </div>
  );
};

export default ContactForm;
