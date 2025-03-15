export const validationMessages = {
    required: (field: string) => `${field} الزامی است `,
    selected:(field:string)=>`${field} باید انتخاب شود `,
    unique: (field: string) => `${field} از قبل تعریف شده است `,
    invalid: (field: string) => `${field} نامعتبر است   `,
    minLength: (length: number) => `حداقل کاراکتر ${length} باید باشد `,
    maxLength: (length: number) => `حداکثر کاراکتر ${length} باید باشد `,
    passwordMismatch: 'رمز عبور با تکرار آن مطابقت ندارد',
    roleAccept:'با قوانین باید موافقت شود',
    atLeast:(field:string)=>`${field} باید شامل حداقل یک کلمه بزرگ ، یک علامت خاص و یک حرف کوچک باشد`,
    match:(field:string)=>`${field} نباید شامل فاصله ، - _ . باشد `,
    notPersian:(field:string)=>`${field} نمی تواند فارسی باشد`,
};
