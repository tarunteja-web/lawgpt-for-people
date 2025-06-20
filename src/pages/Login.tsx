
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Store user data and navigate to welcome
    localStorage.setItem('userName', formData.name || formData.email.split('@')[0]);
    navigate('/welcome');
  };

  const handleSocialLogin = (provider: string) => {
    console.log(`Login with ${provider}`);
    // Mock social login
    localStorage.setItem('userName', 'User');
    navigate('/welcome');
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white border border-gray-200 shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-black">
            {isLogin ? 'Welcome Back' : 'Join LawGPT'}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <Label htmlFor="name" className="text-black">Name</Label>
                <Input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="bg-white border-gray-300 text-black focus:border-gray-400"
                  required
                />
              </div>
            )}
            
            <div>
              <Label htmlFor="email" className="text-black">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="bg-white border-gray-300 text-black focus:border-gray-400"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="password" className="text-black">Password</Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                className="bg-white border-gray-300 text-black focus:border-gray-400"
                required
              />
            </div>
            
            <Button type="submit" className="w-full bg-black text-white hover:bg-gray-800">
              {isLogin ? 'Sign In' : 'Sign Up'}
            </Button>
          </form>
          
          <div className="text-center">
            <p className="text-gray-500 mb-4">Or sign up with</p>
            <div className="flex justify-center space-x-4">
              <Button
                variant="outline"
                onClick={() => handleSocialLogin('Google')}
                className="bg-white border-gray-300 text-black hover:bg-gray-50"
              >
                Google
              </Button>
              <Button
                variant="outline"
                onClick={() => handleSocialLogin('Facebook')}
                className="bg-white border-gray-300 text-black hover:bg-gray-50"
              >
                Facebook
              </Button>
              <Button
                variant="outline"
                onClick={() => handleSocialLogin('X')}
                className="bg-white border-gray-300 text-black hover:bg-gray-50"
              >
                X
              </Button>
            </div>
          </div>
          
          <div className="text-center">
            <Button
              variant="link"
              onClick={() => setIsLogin(!isLogin)}
              className="text-gray-600 hover:text-black"
            >
              {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
