import React, { createContext, useContext, useMemo } from "react";
import type { CSSProperties, PropsWithChildren } from "react";
import type {
  DraggableSyntheticListeners,
  UniqueIdentifier
} from "@dnd-kit/core";
import { defaultAnimateLayoutChanges, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import "./SortableItem.css";

interface Props {
  id: UniqueIdentifier;
  className: any;
  onClick?: () => void;
}

interface Context {
  attributes: Record<string, any>;
  listeners: DraggableSyntheticListeners;
  ref(node: HTMLElement | null): void;
}

const SortableItemContext = createContext<Context>({
  attributes: {},
  listeners: undefined,
  ref() { }
});

export function SortableItem({ children, id, className, onClick }: PropsWithChildren<Props>) {
  const {
    attributes,
    isDragging,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition
  } = useSortable({
    id,
    animateLayoutChanges: (args) => defaultAnimateLayoutChanges({ ...args, wasDragging: true })
  });
  const context = useMemo(
    () => ({
      attributes,
      listeners,
      ref: setActivatorNodeRef
    }),
    [attributes, listeners, setActivatorNodeRef]
  );
  const style: CSSProperties = {
    opacity: isDragging ? 0.4 : undefined,
    transform: CSS.Translate.toString(transform),
    transition
  };

  return (
    <SortableItemContext.Provider value={context}>
      <li onClick={onClick} className={className} ref={setNodeRef} style={style}>
        {children}
      </li>
    </SortableItemContext.Provider>
  );
}

export function DragHandle() {
  const { attributes, listeners, ref } = useContext(SortableItemContext);

  return (
    <button className="invisible group-hover/block-item:visible px-1 py-2 hover:bg-slate-100 rounded" {...attributes} {...listeners} ref={ref}>
      <svg viewBox="0 0 20 20" width="12">
        <path d="M7 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 2zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 14zm6-8a2 2 0 1 0-.001-4.001A2 2 0 0 0 13 6zm0 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 14z"></path>
      </svg>
    </button>
  );
}
