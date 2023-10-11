import { CaretDown, Check, Hash, Password, TextT } from "@phosphor-icons/react"
import { useEffect, useRef, useState } from "react"
import { IInputBlock } from "~/types"
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

interface IProps {
  data: IInputBlock,
  onDataChange?: (data: IInputBlock) => void
}

export default function InputBlock({ data, onDataChange }: IProps) {
  const labelRef = useRef(null)
  const [item, setItem] = useState(data)
  const [interacting, setInteracting] = useState(false)
  const [inputFocused, setInputFocused] = useState(false)
  const [typeDropdownOpen, setTypeDropdownOpen] = useState(false)

  // Do not hide the action bar if the user is interacting with the input or with any element within the action block
  useEffect(() => {
    let interacting = inputFocused || typeDropdownOpen
    setInteracting(interacting)
    if (!interacting) {
      emitChanges()
    }
  }, [inputFocused, typeDropdownOpen])

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
  const onPlaceholderFocus = () => setInputFocused(true)
  const onPlaceholderBlur = () => {
    setTimeout(() => {
      setInputFocused(false)
    }, 100)
    onBlur()
  }
  const onPlaceholderInputChange = (e: React.ChangeEvent<HTMLInputElement>) => onChange('placeholder', e.currentTarget.value)
  const onPlaceholderInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => onKeyDown(e, 'placeholder')

  const InputIcon = inputTypeIcon[item.inputType]

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
        <div className="relative">
          <input
            value={item.placeholder}
            placeholder={'Enter placeholder'}
            onBlur={onPlaceholderBlur}
            onFocus={onPlaceholderFocus}
            onChange={onPlaceholderInputChange}
            onKeyDown={onPlaceholderInputKeyDown}
            className="block text-gray-400 px-2 py-1 border border-slate-200 shadow-sm rounded-sm"
          />

          <span className="absolute flex justify-center items-center top-1/2 right-2 -translate-y-1/2 bg-white text-gray-600 w-5 h-5">
            <InputIcon />
          </span>

          <div className={`absolute left-0 top-full shadow-lg translate-y-1 border border-slate-200 rounded flex gap-x-2 items-center z-10 bg-white text-sm ${interacting ? '' : 'hidden'}`}>
            <DropdownMenu.Root onOpenChange={(open) => setTypeDropdownOpen(open)}>
              <DropdownMenu.Trigger className="capitalize flex items-center gap-x-1 px-2 py-1 hover:bg-slate-100">
                {item.inputType}
                <CaretDown />
              </DropdownMenu.Trigger>
              <DropdownMenu.Portal>
                <DropdownMenu.Content
                  className="min-w-[220px] z-20 bg-white rounded-md p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade"
                  sideOffset={5}
                  align="start"
                >
                  {
                    Object.keys(inputTypeIcon).map((inputType: string) => {
                      const Icon = inputTypeIcon[inputType as IInputBlock['inputType']]
                      return (
                        <DropdownMenu.Item
                          onSelect={() => setItem({
                            ...item,
                            inputType: inputType as IInputBlock['inputType']
                          })}
                          className="text-sm leading-none text-gray-600 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-blue-200 data-[highlighted]:text-blue-900"
                        >
                          {item.inputType === inputType && <Check className="absolute left-2" />}
                          <span className="capitalize">{inputType}</span>
                          <Icon className="ml-auto" />
                        </DropdownMenu.Item>
                      )
                    })
                  }
                </DropdownMenu.Content>
              </DropdownMenu.Portal>
            </DropdownMenu.Root>
          </div>
        </div>

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

const inputTypeIcon = {
  'text': TextT,
  'number': Hash,
  'password': Password
}