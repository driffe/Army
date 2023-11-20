"use client";
import { useState, useRef, useEffect } from 'react';
import {currencyFormatter} from '@/lib/utils'
import ExpenseCategoryItem from '@/components/ExpenseCategory';
import Modal from '@/components/Modal';
import {Chart as ChartJs, ArcElement, Tooltip, Legend} from'chart.js'
import { Doughnut } from 'react-chartjs-2';

//Firebase
import { db } from '@/lib/firebase';
import { collection, addDoc, getDocs } from 'firebase/firestore';

ChartJs.register(ArcElement, Tooltip, Legend);

const DUMMY_DATA = [
  {
    id: 1,
    title: "Entertainment",
    color: "#000",
    total: 500,
  },
  {
    id: 2,
    title: "Gass",
    color: "#66cc99",
    total: 5600,
  },
  {
    id: 3,
    title: "Fuel",
    color: "#ce7e00",
    total: 1500,
  },
  {
    id: 4,
    title: "Holiday",
    color: "#9598e6",
    total: 5100,
  },
];

export default function Home() {
  const [income, setIncome] = useState([])
  const [showAddIncomeModal, setShowAddIncomeModal] = useState(true);
  const amountRef = useRef();
  const descriptionRef = useRef();

  //Handler Functions
  const addIncomeHandler = async (e) => {
    e.preventDefault();

    const newIncome = {
      amount: amountRef.current.value,
      description: descriptionRef.current.value,
      createdAt: new Date(),
    }

    const collectionRef = collection(db, "income")
    try {
      const docSnap = await addDoc(collectionRef, newIncome)
    } catch (error) {
      console.log(error.message);
    }

};

useEffect(() => {
  const getIncomeData = async () => {
    console.log(income);
    const collectionRef = collection(db,'income');
    const docsSnap = await getDocs(collectionRef);

    const data = docsSnap.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
        createdAt: new Date(doc.data().createdAt.toMillis()),
      };
    });
    setIncome(data)
  };

  getIncomeData();
}, [])

  return (
    <>
      {/* Add Income Modal */}
      <Modal show={showAddIncomeModal} onClose={setShowAddIncomeModal}>
        <form onSubmit={addIncomeHandler} className='flex flex-col gap-4'>
          <div className='input-group'>
            <label htmlFor='amount'>Income amount</label>
            <input
              type='number' 
              name='amount'
              ref={amountRef}
              min={0.01} 
              step={0.01} 
              placeholder='Enter income amount' 
              required
            />
          </div>

          <div className='flex flex-col gap-4'>
            <label htmlFor='description'>Description</label>
            <input
              name='description'
              type='text' 
              ref={descriptionRef}
              placeholder='Enter income description' 
              required
            />
          </div>

          <button type='submit' className='btn btn-primary'>
            Add Entry
          </button>
        </form>
        
        <div className='flex flex-col gap-4 mt-6'>
          <h3 className='text-2xl font-bold'>Income History</h3>
          {income.map((i) => {
            return (
              <div className='flex items-center justify-between' key={i.id}>
                <div>
                  <p className='font-semibold'>{i.description}</p>
                  <small>{i.createdAt.toISOString()}</small>
                </div>
                <p className='flex items-center gap-2'>
                  {currencyFormatter.apply(i.amount)}
                </p>
              </div>
            )
          })}
        </div>
      </Modal>

      <main className="container max-w-2xl px-6 mx-auto">
        <section className="py-3">
          <small className="text-grey-400 text-md">My Balance</small>
          <h2 className="text-4xl font-blod">{currencyFormatter(1000000)}</h2>
        </section>

        <section className="flex items-center gap-2 py-3">
          <button 
            onClick={() => {
              
            }} 
            className="btn btn-primary">+ Expense</button>
          <button onClick={() => {
            setShowAddIncomeModal(true)
          }} 
          className="btn btn-primary-outline">+ Income</button>
        </section>

        {/* Expense */}
        <section className='py-6'>
          <h3 className='text-2xl'>My Expenses</h3>
          <div className='flex flex-col gap-4 mt-6'>
            {DUMMY_DATA.map(expense => {
              return (
                <ExpenseCategoryItem 
                  key={expense.id}
                  color={expense.color}
                  title={expense.title}
                  total={expense.total}
                />
              );
            })}
          </div>
        </section>

        {/* Chart Section */}
        <section className='py-6'>
            <h3 className='text-2xl'>Stats</h3>
            <div className='w-1/2 mx-auto'>
              <Doughnut 
                data={{
                  labels: DUMMY_DATA.map(expense => expense.title),
                  datasets: [
                    {
                      label: "Expenses",
                      data: DUMMY_DATA.map(expense => expense.total),
                      backgroundColor: DUMMY_DATA.map(expense => expense.color),
                      borderColor: ["#18181b"],
                      borderWidth: 5,
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
