import { Expense } from "../models/expense.model.js";

export const addExpense = async (req,res) =>{
    try{
        const { description, amount , category} = req.body;
        const done = false;
        const userId = req.id 
        if (!description || !amount || !category) {
            return res.status(400).json({
                message: "All fields are required.",
                success: false,
            });
        }
        const expense = await Expense.create({
            description,
            amount,
            category,
            done,
            userId
        });
        return res.status(201).json({
            message: "New Expense Added",
            expense,
            success:true
        })

    }catch(error){
        console.log(error);

    }
}
export const getAllExpense = async(req,res) => {
    try{
        const userId = req.id;   
        let  category = req.query.category || "";
        const done = req.query.done || "";

        const query = {
            userId 
        }
        if(category.toLowerCase() === "all"){
        }else{
            query.category = {$regex:category, $options:'i'}
        }

        if(done.toLowerCase() === "done"){
            query.done = true;
        }else if(done.toLowerCase() === "undone"){
            query.done = false 
        };

        const expense = await Expense.find(query);

        if(!Expense || expense.length === 0){
            return res.status(404).json({
                message:"no expense found",
                success: false
            })
        }
        return res.status(200).json({
            expense,
            success:true
        })
    }catch(error){
        console.log(error); 
    }
}

export const markAsDoneOrUndone = async(req,res) => {
    try{
        const expenseId = req.params.id;
        const done = req.body;
        const expense = await Expense.findByIdAndUpdate(expenseId, done, {new:true});

        if(!expense){
            return res.status(404).json({
                message:"expense not found",
                success:false
            })
        }
        return res.status(200).json({
            message:`Expense mark as ${expense.done ? 'done' : 'undone'}`,
            success:true
        })
    }catch(error){
        console.log(error)
    }
}

export const removeExpense = async(req,res) => {
    try{
        const expenseId = req.params.id;
        await Expense.findByIdAndDelete(expenseId);
        return res.status(200).json({
            message:"expense removed",
            success:true
        })
    }catch(error){
        console.log(error)
    }
}

export const updateExpense = async (req,res) =>{
    try{
        const {description, amount, category} = req.body;
        const expenseId = req.params.id;
        const updateData = {description, amount , category};

        const expense = await Expense.findByIdAndUpdate(expenseId, updateData, {new:true});
        return res.status(200).json({
            message:"expense updated",
            expense,
            success:true
        })

    }catch(error){
        console.log(error)
    }
}