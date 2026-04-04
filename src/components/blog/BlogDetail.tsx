import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Calendar } from 'lucide-react';
import { Tables } from '@/integrations/supabase/types';

interface BlogDetailProps {
  post: Tables<'blog_posts'>;
}

const BlogDetail = ({ post }: BlogDetailProps) => {
  const formattedDate = new Date(post.created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  useEffect(() => {
    document.title = `${post.title} | Saiteja`;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute('content', post.meta_description || post.excerpt || '');
    }
    return () => {
      document.title = 'Saiteja';
    };
  }, [post]);

  return (
    <article className="max-w-3xl mx-auto">
      <Link
        to="/blog"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
      >
        <ArrowLeft className="h-4 w-4" /> Back to Blog
      </Link>

      {post.cover_image_url && (
        <div className="aspect-video rounded-lg overflow-hidden mb-8">
          <img
            src={post.cover_image_url}
            alt={post.title}
            className="h-full w-full object-cover"
          />
        </div>
      )}

      <div className="space-y-4 mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground">{post.title}</h1>
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4" />
          <span>{formattedDate}</span>
        </div>
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="secondary">{tag}</Badge>
            ))}
          </div>
        )}
      </div>

      <div
        className="prose prose-invert prose-primary max-w-none
          prose-headings:text-foreground prose-p:text-muted-foreground
          prose-a:text-primary prose-strong:text-foreground
          prose-code:text-primary prose-code:bg-secondary/50 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
          prose-pre:bg-secondary/50 prose-pre:border prose-pre:border-border/50
          prose-img:rounded-lg prose-blockquote:border-primary/50"
        dangerouslySetInnerHTML={{ __html: post.content || '' }}
      />
    </article>
  );
};

export default BlogDetail;
