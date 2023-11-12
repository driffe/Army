"use client";
import {currencyFormatter} from '@/lib/utils'
import ExpenseCategoryItem from '@/components/ExpenseCategory';
import {Chart as ChartJs, ArcElement, Tooltip, Legend} from'chart.js'
import { Doughnut } from 'react-chartjs-2';

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
    color: "#000",
    total: 5600,
  },
  {
    id: 3,
    title: "Fuel",
    color: "#000",
    total: 1500,
  },
  {
    id: 4,
    title: "Holiday",
    color: "#000",
    total: 5100,
  },
];

export default function Home({color, title, amount}) {
  return (
    <main className="container max-w-2xl px-6 mx-auto">
      <section className="py-3">
        <small className="text-grey-400 text-md">My Balance</small>
        <h2 className="text-4xl font-blod">{currencyFormatter(1000000)}</h2>
      </section>

      <section className="flex items-center gap-2 py-3">
        <button className="btn btn-primary">+ Expense</button>
        <button className="btn btn-primary-outline">+ Income</button>
      </section>

      {/* Expense */}
      <section className='py-6'>
        <h3 className='text-2xl'>My Expenses</h3>
        <div className='flex flex-col gap-4 mt-6'>
          {DUMMY_DATA.map(expense => {
            return (
              <ExpenseCategoryItem 
                color={expense.color}
                title={expense.title}
                amount={expense.total}
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

  );
}
