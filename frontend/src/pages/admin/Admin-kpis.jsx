import Header from "../../components/Header";
import { ArrowUp, ArrowDown, Users, UserMinus,CheckCheck, Clock, Minus } from 'lucide-react';

const AdminKpis = () => {
  return (
    <div className="bg-report dark:bg-reportdark min-h-screen">
      <Header />
      <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10 mt-14 sm:mt-16">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">

          <div className="rounded-sm border bg-white px-8 py-6 shadow-default dark:border-slate-600 dark:bg-boxdark">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-meta2 dark:bg-meta4">
              <CheckCheck size={16} className="text-fillprimary dark:text-fillwhite"/>
            </div>
            <div className="mt-4 flex items-end justify-between">
              <div>
                <h4 className="text-2xl font-bold text-black dark:text-white">30</h4>
                <span className="text-sm font-medium text-txtreport dark:text-txtreportdark">Total accepted visits</span>
              </div>
              <ArrowUp size={16} className="text-meta3"/>
            </div>
          </div>

          <div className="rounded-sm border bg-white px-8 py-6 shadow-default dark:border-slate-600 dark:bg-boxdark">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-meta2 dark:bg-meta4">
              <Clock size={16} className="text-fillprimary dark:text-fillwhite"/>
            </div>
            <div className="mt-4 flex items-end justify-between">
              <div>
                <h4 className="text-2xl font-bold text-black dark:text-white">30</h4>
                <span className="text-sm font-medium text-txtreport dark:text-txtreportdark">Total pending visits</span>
              </div>
              <ArrowDown size={16} className="text-meta5"/>
            </div>
          </div>

          <div className="rounded-sm border bg-white px-8 py-6 shadow-default dark:border-slate-600 dark:bg-boxdark">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-meta2 dark:bg-meta4">
              <Users size={16} className="text-fillprimary dark:text-fillwhite"/>
            </div>
            <div className="mt-4 flex items-end justify-between">
              <div>
                <h4 className="text-2xl font-bold text-black dark:text-white">30</h4>
                <span className="text-sm font-medium text-txtreport dark:text-txtreportdark">Total users</span>
              </div>
              <ArrowUp size={16} className="text-meta3"/>
            </div>
          </div>

          <div className="rounded-sm border bg-white px-8 py-6 shadow-default dark:border-slate-600 dark:bg-boxdark">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-meta2 dark:bg-meta4">
              <UserMinus size={16} className="text-fillprimary dark:text-fillwhite"/>
            </div>
            <div className="mt-4 flex items-end justify-between">
              <div>
                <h4 className="text-2xl font-bold text-black dark:text-white">30</h4>
                <span className="text-sm font-medium text-txtreport dark:text-txtreportdark">Total deactivated users</span>
              </div>
              <Minus size={16} className="text-meta6"/>
            </div>
          </div>


        </div>
      </div>
    </div>
  );
};

export default AdminKpis;
