"use client"
import { useState, useContext , useRef} from "react";
import { financeContext } from "@/lib/store/finance-context";
import Modal from "../Modal";
import {v4 as uuidv4} from "uuid";

function AddExpensesModal({show, onClose}) {
    const [expenseAmount, setExpenseAmount] = useState("");
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [showAddExpense, setShowAddExpense] = useState(false);
    const {expenses, addExpenseItem, addCategory} = useContext(financeContext);
    const titleRef = useRef(null);
    const colorRef = useRef(null);

    const addExpenseItemHandler = async () => {
        const expense = expenses.find(e => {
            return e.id === selectedCategory
        })
        const newExpense = {
            color: expense.color,
            title: expense.title,
            total: expense.total + +expenseAmount,
            items: [
                ...expense.items,
                {
                    amount: +expenseAmount,
                    createdAt: new Date(),
                    id: uuidv4(),
                },
            ],
        };

        try {
            await addExpenseItem(selectedCategory, newExpense);
    
            console.log(newExpense);
            setExpenseAmount("");
            setSelectedCategory(null);
            onClose();
        } catch (error) {
            console.log(error.message);
        }
    };

    const addCategorHandler = async () => {
        const title = titleRef.current.value;
        const color = colorRef.current.value;
        try {
            await addCategory({title, color, total: 0})
            setShowAddExpense(false);
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <Modal show={show} onClose={onClose}> 
            <div className='flex flex-col gap-1'>
                <label>Enter an amount</label>
                <input
                    type='number' 
                    min={0.01} 
                    step={0.01} 
                    placeholder='Enter Expense amount'
                    value={expenseAmount} 
                    onChange={(e) => {
                        setExpenseAmount(e.target.value)
                    }}
                />
            </div>
            {/* Expense Categories */}
            {expenseAmount > 0 && (
            <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between">
                    <h3 className="text-wxl capitalize">select expense category</h3>
                    <button
                        onClick={() => {
                            setShowAddExpense(true)
                        }} 
                        className="text-lime-400"
                    >
                        + New Category
                    </button>
                </div>
                {showAddExpense && (
                    <div className="flex flex-col">
                        <input type="text" className="block w-auto" placeholder="Enter Expense Title" ref={titleRef}/>
                        <div className="flex flex-row justify-around items-center">
                            <div>
                                <label>Color:  </label>
                                <input type="color" className="w-24 h-10" ref={colorRef}/>
                            </div>
                            <div className="grid grid-cols-2 grid-flow-col gap-2">
                                <button onClick={addCategorHandler} className="btn btn-primary-outline">Create</button>
                                <button 
                                    onClick={() => {
                                        setShowAddExpense(false)
                                    }} 
                                    className="btn btn-danger"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {expenses.map(expense => {
                    return (
                    <button 
                        key={expense.id}
                        onClick={() => {
                            setSelectedCategory(expense.id);
                        }}
                    >
                        <div style={{
                            boxShadow: expense.id === selectedCategory ? "1px 1px 4px" : "none",
                        }} className="flex items-center justify-between px-4 py-4 bg-slate-700 rounded-3xl">
                            <div className="flex items-center gap-2">
                                <div className="w-[25px] h-[25px] rounded-full"
                                style={{
                                    backgroundColor: expense.color,
                                }}
                                />    
                                <h4 className="capitalize">{expense.title}</h4>
                            </div>
                        </div>
                    </button>
                    );
                })}
            </div>
            )}
            {expenseAmount > 0 && selectedCategory && (
                <div className="mt-6">
                <button 
                    className="btn btn-primary"
                    onClick={addExpenseItemHandler}
                >
                    Add Expense
                </button>
                </div>
            )}
        </Modal>
    );
};

export default AddExpensesModal;