import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BlogList from '@/components/blog/BlogList';
import { supabase } from '@/integrations/supabase/client';
import { Tables } from '@/integrations/supabase/types';

const POSTS_PER_PAGE = 9;

const Blog = () => {
  const [isBlackTheme, setIsBlackTheme] = useState(false);
  const [posts, setPosts] = useState<Tables<'blog_posts'>[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Blog | Saiteja';
  }, []);

  const toggleTheme = () => {
    setIsBlackTheme(!isBlackTheme);
    document.documentElement.classList.toggle('black', !isBlackTheme);
  };

  const fetchPosts = async (pageNum: number) => {
    setLoading(true);
    const from = pageNum * POSTS_PER_PAGE;
    const to = from + POSTS_PER_PAGE - 1;

    const { data } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('published', true)
      .order('created_at', { ascending: false })
      .range(from, to);

    if (data) {
      setPosts((prev) => (pageNum === 0 ? data : [...prev, ...data]));
      setHasMore(data.length === POSTS_PER_PAGE);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPosts(0);
  }, []);

  const loadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchPosts(nextPage);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar isBlackTheme={isBlackTheme} onThemeToggle={toggleTheme} />
      <main className="container mx-auto px-4 md:px-6 pt-28 pb-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold font-display text-gradient mb-4">Blog</h1>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Thoughts, tutorials, and insights on tech, AI, and development.
          </p>
        </div>
        <BlogList posts={posts} isLoading={loading} hasMore={hasMore} onLoadMore={loadMore} />
      </main>
      <Footer />
    </div>
  );
};

export default Blog;
