import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import Image from '@tiptap/extension-image';
import Underline from '@tiptap/extension-underline';
import Strike from '@tiptap/extension-strike';
import Subscript from '@tiptap/extension-subscript';
import Superscript from '@tiptap/extension-superscript';
import TextAlign from '@tiptap/extension-text-align';
import Color from '@tiptap/extension-color';
import { TextStyle } from '@tiptap/extension-text-style';
import Highlight from '@tiptap/extension-highlight';
import FontFamily from '@tiptap/extension-font-family';
import Link from '@tiptap/extension-link';
import { Table } from '@tiptap/extension-table';
import TableRow from '@tiptap/extension-table-row';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import CodeBlock from '@tiptap/extension-code-block';
import CharacterCount from '@tiptap/extension-character-count';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { 
  Bold, 
  Italic, 
  Underline as UnderlineIcon, 
  Strikethrough,
  List, 
  ListOrdered, 
  Quote, 
  Heading1, 
  Heading2, 
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  ImageIcon,
  Undo,
  Redo,
  Code,
  Code2,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Link as LinkIcon,
  Table as TableIcon,
  Plus,
  Eye,
  EyeOff,
  Palette,
  Type,
  Subscript as SubscriptIcon,
  Superscript as SuperscriptIcon,
  MousePointer,
  Settings,
  FileText,
  Download,
  Upload
} from 'lucide-react';
import { useCallback, useState, useRef } from 'react';

interface AdvancedEditorProps {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
  className?: string;
}

// 顏色調色盤
const COLOR_PALETTE = [
  '#000000', '#434343', '#666666', '#999999', '#B7B7B7', '#CCCCCC', '#D9D9D9', '#EFEFEF', '#F3F3F3', '#FFFFFF',
  '#980000', '#FF0000', '#FF9900', '#FFFF00', '#00FF00', '#00FFFF', '#4A86E8', '#0000FF', '#9900FF', '#FF00FF',
  '#E6B8AF', '#F4CCCC', '#FCE5CD', '#FFF2CC', '#D9EAD3', '#D0E0E3', '#C9DAF8', '#CFE2F3', '#D9D2E9', '#EAD1DC',
  '#DD7E6B', '#EA9999', '#F9CB9C', '#FFE599', '#B6D7A8', '#A2C4C9', '#A4C2F4', '#9FC5E8', '#B4A7D6', '#D5A6BD',
  '#CC4125', '#E06666', '#F6B26B', '#FFD966', '#93C47D', '#76A5AF', '#6D9EEB', '#6FA8DC', '#8E7CC3', '#C27BA0',
  '#A61E4D', '#CC0000', '#E69138', '#F1C232', '#6AA84F', '#45818E', '#3C78D8', '#3D85C6', '#674EA7', '#A64D79'
];

// 字型選項
const FONT_FAMILIES = [
  { value: 'Arial', label: 'Arial' },
  { value: 'Helvetica', label: 'Helvetica' },
  { value: 'Times New Roman', label: 'Times New Roman' },
  { value: 'Georgia', label: 'Georgia' },
  { value: 'Verdana', label: 'Verdana' },
  { value: 'Courier New', label: 'Courier New' },
  { value: 'Trebuchet MS', label: 'Trebuchet MS' },
  { value: 'Impact', label: 'Impact' },
  { value: 'Comic Sans MS', label: 'Comic Sans MS' },
  { value: 'Microsoft JhengHei', label: '微軟正黑體' },
  { value: 'Noto Sans TC', label: 'Noto Sans TC' },
  { value: 'PingFang TC', label: 'PingFang TC' },
  { value: 'Source Han Sans', label: '思源黑體' },
  { value: 'serif', label: '襯線字體' },
  { value: 'sans-serif', label: '無襯線字體' },
  { value: 'monospace', label: '等寬字體' }
];

