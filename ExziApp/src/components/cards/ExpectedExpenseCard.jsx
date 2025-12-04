//DO NOT DELETE

import { VscKebabVertical } from "react-icons/vsc"
import PaymentStatusSelector from "../form_components/PaymentStatusSelector"
import EditExpectedExpense from "../menus/EditExpectedExpense"
import CategorySelector from "../form_components/CategorySelector"
import BaseMenu from "../menus/BaseMenu"

const people = [
  { id: 1, name: 'Durward Reynolds' },
  { id: 2, name: 'Kenton Towne' },
  { id: 3, name: 'Therese Wunsch' },
  { id: 4, name: 'Benedict Kessler' },
  { id: 5, name: 'Katelyn Rohan' },
]

const ExpectedExpenseCard = ({expected_expense}) => {
    return (
        <div className="flex w-full bg-[#0d1518] items-center justify-between">
            <div className="grid  grid-cols-6 grid-rows-1 rounded-lg gap-4 w-[80%] p-4 sticky">
                <p className="col-start-1 col-end-2">{expected_expense.title}</p>
                <p className="col-start-2 col-end-3">{expected_expense.amount}</p>
                <p className="col-start-3 col-end-4">{expected_expense.deadline}</p>
                <div className="col-start-4 col-end-5">
                    <CategorySelector categoryList={people}/>
                </div>
                <div className="col-start-5 col-end-6">
                    <CategorySelector categoryList={people}/>
                </div>
                <div className="col-start-6 col-end-7">
                    <PaymentStatusSelector />
                </div>
            </div>
            <div className="flex w-[20%] items-center p-4 justify-around">
                <button className="p-2 bg-[#447083] rounded-lg">Pay here</button>
                <BaseMenu category_type="reserved_expense" expected_expense={expected_expense}/>
            </div>
        </div>
    )
}

export default ExpectedExpenseCard 