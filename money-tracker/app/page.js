"use client";
import { useState, useContext, useEffect } from 'react';
import { financeContext } from '@/lib/store/finance-context';
import { authContext } from '@/lib/store/auth-context';
import { currencyFormatter } from '@/lib/utils'
import ExpenseCategoryItem from '@/components/ExpenseCategory';
import AddIncomeModal from '@/components/modals/AddIncomeModal'
import AddExpensesModal from '@/components/modals/AddExpensesModal'
import SignIn from '@/components/SignIn';

import { Chart as ChartJs, ArcElement, Tooltip, Legend } from'chart.js'
import { Doughnut } from 'react-chartjs-2';


ChartJs.register(ArcElement, Tooltip, Legend);


export default function Home() {

  const [showAddIncomeModal, setShowAddIncomeModal] = useState(false);
  const [showAddExpensesModal, setShowAddExpensesModal] = useState(false);

  const [balance, setBalance] = useState(0);
  const {expenses, income} = useContext(financeContext);
  const {user, loading} = useContext(authContext);


useEffect(() => {
  const newBalance = income.reduce((total, i) => {
    return total + i.amount;
  }, 0) - 
  expenses.reduce((total, e) => {
    return total + e.total;
  }, 0);

  setBalance(newBalance);
},[expenses, income])

  if(!user) {
    return <SignIn/>
  }

  return (
    <>
      {/* Add Income Modal */}
      <AddIncomeModal 
        show={showAddIncomeModal} 
        onClose={setShowAddIncomeModal}

        //context API
      />
      {/* Add Expenses Modal */}
      <AddExpensesModal
        show={showAddExpensesModal}
        onClose={setShowAddExpensesModal}
      />



      <main className="container max-w-2xl px-6 mx-auto">
        <section className="py-3">
          <small className="text-grey-400 text-lg">My Balance</small>
          <h2 className="text-4xl font-blod my-3">{currencyFormatter(balance)}</h2>
        </section>

        <section className="flex items-center gap-2 py-3">
          <button 
            onClick={() => {
              setShowAddExpensesModal(true)
            }} 
            className="btn btn-primary">+ Expense</button>
          <button 
            onClick={() => {
              setShowAddIncomeModal(true)
          }} 
          className="btn btn-primary-outline">+ Income</button>
        </section>

        {/* Expense */}
        <section className='py-6'>
          <h3 className='text-2xl'>My Expenses</h3>
          <div className='flex flex-col gap-4 mt-6'>
            {expenses.map((expense) => {
              return (
                <ExpenseCategoryItem 
                  key={expense.id}
                  expense={expense}
                />
              );
            })}
          </div>
        </section>

        {/* Chart Section */}
        <section className='py-6' id='Chart'>
            <h3 className='text-2xl'>Stats</h3>
            <div className='w-1/2 mx-auto'>
              <Doughnut 
                data={{
                  labels: expenses.map(expense => expense.title),
                  datasets: [
                    {
                      label: "Expenses",
                      data: expenses.map(expense => expense.total),
                      backgroundColor: expenses.map(expense => expense.color),
                      borderColor: ["#18181b"],
                      borderWidth: 1,
                    },
                  ],
                }}
              />
            </div>
        </section>
      </main>
    </>             
  );
}
