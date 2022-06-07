import { DAY_IN_SECOND } from "../constants/dayDateConst";

export function makeDateArray(initial) {
    return Array.from(Array(7).keys(), (index) => new Date(initial.valueOf() + index*DAY_IN_SECOND*1000))
}