import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AdminAuthGate from '@/components/blog/AdminAuthGate';
import BlogEditor from '@/components/blog/BlogEditor';
import AccessTokenManager from '@/components/admin/AccessTokenManager';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const AdminBlog = () => {
  const [isBlackTheme, setIsBlackTheme] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Admin | Blog';
  }, []);

  const toggleTheme = () => {
    setIsBlackTheme(!isBlackTheme);
    document.documentElement.classList.toggle('black', !isBlackTheme);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar isBlackTheme={isBlackTheme} onThemeToggle={toggleTheme} />
      <main className="container mx-auto px-4 md:px-6 pt-28 pb-16">
        <h1 className="text-3xl font-bold font-display text-gradient mb-8">Admin Panel</h1>
        <AdminAuthGate>
          <Tabs defaultValue="blog" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="blog">Blog Posts</TabsTrigger>
              <TabsTrigger value="access">Access Links</TabsTrigger>
            </TabsList>
            <TabsContent value="blog">
              <BlogEditor />
            </TabsContent>
            <TabsContent value="access">
              <AccessTokenManager />
            </TabsContent>
          </Tabs>
        </AdminAuthGate>
      </main>
      <Footer />
    </div>
  );
};

export default AdminBlog;
