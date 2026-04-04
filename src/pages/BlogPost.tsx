import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BlogDetail from '@/components/blog/BlogDetail';
import { supabase } from '@/integrations/supabase/client';
import { Tables } from '@/integrations/supabase/types';
import { Loader2 } from 'lucide-react';

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [isBlackTheme, setIsBlackTheme] = useState(false);
  const [post, setPost] = useState<Tables<'blog_posts'> | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const toggleTheme = () => {
    setIsBlackTheme(!isBlackTheme);
    document.documentElement.classList.toggle('black', !isBlackTheme);
  };

  useEffect(() => {
    const fetchPost = async () => {
      if (!slug) return;
      const { data } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('slug', slug)
        .eq('published', true)
        .maybeSingle();

      if (!data) {
        navigate('/blog', { replace: true });
        return;
      }
      setPost(data);
      setLoading(false);
    };
    fetchPost();
  }, [slug, navigate]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar isBlackTheme={isBlackTheme} onThemeToggle={toggleTheme} />
      <main className="container mx-auto px-4 md:px-6 pt-28 pb-16">
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : post ? (
          <BlogDetail post={post} />
        ) : null}
      </main>
      <Footer />
    </div>
  );
};

export default BlogPost;
