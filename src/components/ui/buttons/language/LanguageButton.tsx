import { useState } from 'react';
import { Lang } from '@/types';
import styles from 'components/ui/buttons/language/LanguageButton.module.css';
import LanguageIcon from '@mui/icons-material/Language';

type LanguageButtonProps = {
  languages: Record<Lang, string>;
  onLanguageChange: (lang: Lang) => void;
};

const LanguageButton: React.FC<LanguageButtonProps> = ({
  languages,
  onLanguageChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleLanguageSelect = (lang: Lang) => {
    onLanguageChange(lang);
    setIsOpen(false);
  };

  return (
    <div className={styles.languageButtonContainer}>
      <button onClick={toggleDropdown} className={styles.button}>
        <LanguageIcon />
      </button>
      {isOpen && (
        <ul className={styles.dropdown}>
          {Object.entries(languages).map(([languageCode, languageName]) => (
            <li key={languageCode}>
              <button
                onClick={() => handleLanguageSelect(languageCode as Lang)}
                className={styles.dropdownItem}
                aria-label={`Switch to ${languageName}`}
              >
                {languageName}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LanguageButton;
