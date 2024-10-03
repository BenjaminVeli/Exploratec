import { SquarePen , Trash2 } from 'lucide-react';
import Header from "../../components/Header";


const AdminUsers = () => {
  return (
    <div>
      <Header />


       


      <div className="bg-white  relative shadow-md sm:rounded-lg overflow-hidden">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
          
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-center text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-white uppercase bg-stone-900 ">
                <tr>
                <th scope="col" className="p-4">Id</th>
                <th scope="col" className="p-4">User</th>
                <th scope="col" className="p-4">Email</th>
                <th scope="col" className="p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b dark:hover:bg-gray-300 transition-all duration-500">
                  <td className="px-4 py-3 font-medium whitespace-nowrap text-stone-900 ">1</td>
                  <td className="px-4 py-3 font-medium whitespace-nowrap text-stone-900 ">name</td>
                  <td className="px-4 py-3 font-medium whitespace-nowrap text-stone-900 ">example@gmail.com</td>
                  <td className="px-4 py-3 font-medium whitespace-nowrap text-stone-900 ">
                    <div className="flex items-center space-x-4">
                    <button className="py-2 px-3 flex items-center text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 transition-all duration-500">{<SquarePen size={15} className="mr-2"/>}Edit</button>
                    <button className="py-2 px-3 flex items-center text-sm font-medium text-center border border-red-700 rounded-lg text-red-700 hover:text-white bg-transparent hover:bg-red-700 transition-all duration-500">{<Trash2 size={15} className="mr-2"/>}Delete</button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

        </div>
      </div>


    </div>
  )
}

export default AdminUsers