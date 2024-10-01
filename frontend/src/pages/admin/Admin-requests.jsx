import { SquarePen , Trash2, BookPlus, Search } from 'lucide-react';

const AdminRequests = () => {
    return (
      <div>








        <div className="p-3 sm:p-5 antialiased">
          <div className="mx-auto max-w-screen-2xl px-4 lg:px-12">
            <div className="bg-white  relative shadow-md sm:rounded-lg overflow-hidden">
              <div className="p-4">
                <h2 className="text-center text-2xl font-bold md:text-4xl">Request Administration</h2>
              </div>
              <div className="flex flex-col md:flex-row items-stretch md:items-center md:space-x-3 space-y-3 md:space-y-0 justify-between mx-4 py-4 border-t dark:border-gray-700">  

                <button className="py-2 px-3 flex items-center text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 transition-all duration-500">{<BookPlus size={15} className="mr-2"/>}Add Request</button>
              
              </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-center text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-white uppercase bg-stone-900 ">
                      <tr>
                      <th scope="col" className="p-4">Id</th>
                      <th scope="col" className="p-4">Name</th>
                      <th scope="col" className="p-4">Lastname</th>
                      <th scope="col" className="p-4">Dni</th>
                      <th scope="col" className="p-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b dark:hover:bg-gray-300 transition-all duration-500">
                        <td className="px-4 py-3 font-medium whitespace-nowrap text-stone-900 ">1</td>
                        <td className="px-4 py-3 font-medium whitespace-nowrap text-stone-900 ">name</td>
                        <td className="px-4 py-3 font-medium whitespace-nowrap text-stone-900 ">lastname</td>
                        <td className="px-4 py-3 font-medium whitespace-nowrap text-stone-900 ">12345678</td>
                        <td className="px-4 py-3 font-medium whitespace-nowrap text-stone-900 ">
                          <div className="flex items-center space-x-4">
                          <button className="py-2 px-3 flex items-center text-sm font-medium text-center border border-blue-700 rounded-lg text-blue-700 hover:text-white bg-transparent hover:bg-blue-700 transition-all duration-500">{<SquarePen size={15} className="mr-2"/>}Edit</button>
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

      </div>
    )
  }
  
  export default AdminRequests