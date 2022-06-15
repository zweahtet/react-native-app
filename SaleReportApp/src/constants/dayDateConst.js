export const DAY_IN_MINUTE = 24 * 60;

export const DAY_IN_SECOND = DAY_IN_MINUTE * 60; 

export const INITIAL_DATE = new Date();

// Since day.getday() returns 0 (Sun) - 6 (Sat),
// we need to translate the integer to its string representation
export const DAYS = {
    Monday: 1,
    Tuesday: 2,
    Wednesday: 3,
    Thursday: 4,
    Friday: 5,
    Saturday: 6,
    Sunday: 0
}