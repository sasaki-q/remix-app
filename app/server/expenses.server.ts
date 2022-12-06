import { Expense } from "@prisma/client";
import { ExpensesType } from "~/types/expenses";
import { prisma } from "./database.server";

const createRequestExpenseData = ({ 
    title, 
    amount, 
    date 
}: ExpensesType): Omit<Expense, "id" | "addedDate"> => ({
    title: title,
    amount: +amount,
    date: new Date(date)
})

export const getExpenses = async(): Promise<Expense[]> => {
    try{
        const expenses = await prisma.expense.findMany({orderBy: {"date": "desc"}})
        return expenses
    }catch(err){
        console.log("DEBUG get expenses error message === ", err)
        throw err
    }
}

export const getExpense = async(id: string): Promise<Expense> => {
    try{
        const expense = await prisma.expense.findUnique({
            where: { id: id }
        })

        if(!expense) throw "Not found"

        return expense
    }catch(err){
        console.log("DEBUG get expense error message ==== ", err)
        throw err
    }
}

export const addExpense = async(expense: ExpensesType): Promise<void> => {
    try{
        await prisma.expense.create({
            data: createRequestExpenseData(expense)
        })
    }catch(err){
        console.log("DEBUG add expense error message === ", err)
        throw err
    }
}

export const updateExpense = async(
    id: string,
    expense: ExpensesType
): Promise<void> => {
    try{
        await prisma.expense.update({
            where: { id },
            data: createRequestExpenseData(expense),
        })
    }catch(err){
        console.log("DEBUG update expense error message === ", err)
        throw err
    }
}

export const deleteExpense = async(id: string): Promise<void> => {
    try{
        await prisma.expense.delete({where: { id }})
    }catch(err) {
        console.log("DEBUG update expense error message === ", err)
        throw err
    }
}