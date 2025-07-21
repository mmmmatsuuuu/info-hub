'use client';

import { useSidebarStore } from '@hooks/useSidebarStore';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from '@components/ui/tooltip';

export default function SidebarToggleButton() {
  const { isOpen, toggle } = useSidebarStore();

  return (
    <button
      id="sidebar-toggle-button"
      onClick={toggle}
      className="absolute top-1/2 -translate-y-1/2 bg-background border-2 rounded-full p-1 z-20 transition-all duration-300 ease-in-out hover:bg-accent"
    >
      {isOpen ? 
        <TooltipProvider delayDuration={100}>
          <Tooltip>
            <TooltipTrigger asChild>
              <ChevronLeft size={16} height={64} /> 
            </TooltipTrigger>
            <TooltipContent side='right'>
              サイドバーを閉じる
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        :
        <TooltipProvider delayDuration={100}>
          <Tooltip>
            <TooltipTrigger asChild>
              <ChevronRight size={16} height={64} />
            </TooltipTrigger>
            <TooltipContent side='right'>
              サイドバーを開く
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      }
    </button>
  );
}
