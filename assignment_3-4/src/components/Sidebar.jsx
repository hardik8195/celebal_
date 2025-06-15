import { FiMenu, FiX, FiShoppingBag, FiShoppingCart, FiUsers, FiUser, FiCalendar, FiGrid, FiEdit, FiBarChart2, FiPieChart, FiTrendingUp, FiBarChart } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toggleSidebar } from '../store/features/sidebarSlice';

const Sidebar = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state?.sidebar?.isOpen ?? false);

  const handleToggleSidebar = () => {
    dispatch(toggleSidebar());
  };

  return (
    <>
      {/* Hamburger Button */}
      <button
        onClick={handleToggleSidebar}
        className="fixed top-4 left-4 z-50 p-2 rounded-md hover:bg-gray-100"
      >
        {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Removed Logo Section */}
        <div className="sticky top-0 z-10 h-16 px-4 bg-white border-b"></div>

        {/* Scrollable Navigation */}
        <div className="h-[calc(100vh-4rem)] overflow-y-auto">
          <div className="p-4">
            <nav>
              <ul className="space-y-6">
                {/* Dashboard Section */}
                <li>
                  <div className="mb-2 text-sm font-semibold text-gray-500 uppercase">Dashboard</div>
                  <Link
                    to="/ecommerce"
                    className="flex items-center px-4 py-2 text-gray-700 rounded-md hover:bg-gray-100"
                  >
                    <FiShoppingBag className="w-5 h-5" />
                    <span className="ml-3">Ecommerce</span>
                  </Link>
                </li>

                {/* Pages Section */}
                <li>
                  <div className="mb-2 text-sm font-semibold text-gray-500 uppercase">Pages</div>
                  <div className="space-y-1">
                    <Link
                      to="/orders"
                      className="flex items-center px-4 py-2 text-gray-700 rounded-md hover:bg-gray-100"
                    >
                      <FiShoppingCart className="w-5 h-5" />
                      <span className="ml-3">Orders</span>
                    </Link>
                    <Link
                      to="/employees"
                      className="flex items-center px-4 py-2 text-gray-700 rounded-md hover:bg-gray-100"
                    >
                      <FiUsers className="w-5 h-5" />
                      <span className="ml-3">Employees</span>
                    </Link>
                    <Link
                      to="/customers"
                      className="flex items-center px-4 py-2 text-gray-700 rounded-md hover:bg-gray-100"
                    >
                      <FiUser className="w-5 h-5" />
                      <span className="ml-3">Customers</span>
                    </Link>
                  </div>
                </li>

                {/* Apps Section */}
                <li>
                  <div className="mb-2 text-sm font-semibold text-gray-500 uppercase">Apps</div>
                  <div className="space-y-1">
                    <Link
                      to="/calendar"
                      className="flex items-center px-4 py-2 text-gray-700 rounded-md hover:bg-gray-100"
                    >
                      <FiCalendar className="w-5 h-5" />
                      <span className="ml-3">Calendar</span>
                    </Link>
                    <Link
                      to="/kanban"
                      className="flex items-center px-4 py-2 text-gray-700 rounded-md hover:bg-gray-100"
                    >
                      <FiGrid className="w-5 h-5" />
                      <span className="ml-3">Kanban</span>
                    </Link>
                    <Link
                      to="/editor"
                      className="flex items-center px-4 py-2 text-gray-700 rounded-md hover:bg-gray-100"
                    >
                      <FiEdit className="w-5 h-5" />
                      <span className="ml-3">Editor</span>
                    </Link>
                  </div>
                </li>

                {/* Charts Section */}
                <li>
                  <div className="mb-2 text-sm font-semibold text-gray-500 uppercase">Charts</div>
                  <div className="space-y-1">
                    <Link
                      to="/charts/line"
                      className="flex items-center px-4 py-2 text-gray-700 rounded-md hover:bg-gray-100"
                    >
                      <FiTrendingUp className="w-5 h-5" />
                      <span className="ml-3">Line</span>
                    </Link>
                    <Link
                      to="/charts/area"
                      className="flex items-center px-4 py-2 text-gray-700 rounded-md hover:bg-gray-100"
                    >
                      <FiBarChart2 className="w-5 h-5" />
                      <span className="ml-3">Area</span>
                    </Link>
                    <Link
                      to="/charts/bar"
                      className="flex items-center px-4 py-2 text-gray-700 rounded-md hover:bg-gray-100"
                    >
                      <FiBarChart className="w-5 h-5" />
                      <span className="ml-3">Bar</span>
                    </Link>
                    <Link
                      to="/charts/pie"
                      className="flex items-center px-4 py-2 text-gray-700 rounded-md hover:bg-gray-100"
                    >
                      <FiPieChart className="w-5 h-5" />
                      <span className="ml-3">Pie</span>
                    </Link>
                  </div>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar; 