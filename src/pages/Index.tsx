import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { checkAuth, logout } from '../store/authSlice';
import { LoginForm } from '../components/LoginForm';
import { RegisterForm } from '../components/RegisterForm';
import { TaskInput } from '../components/TaskInput';
import { TaskList } from '../components/TaskList';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Menu, Star, Calendar, Users, Plus, LogOut } from 'lucide-react';

const Index = () => {
  const [showLogin, setShowLogin] = useState(true);
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const { toast } = useToast();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logout());
    toast({
      title: "Logged out",
      description: "Come back soon!",
    });
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
        <div className="w-full max-w-md p-8">
          {showLogin ? (
            <LoginForm onSwitch={() => setShowLogin(false)} />
          ) : (
            <RegisterForm onSwitch={() => setShowLogin(true)} />
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border-r border-gray-200 dark:border-gray-700 flex flex-col shadow-lg">
        {/* User Profile */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-semibold text-lg">
              {user?.charAt(0)?.toUpperCase()}
            </div>
            <div className="flex flex-col">
              <span className="font-medium text-gray-900 dark:text-gray-100">Welcome back,</span>
              <span className="text-sm text-gray-600 dark:text-gray-400">{user}</span>
            </div>
          </div>
        </div>
        
        {/* Navigation */}
        <nav className="flex-1 p-6">
          <ul className="space-y-3">
            <li>
              <Button variant="ghost" className="w-full justify-start gap-3 hover:bg-purple-50 dark:hover:bg-gray-700/50">
                <Menu className="w-5 h-5" />
                All Tasks
              </Button>
            </li>
            <li>
              <Button variant="ghost" className="w-full justify-start gap-3 hover:bg-purple-50 dark:hover:bg-gray-700/50">
                <Calendar className="w-5 h-5" />
                Today
              </Button>
            </li>
            <li>
              <Button variant="ghost" className="w-full justify-start gap-3 hover:bg-purple-50 dark:hover:bg-gray-700/50">
                <Star className="w-5 h-5" />
                Important
              </Button>
            </li>
            <li>
              <Button variant="ghost" className="w-full justify-start gap-3 hover:bg-purple-50 dark:hover:bg-gray-700/50">
                <Users className="w-5 h-5" />
                Assigned to me
              </Button>
            </li>
          </ul>

          <div className="mt-8">
            <Button variant="ghost" className="w-full justify-start gap-3 text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-gray-700/50">
              <Plus className="w-5 h-5" />
              Add list
            </Button>
          </div>
        </nav>

        {/* Logout Button */}
        <div className="p-6 border-t border-gray-200 dark:border-gray-700">
          <Button 
            onClick={handleLogout} 
            variant="outline" 
            className="w-full gap-2 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/20"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-auto">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
            <TaskInput />
          </div>
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
            <TaskList />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;