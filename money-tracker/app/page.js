import {currencyFormatter} from '@/lib/utils'
import ExpenseCategoryItem from '@/components/ExpenseCategory';

const DUMMY_DATA = [
  {
    id: 1,
    title: "Entertainment",
    color: "#000",
    amount: 500,
  },
  {
    id: 2,
    title: "Gass",
    color: "#000",
    amount: 5600,
  },
  {
    id: 3,
    title: "Fuel",
    color: "#000",
    amount: 1500,
  },
  {
    id: 4,
    title: "Holiday",
    color: "#000",
    amount: 5100,
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
                amount={expense.amount}
              />
            );
          })}
        </div>
      </section>
    </main>

  );
}
