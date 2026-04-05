import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2, Save, Trash2, Plus, X, Edit3 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Tables } from '@/integrations/supabase/types';
import BlogImageUpload from './BlogImageUpload';
import RichTextEditor from './RichTextEditor';
import './RichTextEditor.css';
import { useToast } from '@/hooks/use-toast';

const generateSlug = (title: string) =>
  title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

const BlogEditor = () => {
  const { toast } = useToast();
  const [posts, setPosts] = useState<Tables<'blog_posts'>[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [preview, setPreview] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [tagInput, setTagInput] = useState('');

  const [form, setForm] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    cover_image_url: '',
    tags: [] as string[],
    published: false,
    meta_description: '',
  });

  const fetchPosts = async () => {
    const { data } = await supabase
      .from('blog_posts')
      .select('*')
      .order('created_at', { ascending: false });
    if (data) setPosts(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const resetForm = () => {
    setForm({
      title: '',
      slug: '',
      excerpt: '',
      content: '',
      cover_image_url: '',
      tags: [],
      published: false,
      meta_description: '',
    });
    setEditingId(null);
    setTagInput('');
  };

  const editPost = (post: Tables<'blog_posts'>) => {
    setForm({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt || '',
      content: post.content || '',
      cover_image_url: post.cover_image_url || '',
      tags: post.tags || [],
      published: post.published,
      meta_description: post.meta_description || '',
    });
    setEditingId(post.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSave = async () => {
    if (!form.title || !form.slug) {
      toast({ title: 'Title and slug are required', variant: 'destructive' });
      return;
    }

    setSaving(true);
    try {
      if (editingId) {
        const { error } = await supabase
          .from('blog_posts')
          .update(form)
          .eq('id', editingId);
        if (error) throw error;
        toast({ title: 'Post updated!' });
      } else {
        const { error } = await supabase
          .from('blog_posts')
          .insert(form);
        if (error) throw error;
        toast({ title: 'Post created!' });
      }
      resetForm();
      fetchPosts();
    } catch (err: any) {
      toast({ title: 'Error', description: err.message, variant: 'destructive' });
    }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this post?')) return;
    await supabase.from('blog_posts').delete().eq('id', id);
    fetchPosts();
    if (editingId === id) resetForm();
    toast({ title: 'Post deleted' });
  };

  const addTag = () => {
    const tag = tagInput.trim();
    if (tag && !form.tags.includes(tag)) {
      setForm({ ...form, tags: [...form.tags, tag] });
    }
    setTagInput('');
  };

  const removeTag = (tag: string) => {
    setForm({ ...form, tags: form.tags.filter((t) => t !== tag) });
  };

  return (
    <div className="space-y-8">
      {/* Editor Form */}
      <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
        <CardContent className="p-6 space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-foreground">
              {editingId ? 'Edit Post' : 'New Post'}
            </h2>
            {editingId && (
              <Button variant="ghost" size="sm" onClick={resetForm}>
                <Plus className="h-4 w-4 mr-1" /> New
              </Button>
            )}
          </div>

          <BlogImageUpload
            value={form.cover_image_url}
            onChange={(url) => setForm({ ...form, cover_image_url: url })}
          />

          <Input
            placeholder="Post title"
            value={form.title}
            onChange={(e) =>
              setForm({
                ...form,
                title: e.target.value,
                slug: editingId ? form.slug : generateSlug(e.target.value),
              })
            }
            className="bg-secondary/50 text-lg font-medium"
          />

          <Input
            placeholder="slug-url"
            value={form.slug}
            onChange={(e) => setForm({ ...form, slug: generateSlug(e.target.value) })}
            className="bg-secondary/50 text-sm font-mono"
          />

          <Input
            placeholder="Short excerpt (shown on card)"
            value={form.excerpt}
            onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
            className="bg-secondary/50"
          />

          <Input
            placeholder="Meta description (for SEO)"
            value={form.meta_description}
            onChange={(e) => setForm({ ...form, meta_description: e.target.value })}
            className="bg-secondary/50"
          />

          {/* Tags */}
          <div className="space-y-2">
            <div className="flex gap-2">
              <Input
                placeholder="Add tag..."
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                className="bg-secondary/50"
              />
              <Button type="button" variant="secondary" onClick={addTag}>
                Add
              </Button>
            </div>
            {form.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {form.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="gap-1">
                    {tag}
                    <X className="h-3 w-3 cursor-pointer" onClick={() => removeTag(tag)} />
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Rich Text Content Editor */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">Content</label>
            <RichTextEditor
              content={form.content}
              onChange={(html) => setForm({ ...form, content: html })}
            />
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 pt-2">
            <Button onClick={handleSave} disabled={saving}>
              {saving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Save className="h-4 w-4 mr-2" />}
              {editingId ? 'Update' : 'Save'}
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setForm({ ...form, published: !form.published });
              }}
            >
              {form.published ? 'Unpublish' : 'Publish'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Post list */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-foreground">All Posts</h3>
        {loading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
          </div>
        ) : posts.length === 0 ? (
          <p className="text-muted-foreground text-sm">No posts yet.</p>
        ) : (
          posts.map((post) => (
            <Card key={post.id} className="border-border/50 bg-card/30">
              <CardContent className="p-4 flex items-center justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-foreground">{post.title}</span>
                    <Badge variant={post.published ? 'default' : 'secondary'} className="text-xs">
                      {post.published ? 'Published' : 'Draft'}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">/{post.slug}</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon" onClick={() => editPost(post)}>
                    <Edit3 className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(post.id)}>
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default BlogEditor;
