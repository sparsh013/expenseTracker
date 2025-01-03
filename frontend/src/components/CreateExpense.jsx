import React, { useState } from 'react'
import { Button } from './ui/button'
import { Dialog, DialogHeader, DialogContent, DialogDescription, DialogTitle, DialogTrigger, DialogFooter } from './ui/dialog'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from './ui/select'
import { Loader, Loader2, LucideLoader2 } from 'lucide-react'
import axios from 'axios'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setExpenses } from '@/redux/expenseSlice'

const CreateExpense = () => {
    const [formData , setFormData] = useState({
        description : "",
        amount : "",
        category : ""
    });

    const [loading , setLoading] = useState(false);
    const [isOpen,setIsOpen] = useState(false);
    const dispatch = useDispatch();
    const {expenses} = useSelector(store=>store.expense)

    const changeEventHandler = (e) =>{
        const {name,value} = e.target;
        setFormData((prevData)=>({
            ...prevData,
            [name]:value
        }))
    }

    const changeCategoryHandler = (value) =>{
        setFormData((prevData)=>({
            ...prevData,
            category:value
        }))
    }

    const submitHandler = async(e) =>{
        e.preventDefault(); 
        console.log(formData);
        try {
            setLoading(true);
            const res = await axios.post("http://localhost:8000/api/v1/expense/add", formData, {
                headers:{
                    'Content-type':'application/json'
                },
                withCredentials:true
            });
            if(res.data.success){
                dispatch(setExpenses([...expenses , res.data.expense]))
                toast.success(res.data.message);
                setIsOpen(false);
            }
        } catch (error) {
            console.log(error);
        } finally{
            setLoading(false)
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button onClick={()=>setIsOpen(true)} variant='outline'>Add New Expense</Button>
            </DialogTrigger>
            <DialogContent classame='sm:max-w-[425px]'>
                <DialogHeader>
                    <DialogTitle>Add Expense</DialogTitle>
                    <DialogDescription>
                        Create Expense here and click add when done
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={submitHandler}>
                    <div className='grid gap-4 py-4'>
                        <div className='grid grid-cols-4 items-center gap-4'>
                            <Label htmlFor="name" className='text-right'>
                                Description
                            </Label>
                            <Input id="description" placeholder='Description' className='col-span-3'
                                name='description' value={formData.description} onChange={changeEventHandler} />
                        </div>
                        <div className='grid grid-cols-4 items-center gap-4'>
                            <Label htmlFor="amount" className='text-right'>
                                Amount
                            </Label>
                            <Input id="amount" placeholder='00.00 ₹' className='col-span-3'
                                name='amount' value={formData.amount} onChange={changeEventHandler}/>
                        </div>
                    </div>
                    <Select onValueChange={changeCategoryHandler}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="rent">Rent</SelectItem>
                                <SelectItem value="food">Food</SelectItem>
                                <SelectItem value="salary">Salary</SelectItem>
                                <SelectItem value="shopping">Shopping</SelectItem>
                                <SelectItem value="others">Others</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    <DialogFooter>
                        {
                            loading ? <Button className='w-full my-4'>
                                <Loader className='mr-2 h-4 animate-spin'/>
                                Please Wait
                            </Button> :
                            <Button type="submit">Add</Button>
                        }    
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default CreateExpense
