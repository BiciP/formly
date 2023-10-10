import { Eye } from "@phosphor-icons/react"
import { useRef, useState } from "react"
import { IInputBlock } from "~/types"
import sanitizeHtml from "sanitize-html"
import ContentEditable from 'react-contenteditable';

interface IProps {
  data: IInputBlock
}

export default function InputBlock({ data }: IProps) {
  const labelRef = useRef('')
  const [item, setItem] = useState(data)
  const [labelFocused, setLabelFocused] = useState(false)

  return (
    <div key={data.id} className="w-full">
      <div className="group/input-label pl-2">
        {/* <span
          ref={labelRef}
          onInput={(e) => {
            if (e.nativeEvent.inputType === 'insertParagraph') {
              console.log()
              e.preventDefault()
              return
            }
            setItem({ ...item, label: e.target.innerText })
          }}
          onFocus={_ => setLabelFocused(true)}
          onBlur={_ => setLabelFocused(false)}
          role="textbox"
          contentEditable
          suppressContentEditableWarning
          className="outline-none"
        >
          {item.label}
        </span> */}

        {
          !labelFocused &&
          <span
            onClick={() => {
              const span = labelRef.current;

              if (span == null) return

              span?.focus()

              //set a new range object
              let caret = document.createRange();
              //return the text selected or that will be appended to eventually
              let sel = window.getSelection();

              //get the node you wish to set range to
              caret.selectNodeContents(span);
              //set collapse to null or false to set at end of node
              caret.collapse(false);
              //make sure all ranges are removed from the selection object
              sel?.removeAllRanges();
              //set all ranges to null and append it to the new range object
              sel?.addRange(caret);
            }}
            className="text-gray-400 ml-1 invisible group-hover/input-label:visible"
          >
            Click to edit
          </span>
        }
      </div>

      <input
        value={data.placeholder}
        placeholder={data.placeholder ?? 'Enter placeholder (leave empty for no placeholder)'}
        onChange={e => setItem({ ...item, placeholder: e.target.value })}
        className="block text-gray-400 px-2 py-1 border border-slate-200 shadow-sm rounded-sm"
      />
    </div>
  )
}