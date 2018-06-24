import { Comparations } from "./ComparationsEnum";

export default interface IFilter {
    fieldToFilter: string,
    comparOperator: Comparations,
    value: string | boolean | number
}