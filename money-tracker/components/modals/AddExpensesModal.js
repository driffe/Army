import { useState, useContext } from "react";
import { financeContext } from "@/lib/store/finance-context";
import Modal from "../Modal";

function AddExpensesModal(show, onClose) {
    const [expenseAmount, setExpenseAmount] = useState("");

    const {expenses} = useContext(financeContext);

    return (
        <Modal show={show} onClose={onClose}> 
            <div className='flex flex-col gap-4'>
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
            {expenses.map(expense => {
                return (//1351
                    <div className="flex items-center justify-between px-4 py-4 bg-slate-700 rounded-3xl">
                        <div className="flex items-center gap-2">
                            <div className="w-[25px] h-[25px] rounded-full"
                            style={{
                                backgroundColor: expense.color,
                            }}
                            />    
                            <h4 className="capitalize">{expense.title}</h4>
                        </div>
                    </div>
                );
            })}
        </Modal>
    );
};

export default AddExpensesModal;