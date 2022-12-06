import { Expense } from "@prisma/client";
import { ExpensesType } from "~/types/expenses";
import { prisma } from "./database.server";

export const addExpense = async(expense: ExpensesType): Promise<Expense> => {
    try{
        const { title, amount, date } = expense
        const res = await prisma.expense.create({data: {
            title: title,
            amount: +amount,
            date: new Date(date)
        }})

        return res
    }catch(err){
        console.log("DEBUG error message === ", err)
        throw err
    }
}