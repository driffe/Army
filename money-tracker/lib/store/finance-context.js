"use client";
import { createContext, useState, useEffect } from "react";
//Firebase
import { db } from '@/lib/firebase';
import { collection, addDoc, getDocs, doc, deleteDoc, updateDoc} from 'firebase/firestore';


export const financeContext = createContext({
    income: [],
    expenses: [],
    addIncomeItem: async () => {},
    removeIncomeItem: async () => {},
    addExpenseItem: async () => {},
});

export default function FinanceContextProvider({children}) {
    const [income, setIncome] = useState([]);
    const [expenses, setExpenses] = useState([]);
    const addExpenseItem = async(expenseCategoryId, newExpense) => {
      const docRef = doc(db, "expenses", expenseCategoryId)

      try {
        await updateDoc(db, {...newExpense})

        //Update State
        setExpenses(prevState => {
          const updatedExpenses = [...prevState];

          const foundIndex = updatedExpenses.find(expense => {
            return expense.id === expenseCategoryId
          });
          updatedExpenses[foundIndex] = {id: expenseCategoryId, ...newExpense}

          return updatedExpenses;
        })
      } catch (error) {
        throw error
      }
    };


    const addIncomeItem = async (newIncome) => { 
        const collectionRef = collection(db, "income");
        
        try {
          const docSnap = await addDoc(collectionRef, newIncome)
    
          //Update State
          setIncome(prevState => {
            return [
              ...prevState,
              {
                id: docSnap.id,
                ...newIncome,
              },
            ];
          });
    
        } catch (error) {
          console.log(error.message);
          throw error
        }
    };
    
    const removeIncomeItem = async (incomeId) => {
        const docRef = doc(db, 'income', incomeId);
        try {
          await deleteDoc(docRef);
          setIncome(prevState => {
            return prevState.filter(i => i.id !== incomeId);
          })
          //Update State
    
        } catch (error) {
          console.log(error.message);
          throw error
        }
    };

    const values = {income, expenses, addIncomeItem, removeIncomeItem, addExpenseItem};

    useEffect(() => {
        const getIncomeData = async () => {
            const collectionRef = collection(db,'income');
            const docsSnap = await getDocs(collectionRef);

            const data = docsSnap.docs.map((doc) => {
            return {
                id: doc.id,
                ...doc.data(),
                createdAt: new Date(),
            };
            });
            setIncome(data);
        };
        const getExpensesData = async () => {
          const collectionRef = collection(db, 'expenses');
          const docsSnap = await getDocs(collectionRef);

          const data = docsSnap.docs.map((doc) => {
            return {
              id: doc.id,
              ...doc.data()
            };
          });
          setExpenses(data);
        }
        getIncomeData();
        getExpensesData();
    }, []);

    return <financeContext.Provider value={values}>
        {children}
    </financeContext.Provider>
}