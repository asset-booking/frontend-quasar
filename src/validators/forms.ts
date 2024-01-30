export const emptyValueValidator = (val: string) => (val && val.length > 0) || 'Please type something'
export const positiveNumberValidator = (val: number) => (val >= 0) || 'Please type a positive number'
