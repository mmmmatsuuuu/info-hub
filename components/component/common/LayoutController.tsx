'use client';

import { useEffect } from 'react';
import { useSidebarStore } from '@hooks/useSidebarStore';

export default function LayoutController() {
  const isOpen = useSidebarStore((state) => state.isOpen);

  useEffect(() => {
    if (isOpen) {
      document.body.setAttribute('data-sidebar-open', 'true');
    } else {
      document.body.setAttribute('data-sidebar-open', 'false');
    }
  }, [isOpen]);

  return null; // このコンポーネントはUIを描画しない
}
