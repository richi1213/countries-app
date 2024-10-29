export const isDigit = (value: string) => /^\d$/.test(value);

export const extractDigits = (input: string) => input.replace(/\D/g, '');
