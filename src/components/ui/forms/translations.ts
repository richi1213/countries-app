export const translations = {
  en: {
    errCountry: 'Country name must be between 4 and 30 characters.',
    errCapital: 'Capital name must be between 4 and 30 characters.',
    errPopulation: 'Population must be greater than zero.',
    errFileType: 'File must be of format JPG/PNG',
    errFileSize: 'File size should not exceed 5MB',
    alertInvalid: 'Please correct the errors before submitting.',
    alreadyAdded: 'This country is already added.',

    lCountryName: 'Country Name',
    lCapital: 'Capital',
    lPopulation: 'Population',
    lCapitalURL: 'Capital URL',
    lFlagURL: 'Flag URL',

    uploadCapital: 'Upload Captial',
    uploadFlag: 'Upload Flag',
    addCountry: 'Add Country',
    cancel: 'Cancel',

    saveChanges: 'Save changes',
  },
  ka: {
    errCountry: 'ქვეყნის დასახელება უნდა იყოს 4-დან 30 სიბოლომდე.',
    errCapital: 'დედაქალაქის დასახელება უნდა იყოს 4-დან 30 სიბოლომდე.',
    errPopulation: 'მოსახლეობა უნდა იყოს 0-ზე მეტი.',
    errFileType: 'ფაილი უნდა იყოს JPG/PNG ფორმატის',
    errFileSize: 'ფაილი არ უნდა აღემატოებოდეს 5MB-ს',

    alertInvalid: 'გთხოვთ გაასწორეთ ველები გაგზავნამდე',
    alreadyAdded: 'ეს ქვეყანა უკვე არსებობს სიაში',

    lCountryName: 'ქვეყნის სახელი',
    lCapital: 'დედაქალაქი',
    lPopulation: 'მოსახლეობა',
    lCapitalURL: 'დედაქალაქის URL',
    lFlagURL: 'დროშის URL',

    uploadCapital: 'დედაქალაქის ატვირთვა',
    uploadFlag: 'დროშის ატვირთვა',
    addCountry: 'ქვეყნის დამატება',
    cancel: 'გაუქმება',

    saveChanges: 'ცვლილებების დამახსოვრება',
  },
} as const;
