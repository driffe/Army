import { currencyFormatter } from "@/lib/utils";
import { useContext } from "react";
import { financeContext } from "@/lib/store/finance-context";
import Modal from "../Modal"
import { FaRegTrashAlt } from "react-icons/fa";

function ViewExpenseModal({show, onClose, expense}) {
    const {deleteExpneseItem} = useContext(financeContext);
    const deleteExpenseItemHandler = async (item) => {
        try {
            //Remove item from the list
            const updatedItems = expense.items.filter((i) => i.id !== item.id);
            //Update the expense balance
            const updatedExpenses = {
                items: [...updatedItems],
                total: expense.total - item.amount,
            };

            await deleteExpneseItem(updatedExpenses, expense.id);
        } catch (error) {
            console.log(error.message)
        }
    };
    return (
        <Modal show={show} onClose={onClose}>
            <div className="flex items-center justify-between">
                <h2 className="text-4xl">{expense.title}</h2>
                <button className="btn btn-danger">Delete</button>
            </div>

            <div>
                <h3 className="my-4 text-2xl">Expense History</h3>
                {expense.items.map((item) => {
                    return <div key={item.id} className="flex items-center justify-between">
                        <small>
                            {item.createdAt.toMillis
                            ? new Date(item.createdAt.toMillis()).toISOString()
                            : item.createdAt.toISOString()}
                        </small>
                        <p className="flex items-center gap-2">
                            {currencyFormatter(item.amount)}
                            <button onClick={() => {
                                deleteExpenseItemHandler(item);
                            }}>
                                <FaRegTrashAlt/>
                            </button>
                        </p>
                    </div>;
                })}
            </div>
        </Modal>
    );
}

export default ViewExpenseModal