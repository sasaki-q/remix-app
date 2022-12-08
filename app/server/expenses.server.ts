import { Expense } from "@prisma/client";
import { ExpensesType } from "~/types";
import { prisma } from "./database.server";

export const getExpenses = async(userId: string): Promise<Expense[]> => {
    try{
        const expenses = await prisma.expense.findMany({
            where: { userId },
            orderBy: {"date": "desc"},
        })
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
    const { title, amount, date, userId } = expense
    try{
        await prisma.expense.create({
            data: {
                title: title,
                amount: +amount,
                date: new Date(date),
                user: { connect: { id: userId } }
            }
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
    const { title, amount, date, userId } = expense
    try{
        await prisma.expense.update({
            where: { id },
            data: {
                title: title,
                amount: +amount,
                date: new Date(date),
                userId: userId
            }
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