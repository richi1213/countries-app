import { translations } from '@/pages/about/views/translations';
import { Lang } from '@/types';
import { useParams } from 'react-router-dom';

const About = () => {
  const { lang } = useParams<{ lang: Lang }>();

  const translated = translations[lang ?? 'en'];
  return <div>{translated.about}</div>;
};

export default About;
