
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white/10 backdrop-blur-md border-gray-700 text-white">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">
            {isLogin ? 'Welcome Back' : 'Join LawGPT'}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="bg-white/10 border-gray-600 text-white"
                  required
                />
              </div>
            )}
            
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="bg-white/10 border-gray-600 text-white"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                className="bg-white/10 border-gray-600 text-white"
                required
              />
            </div>
            
            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
              {isLogin ? 'Sign In' : 'Sign Up'}
            </Button>
          </form>
          
          <div className="text-center">
            <p className="text-gray-400 mb-4">Or sign up with</p>
            <div className="flex justify-center space-x-4">
              <Button
                variant="outline"
                onClick={() => handleSocialLogin('Google')}
                className="bg-white/10 border-gray-600 text-white hover:bg-white/20"
              >
                Google
              </Button>
              <Button
                variant="outline"
                onClick={() => handleSocialLogin('Facebook')}
                className="bg-white/10 border-gray-600 text-white hover:bg-white/20"
              >
                Facebook
              </Button>
              <Button
                variant="outline"
                onClick={() => handleSocialLogin('X')}
                className="bg-white/10 border-gray-600 text-white hover:bg-white/20"
              >
                X
              </Button>
            </div>
          </div>
          
          <div className="text-center">
            <Button
              variant="link"
              onClick={() => setIsLogin(!isLogin)}
              className="text-blue-400 hover:text-blue-300"
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
