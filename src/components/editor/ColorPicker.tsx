import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Palette } from 'lucide-react';

interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
  title?: string;
}

const PRESET_COLORS = [
  '#000000', '#333333', '#666666', '#999999', '#cccccc', '#ffffff',
  '#ff0000', '#ff6600', '#ffcc00', '#66ff00', '#00ff66', '#00ffff',
  '#0066ff', '#6600ff', '#cc00ff', '#ff0066', '#ff3366', '#ff6699',
  '#990000', '#993300', '#996600', '#669900', '#009966', '#009999',
  '#003399', '#330099', '#660099', '#990066', '#cc3366', '#ff9999',
];

export default function ColorPicker({ color, onChange, title = "選擇顏色" }: ColorPickerProps) {
  const [customColor, setCustomColor] = useState(color);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="sm" className="flex items-center gap-2 p-2">
          <Palette className="h-4 w-4" />
          <div 
            className="w-4 h-4 rounded border border-border"
            style={{ backgroundColor: color }}
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64">
        <div className="space-y-4">
          <Label className="text-sm font-medium">{title}</Label>
          
          {/* Preset Colors */}
          <div className="grid grid-cols-6 gap-2">
            {PRESET_COLORS.map((presetColor) => (
              <button
                key={presetColor}
                className={`w-8 h-8 rounded border-2 hover:scale-110 transition-transform ${
                  color === presetColor ? 'border-primary' : 'border-border'
                }`}
                style={{ backgroundColor: presetColor }}
                onClick={() => onChange(presetColor)}
                title={presetColor}
              />
            ))}
          </div>
          
          {/* Custom Color Input */}
          <div className="space-y-2">
            <Label htmlFor="custom-color" className="text-xs">自訂顏色</Label>
            <div className="flex gap-2">
              <Input
                id="custom-color"
                type="color"
                value={customColor}
                onChange={(e) => setCustomColor(e.target.value)}
                className="w-16 h-8 p-0 border-0"
              />
              <Input
                type="text"
                value={customColor}
                onChange={(e) => setCustomColor(e.target.value)}
                placeholder="#000000"
                className="flex-1 text-xs"
              />
              <Button
                size="sm"
                onClick={() => onChange(customColor)}
                className="px-3"
              >
                套用
              </Button>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}