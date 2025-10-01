import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShoppingCart, Mail, Lock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import BG from '../assets/BG.png';
import Group from '../assets/Group.png';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const result = await login(formData.email, formData.password);
    setIsLoading(false);
    if (result.success) {
      navigate('/dashboard');
    }
  };

  return (
    <div 
      className="min-h-screen bg-blue-700 flex items-center justify-center p-4" 
      style={{ 
        backgroundImage: `url(${BG})`, 
        backgroundSize: 'cover', 
        backgroundPosition: 'center' 
      }}
    >
      <div className="w-full max-w-md">
        <div className="p-8">

          <div className="flex justify-center mb-10">
            <div className="p-4" >
              <img 
  src={Group} 
  style={{ width: '120px', height: '100px' }} 
/>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">

            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-300 w-5 h-5" />
              <input
                type="email"
                name="email"
                placeholder="EMAIL"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full bg-white bg-opacity-10 border border-white border-opacity-30 rounded px-10 py-3 text-white placeholder-blue-200 focus:outline-none focus:border-white focus:bg-opacity-20 transition"
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-300 w-5 h-5" />
              <input
                type="password"
                name="password"
                placeholder="PASSWORD"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full bg-white bg-opacity-10 border border-white border-opacity-30 rounded px-10 py-3 text-white placeholder-blue-200 focus:outline-none focus:border-white focus:bg-opacity-20 transition"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-white text-blue-600 font-semibold py-3 rounded hover:bg-blue-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'LOGGING IN...' : 'LOGIN'}
            </button>
          </form>

          <p className="text-white text-center mt-6">
            Don't have an account?{' '}
            <Link to="/signup" className="underline hover:text-blue-200">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;