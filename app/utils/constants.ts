import { ExpensesType } from "~/types";

export const DUMMY_DATA: ExpensesType[] = [
    {
        id: "qqq",
        title: "First",
        amount: 10,
        date: new Date().toISOString(),
    },
    {
        id: "www",
        title: "Second",
        amount: 20,
        date: new Date().toISOString(),
    },
    {
        id: "eee",
        title: "Third",
        amount: 30,
        date: new Date().toISOString(),
    },
    {
        id: "rrr",
        title: "Fourth",
        amount: 40,
        date: new Date().toISOString(),
    },
]