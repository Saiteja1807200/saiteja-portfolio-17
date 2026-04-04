import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ImagePlus, X, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface BlogImageUploadProps {
  value: string;
  onChange: (url: string) => void;
}

const BlogImageUpload = ({ value, onChange }: BlogImageUploadProps) => {
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      // Compress if needed (resize to max 1200px width)
      const compressed = await compressImage(file, 1200);
      const ext = file.name.split('.').pop();
      const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

      const { error } = await supabase.storage
        .from('blog-images')
        .upload(path, compressed, { contentType: file.type });

      if (error) throw error;

      const { data: { publicUrl } } = supabase.storage
        .from('blog-images')
        .getPublicUrl(path);

      onChange(publicUrl);
    } catch (err) {
      console.error('Upload failed:', err);
    } finally {
      setUploading(false);
    }
  };

  const compressImage = (file: File, maxWidth: number): Promise<Blob> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ratio = Math.min(maxWidth / img.width, 1);
        canvas.width = img.width * ratio;
        canvas.height = img.height * ratio;
        const ctx = canvas.getContext('2d')!;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        canvas.toBlob((blob) => resolve(blob!), 'image/webp', 0.85);
      };
      img.src = URL.createObjectURL(file);
    });
  };

  return (
    <div className="space-y-2">
      {value ? (
        <div className="relative rounded-lg overflow-hidden aspect-video">
          <img src={value} alt="Cover" className="h-full w-full object-cover" />
          <Button
            type="button"
            variant="destructive"
            size="icon"
            className="absolute top-2 right-2 h-8 w-8"
            onClick={() => onChange('')}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="w-full aspect-video rounded-lg border-2 border-dashed border-border/50 hover:border-primary/50 transition-colors flex flex-col items-center justify-center gap-2 text-muted-foreground hover:text-primary"
        >
          {uploading ? (
            <Loader2 className="h-8 w-8 animate-spin" />
          ) : (
            <>
              <ImagePlus className="h-8 w-8" />
              <span className="text-sm">Upload cover image</span>
            </>
          )}
        </button>
      )}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleUpload}
      />
    </div>
  );
};

export default BlogImageUpload;
