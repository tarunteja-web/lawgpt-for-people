
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { getTranslations } from '@/utils/translations';

const Login = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('selectedLanguage') || 'en';
  });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const t = getTranslations(language);

  useEffect(() => {
    localStorage.setItem('selectedLanguage', language);
  }, [language]);

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
            {isLogin ? t.welcomeBack : t.joinLawGPT}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <Label htmlFor="name" className="text-black">{t.name}</Label>
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
              <Label htmlFor="email" className="text-black">{t.email}</Label>
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
              <Label htmlFor="password" className="text-black">{t.password}</Label>
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
              {isLogin ? t.signIn : t.signUp}
            </Button>
          </form>
          
          <div className="text-center">
            <p className="text-gray-500 mb-4">{t.orSignUpWith}</p>
            <div className="flex justify-center space-x-4">
              <Button
                variant="outline"
                onClick={() => handleSocialLogin('Google')}
                className="bg-white border-gray-300 text-black hover:bg-gray-50"
              >
                {t.google}
              </Button>
              <Button
                variant="outline"
                onClick={() => handleSocialLogin('Facebook')}
                className="bg-white border-gray-300 text-black hover:bg-gray-50"
              >
                {t.facebook}
              </Button>
              <Button
                variant="outline"
                onClick={() => handleSocialLogin('X')}
                className="bg-white border-gray-300 text-black hover:bg-gray-50"
              >
                {t.x}
              </Button>
            </div>
          </div>
          
          <div className="text-center">
            <Button
              variant="link"
              onClick={() => setIsLogin(!isLogin)}
              className="text-gray-600 hover:text-black"
            >
              {isLogin ? t.dontHaveAccount : t.alreadyHaveAccount}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
