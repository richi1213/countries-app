import { Form } from "react-router-dom";
import styles from "@/pages/contact/components/form/ContactForm.module.css";

const ContactForm = () => {
  // Keydown handler to detect Ctrl + Enter and submit form (not only Enter because button with type submit does that by default)
  const handleKeyDown = (event: React.KeyboardEvent<HTMLFormElement>) => {
    if (event.ctrlKey && event.key === "Enter") {
      event.preventDefault(); // Prevent the default behavior of Enter key
      const form = event.currentTarget; // Get the form element
      form.requestSubmit(); // Trigger form submission
    }
  };

  return (
    <div className={styles.formContainer}>
      {/* Page wont't be submited  because of <Form /> from react router*/}
      <Form method="post" onKeyDown={handleKeyDown}>
        <label className={styles.label} htmlFor="firstName">
          Your first name:
          <input
            type="text"
            id="firstName"
            name="firstName"
            className={styles.input}
            required
          />
        </label>

        <label className={styles.label} htmlFor="lastName">
          Your last name:
          <input
            type="text"
            id="lastName"
            name="lastName"
            className={styles.input}
            required
          />
        </label>

        <label className={styles.label} htmlFor="email">
          Your email:
          <input
            type="email"
            id="email"
            name="email"
            className={styles.input}
            required
          />
        </label>

        <label className={styles.label} htmlFor="message">
          Your message:
          <textarea
            id="message"
            name="message"
            className={styles.textarea}
            required
          />
        </label>

        <button type="submit" className={styles.submitButton}>
          Submit
        </button>
      </Form>
    </div>
  );
};

export default ContactForm;