export default function AdvancedEditor({ 
  content, 
  onChange, 
  placeholder = "開始撰寫您的精彩故事...",
  className = ""
}: AdvancedEditorProps) {
  const [showPreview, setShowPreview] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isLinkDialogOpen, setIsLinkDialogOpen] = useState(false);
  const [isImageDialogOpen, setIsImageDialogOpen] = useState(false);
  const [currentTextColor, setCurrentTextColor] = useState('#000000');
  const [currentHighlightColor, setCurrentHighlightColor] = useState('#FFFF00');
  const [showAdvancedToolbar, setShowAdvancedToolbar] = useState(true);
  const [uploadingImage, setUploadingImage] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        codeBlock: false,
        heading: {
          levels: [1, 2, 3, 4, 5, 6],
        },
      }),
      CharacterCount,
      Placeholder.configure({
        placeholder,
        showOnlyWhenEditable: true,
        showOnlyCurrent: false,
      }),
      Image.configure({
        HTMLAttributes: {
          class: 'max-w-full h-auto rounded-lg my-4 shadow-sm block mx-auto cursor-pointer hover:shadow-md transition-shadow',
        },
        allowBase64: true,
      }),
      Underline,
      Strike,
      Subscript,
      Superscript,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Color.configure({
        types: [TextStyle.name],
      }),
      TextStyle,
      Highlight.configure({
        multicolor: true,
      }),
      FontFamily.configure({
        types: [TextStyle.name],
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-primary underline decoration-2 underline-offset-2 hover:text-primary/80 transition-colors cursor-pointer',
        },
      }),
      Table.configure({
        resizable: true,
        HTMLAttributes: {
          class: 'border-collapse border border-border my-4',
        },
      }),
      TableRow.configure({
        HTMLAttributes: {
          class: 'border border-border',
        },
      }),
      TableHeader.configure({
        HTMLAttributes: {
          class: 'border border-border bg-muted p-2 font-semibold',
        },
      }),
      TableCell.configure({
        HTMLAttributes: {
          class: 'border border-border p-2',
        },
      }),
      CodeBlock.configure({
        HTMLAttributes: {
          class: 'bg-muted rounded-lg p-4 font-mono text-sm my-4 overflow-x-auto border border-border',
        },
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'prose prose-lg max-w-none focus:outline-none min-h-[600px] px-8 py-6 [&_blockquote]:border-l-4 [&_blockquote]:border-primary/40 [&_blockquote]:bg-muted/30 [&_blockquote]:pl-6 [&_blockquote]:py-4 [&_blockquote]:my-6 [&_blockquote]:italic [&_blockquote]:text-muted-foreground [&_blockquote]:rounded-r-lg [&_blockquote]:shadow-sm [&_img]:max-w-full [&_img]:h-auto [&_img]:mx-auto [&_img]:block',
        style: 'font-family: inherit; line-height: 1.7;',
      },
    },
  });

  const addImage = useCallback(() => {
    if (imageUrl && editor) {
      editor.chain().focus().setImage({ src: imageUrl }).run();
      setImageUrl('');
      setIsImageDialogOpen(false);
    }
  }, [editor, imageUrl]);

  const handleImageUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && editor) {
      setUploadingImage(true);
      
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        editor.chain().focus().setImage({ src: result }).run();
        setUploadingImage(false);
        setIsImageDialogOpen(false);
      };
      reader.onerror = () => {
        setUploadingImage(false);
        console.error('圖片讀取失敗');
      };
      reader.readAsDataURL(file);
    }
    
    // 重置 input
    if (event.target) {
      event.target.value = '';
    }
  }, [editor]);

  const openImageUpload = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const addLink = useCallback(() => {
    if (linkUrl && editor) {
      const selectedText = editor.state.doc.textBetween(
        editor.state.selection.from,
        editor.state.selection.to
      );
      
      if (selectedText) {
        editor.chain().focus().setLink({ href: linkUrl }).run();
      } else {
        editor.chain().focus().insertContent(`<a href="${linkUrl}">${linkUrl}</a>`).run();
      }
      setLinkUrl('');
      setIsLinkDialogOpen(false);
    }
  }, [editor, linkUrl]);

  const insertTable = useCallback(() => {
    if (editor) {
      editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run();
    }
  }, [editor]);

  const setTextColor = useCallback((color: string) => {
    if (editor) {
      editor.chain().focus().setColor(color).run();
      setCurrentTextColor(color);
    }
  }, [editor]);

  const setHighlightColor = useCallback((color: string) => {
    if (editor) {
      editor.chain().focus().setHighlight({ color }).run();
      setCurrentHighlightColor(color);
    }
  }, [editor]);

  const exportContent = useCallback(() => {
    const htmlContent = editor?.getHTML() || '';
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'article.html';
    a.click();
    URL.revokeObjectURL(url);
  }, [editor]);

  if (!editor) {
    return null;
  }

  return (
    <div className={`relative bg-background border rounded-lg overflow-hidden ${className}`}>
      {/* 主工具欄 */}
      <div className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="p-3">
          {/* 第一行：格式與樣式 */}
          <div className="flex flex-wrap items-center gap-2 mb-2">
            {/* 段落格式 */}
            <Select 
              value={
                editor.isActive('heading', { level: 1 }) ? 'h1' :
                editor.isActive('heading', { level: 2 }) ? 'h2' :
                editor.isActive('heading', { level: 3 }) ? 'h3' :
                editor.isActive('heading', { level: 4 }) ? 'h4' :
                editor.isActive('heading', { level: 5 }) ? 'h5' :
                editor.isActive('heading', { level: 6 }) ? 'h6' :
                'paragraph'
              }
              onValueChange={(value) => {
                if (value === 'paragraph') {
                  editor.chain().focus().setParagraph().run();
                } else {
                  const level = parseInt(value.replace('h', '')) as 1 | 2 | 3 | 4 | 5 | 6;
                  editor.chain().focus().toggleHeading({ level }).run();
                }
              }}
            >
              <SelectTrigger className="w-28 h-8 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="paragraph">段落</SelectItem>
                <SelectItem value="h1">標題 1</SelectItem>
                <SelectItem value="h2">標題 2</SelectItem>
                <SelectItem value="h3">標題 3</SelectItem>
                <SelectItem value="h4">標題 4</SelectItem>
                <SelectItem value="h5">標題 5</SelectItem>
                <SelectItem value="h6">標題 6</SelectItem>
              </SelectContent>
            </Select>

            {/* 字型選擇 */}
            <Select 
              onValueChange={(value) => {
                editor.chain().focus().setFontFamily(value).run();
              }}
            >
              <SelectTrigger className="w-32 h-8 text-xs">
                <SelectValue placeholder="字型" />
              </SelectTrigger>
              <SelectContent>
                {FONT_FAMILIES.map((font) => (
                  <SelectItem 
                    key={font.value} 
                    value={font.value}
                    style={{ fontFamily: font.value }}
                  >
                    {font.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Separator orientation="vertical" className="h-6" />

            {/* 基本格式 */}
            <div className="flex items-center gap-1">
              <Button
                variant={editor.isActive('bold') ? 'default' : 'ghost'}
                size="sm"
                onClick={() => editor.chain().focus().toggleBold().run()}
                title="粗體 (Ctrl+B)"
              >
                <Bold className="h-4 w-4" />
              </Button>
              <Button
                variant={editor.isActive('italic') ? 'default' : 'ghost'}
                size="sm"
                onClick={() => editor.chain().focus().toggleItalic().run()}
                title="斜體 (Ctrl+I)"
              >
                <Italic className="h-4 w-4" />
              </Button>
              <Button
                variant={editor.isActive('underline') ? 'default' : 'ghost'}
                size="sm"
                onClick={() => editor.chain().focus().toggleUnderline().run()}
                title="底線 (Ctrl+U)"
              >
                <UnderlineIcon className="h-4 w-4" />
              </Button>
              <Button
                variant={editor.isActive('strike') ? 'default' : 'ghost'}
                size="sm"
                onClick={() => editor.chain().focus().toggleStrike().run()}
                title="刪除線"
              >
                <Strikethrough className="h-4 w-4" />
              </Button>
              <Button
                variant={editor.isActive('subscript') ? 'default' : 'ghost'}
                size="sm"
                onClick={() => editor.chain().focus().toggleSubscript().run()}
                title="下標"
              >
                <SubscriptIcon className="h-4 w-4" />
              </Button>
              <Button
                variant={editor.isActive('superscript') ? 'default' : 'ghost'}
                size="sm"
                onClick={() => editor.chain().focus().toggleSuperscript().run()}
                title="上標"
              >
                <SuperscriptIcon className="h-4 w-4" />
              </Button>
              <Button
                variant={editor.isActive('code') ? 'default' : 'ghost'}
                size="sm"
                onClick={() => editor.chain().focus().toggleCode().run()}
                title="行內程式碼"
              >
                <Code className="h-4 w-4" />
              </Button>
            </div>

            <Separator orientation="vertical" className="h-6" />

            {/* 顏色工具 */}
            <div className="flex items-center gap-1">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="ghost" size="sm" className="gap-1" title="文字顏色">
                    <Type className="h-4 w-4" />
                    <div 
                      className="w-3 h-3 rounded border border-border"
                      style={{ backgroundColor: currentTextColor }}
                    />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-72">
                  <div className="space-y-3">
                    <Label className="text-sm font-medium">文字顏色</Label>
                    <div className="grid grid-cols-10 gap-1">
                      {COLOR_PALETTE.map((color) => (
                        <button
                          key={color}
                          className="w-6 h-6 rounded border border-border hover:scale-110 transition-transform"
                          style={{ backgroundColor: color }}
                          onClick={() => setTextColor(color)}
                          title={color}
                        />
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Input
                        type="color"
                        value={currentTextColor}
                        onChange={(e) => setTextColor(e.target.value)}
                        className="w-16 h-8 p-0 border-0"
                      />
                      <Input
                        type="text"
                        value={currentTextColor}
                        onChange={(e) => setTextColor(e.target.value)}
                        placeholder="#000000"
                        className="flex-1 text-xs"
                      />
                    </div>
                  </div>
                </PopoverContent>
              </Popover>

              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="ghost" size="sm" className="gap-1" title="背景顏色">
                    <Palette className="h-4 w-4" />
                    <div 
                      className="w-3 h-3 rounded border border-border"
                      style={{ backgroundColor: currentHighlightColor }}
                    />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-72">
                  <div className="space-y-3">
                    <Label className="text-sm font-medium">背景顏色</Label>
                    <div className="grid grid-cols-10 gap-1">
                      {COLOR_PALETTE.map((color) => (
                        <button
                          key={color}
                          className="w-6 h-6 rounded border border-border hover:scale-110 transition-transform"
                          style={{ backgroundColor: color }}
                          onClick={() => setHighlightColor(color)}
                          title={color}
                        />
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Input
                        type="color"
                        value={currentHighlightColor}
                        onChange={(e) => setHighlightColor(e.target.value)}
                        className="w-16 h-8 p-0 border-0"
                      />
                      <Input
                        type="text"
                        value={currentHighlightColor}
                        onChange={(e) => setHighlightColor(e.target.value)}
                        placeholder="#FFFF00"
                        className="flex-1 text-xs"
                      />
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => editor.chain().focus().unsetHighlight().run()}
                      className="w-full"
                    >
                      清除背景色
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {/* 第二行：對齊與列表 */}
          <div className="flex flex-wrap items-center gap-2">
            {/* 對齊 */}
            <div className="flex items-center gap-1">
              <Button
                variant={editor.isActive({ textAlign: 'left' }) ? 'default' : 'ghost'}
                size="sm"
                onClick={() => editor.chain().focus().setTextAlign('left').run()}
                title="靠左對齊"
              >
                <AlignLeft className="h-4 w-4" />
              </Button>
              <Button
                variant={editor.isActive({ textAlign: 'center' }) ? 'default' : 'ghost'}
                size="sm"
                onClick={() => editor.chain().focus().setTextAlign('center').run()}
                title="置中對齊"
              >
                <AlignCenter className="h-4 w-4" />
              </Button>
              <Button
                variant={editor.isActive({ textAlign: 'right' }) ? 'default' : 'ghost'}
                size="sm"
                onClick={() => editor.chain().focus().setTextAlign('right').run()}
                title="靠右對齊"
              >
                <AlignRight className="h-4 w-4" />
              </Button>
              <Button
                variant={editor.isActive({ textAlign: 'justify' }) ? 'default' : 'ghost'}
                size="sm"
                onClick={() => editor.chain().focus().setTextAlign('justify').run()}
                title="分散對齊"
              >
                <AlignJustify className="h-4 w-4" />
              </Button>
            </div>

            <Separator orientation="vertical" className="h-6" />

            {/* 列表與引用 */}
            <div className="flex items-center gap-1">
              <Button
                variant={editor.isActive('bulletList') ? 'default' : 'ghost'}
                size="sm"
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                title="無序列表"
              >
                <List className="h-4 w-4" />
              </Button>
              <Button
                variant={editor.isActive('orderedList') ? 'default' : 'ghost'}
                size="sm"
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                title="有序列表"
              >
                <ListOrdered className="h-4 w-4" />
              </Button>
              <Button
                variant={editor.isActive('blockquote') ? 'default' : 'ghost'}
                size="sm"
                onClick={() => editor.chain().focus().toggleBlockquote().run()}
                title="引用區塊"
              >
                <Quote className="h-4 w-4" />
              </Button>
              <Button
                variant={editor.isActive('codeBlock') ? 'default' : 'ghost'}
                size="sm"
                onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                title="程式碼區塊"
              >
                <Code2 className="h-4 w-4" />
              </Button>
            </div>

            <Separator orientation="vertical" className="h-6" />

            {/* 插入功能 */}
            <div className="flex items-center gap-1">
              <Dialog open={isLinkDialogOpen} onOpenChange={setIsLinkDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="sm" title="插入連結">
                    <LinkIcon className="h-4 w-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>插入連結</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="link-url">連結網址</Label>
                      <Input
                        id="link-url"
                        value={linkUrl}
                        onChange={(e) => setLinkUrl(e.target.value)}
                        placeholder="https://example.com"
                        autoFocus
                      />
                    </div>
                    <Button onClick={addLink} className="w-full">
                      插入連結
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>

              <Dialog open={isImageDialogOpen} onOpenChange={setIsImageDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="sm" title="插入圖片">
                    <ImageIcon className="h-4 w-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>插入圖片</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <Tabs defaultValue="upload" className="w-full">
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="upload">本地上傳</TabsTrigger>
                        <TabsTrigger value="url">網址連結</TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="upload" className="space-y-4">
                        <div className="flex flex-col items-center justify-center border-2 border-dashed border-border rounded-lg p-6 hover:bg-muted/50 transition-colors">
                          <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                          <p className="text-sm text-muted-foreground text-center mb-4">
                            點擊選擇圖片或拖拽圖片到此處
                          </p>
                          <Button 
                            onClick={openImageUpload} 
                            disabled={uploadingImage}
                            className="w-full"
                          >
                            {uploadingImage ? '上傳中...' : '選擇圖片'}
                          </Button>
                          <p className="text-xs text-muted-foreground mt-2">
                            支援 JPG、PNG、GIF、WebP 格式
                          </p>
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="url" className="space-y-4">
                        <div>
                          <Label htmlFor="image-url">圖片網址</Label>
                          <Input
                            id="image-url"
                            value={imageUrl}
                            onChange={(e) => setImageUrl(e.target.value)}
                            placeholder="https://example.com/image.jpg"
                            autoFocus
                          />
                        </div>
                        <Button onClick={addImage} className="w-full" disabled={!imageUrl}>
                          插入圖片
                        </Button>
                      </TabsContent>
                    </Tabs>
                  </div>
                </DialogContent>
              </Dialog>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />

              <Button
                variant="ghost"
                size="sm"
                onClick={insertTable}
                title="插入表格"
              >
                <TableIcon className="h-4 w-4" />
              </Button>
            </div>

            <Separator orientation="vertical" className="h-6" />

            {/* 操作功能 */}
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => editor.chain().focus().undo().run()}
                disabled={!editor.can().undo()}
                title="復原 (Ctrl+Z)"
              >
                <Undo className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => editor.chain().focus().redo().run()}
                disabled={!editor.can().redo()}
                title="重做 (Ctrl+Y)"
              >
                <Redo className="h-4 w-4" />
              </Button>

              <Separator orientation="vertical" className="h-6" />

              <Button
                variant={showPreview ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setShowPreview(!showPreview)}
                className="gap-1"
                title="切換預覽"
              >
                {showPreview ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                {showPreview ? '編輯' : '預覽'}
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={exportContent}
                title="匯出 HTML"
              >
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* 編輯器內容區域 */}
      <div className="relative">
        {showPreview ? (
          <Tabs defaultValue="preview" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mx-4 mt-4 w-auto">
              <TabsTrigger value="preview">視覺預覽</TabsTrigger>
              <TabsTrigger value="html">HTML 代碼</TabsTrigger>
            </TabsList>
            <TabsContent value="preview" className="min-h-[600px] p-8">
              <Card>
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold mb-6 text-center">文章預覽</h2>
                  <div 
                    className="prose prose-lg max-w-none"
                    dangerouslySetInnerHTML={{ __html: content }}
                  />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="html" className="min-h-[600px] p-8">
              <Card>
                <CardContent className="p-4">
                  <pre className="whitespace-pre-wrap text-xs bg-muted p-4 rounded overflow-auto max-h-96">
                    {content}
                  </pre>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        ) : (
          <div className="min-h-[600px] bg-background">
            <EditorContent 
              editor={editor} 
              className="focus-within:outline-none"
            />
          </div>
        )}
      </div>

      {/* 底部狀態欄 */}
      <div className="sticky bottom-0 bg-background/95 backdrop-blur-sm border-t border-border px-4 py-2">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-4">
            <span>{editor?.storage.characterCount?.characters() || 0} 字符</span>
            <span>{editor?.storage.characterCount?.words() || 0} 字詞</span>
            <span>約 {Math.ceil((editor?.storage.characterCount?.words() || 0) / 200)} 分鐘閱讀</span>
          </div>
          <div className="flex items-center gap-2">
            <MousePointer className="h-3 w-3" />
            <span>就緒</span>
          </div>
        </div>
      </div>
    </div>
  );
}