import { Lang } from '@/types';

const allowedLanguages = ['en', 'ka'];

export const languageLoader = ({ params }: { params: { lang?: Lang } }) => {
  const { lang } = params;
  if (!allowedLanguages.includes(lang as Lang)) {
    throw new Response('Not Found', { status: 404 });
  }
  return null;
};
