import { useNavigate, useParams } from 'react-router-dom';
import { Lang } from '@/types';
import LanguageButton from 'components/ui/buttons/language/LanguageButton';

type LanguageSwitcherProps = {
  onLanguageChange?: (lang: Lang) => void;
};

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  onLanguageChange,
}) => {
  const { lang } = useParams<{ lang: Lang }>();
  const navigate = useNavigate();

  const handleLanguageChange = (newLang: Lang) => {
    onLanguageChange?.(newLang);
    if (lang) {
      navigate(window.location.pathname.replace(`/${lang}`, `/${newLang}`));
    }
  };

  const languages: Record<Lang, string> = {
    en: 'English',
    ka: 'ქართული',
  };

  return (
    <div>
      <LanguageButton
        languages={languages}
        onLanguageChange={handleLanguageChange}
      />
    </div>
  );
};

export default LanguageSwitcher;
