import slugify from 'slugify';

export function slugCreate(text: string) {
  const textMod = text + Date.now();
  const slug = slugify(textMod, {
    lower: true,
    strict: true,
    locale: 'vi',
  });
  return slug;
}
