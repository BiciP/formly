import { Eye } from "@phosphor-icons/react"
import { useEffect, useRef, useState } from "react"
import { IInputBlock } from "~/types"
import sanitizeHtml from "sanitize-html"
import ContentEditable from 'react-contenteditable';

interface IProps {
  data: IInputBlock,
  onDataChange?: (data: IInputBlock) => void
}

export default function InputBlock({ data, onDataChange }: IProps) {
  const labelRef = useRef(null)
  const [item, setItem] = useState(data)

  useEffect(() => {
    if (item.label == null) {
      return emitChanges()
    }
    // @ts-ignore
    item.label === '' && labelRef.current?.focus()
  }, [labelRef.current, item.label])

  // A global emitter
  const emitChanges = () => onDataChange?.(item)

  // Global handlers
  const onBlur = () => emitChanges()
  const onChange = (key: keyof IInputBlock, val: string | undefined) => setItem({ ...item, [key]: val })
  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, key: keyof IInputBlock) => {
    if (e.key === 'Enter') {
      if (e.currentTarget.value.length === 0) {
        setItem({ ...item, [key]: undefined })
      } else {
        e.currentTarget.blur()
      }
    } else if (
      e.key === 'Backspace' &&
      e.currentTarget.value.length === 0
    ) {
      setItem({ ...item, [key]: undefined })
    }
  }

  // Label handlers
  const onLabelInputChange = (e: React.ChangeEvent<HTMLInputElement>) => onChange('label', e.currentTarget.value)
  const onLabelInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => onKeyDown(e, 'label')

  // Placeholder handlers
  const onPlaceholderInputChange = (e: React.ChangeEvent<HTMLInputElement>) => onChange('placeholder', e.currentTarget.value)
  const onPlaceholderInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => onKeyDown(e, 'placeholder')

  return (
    <div key={data.id} className="w-full">
      {
        item.label != null &&
        <input
          ref={labelRef}
          value={item.label}
          onBlur={onBlur}
          onChange={onLabelInputChange}
          onKeyDown={onLabelInputKeyDown}
          className="outline-none"
          placeholder="Enter label or press Backspace to remove label"
        />
      }

      <div className="flex items-center gap-x-2">
        <input
          value={item.placeholder}
          placeholder={'Enter placeholder (leave empty for no placeholder)'}
          onBlur={onBlur}
          onChange={onPlaceholderInputChange}
          onKeyDown={onPlaceholderInputKeyDown}
          className="block text-gray-400 px-2 py-1 border border-slate-200 shadow-sm rounded-sm"
        />

        {
          item.label == null &&
          <button
            onClick={() => setItem({ ...item, label: '' })}
            className="invisible group-hover/block-item:visible flex text-xs px-2 py-1 text-gray-500 hover:bg-gray-100 active:bg-gray-200 transition rounded-sm"
          >
            Add a label
          </button>
        }
      </div>
    </div>
  )
}