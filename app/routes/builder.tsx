import { useState } from "react";
import { SortableList } from "~/components";
import { Plus, Textbox, Trash } from "@phosphor-icons/react"
import { UniBlock } from "~/types";
import Block from "~/components/Block";


export default function Builder(props: any) {
  const [items, setItems] = useState<UniBlock[]>([{ id: "1", type: "input", label: "Hello" }, { id: "2", type: "input", label: "Hello 2" }])

  const handleAdd = (afterIndex: number) => {
    let index = afterIndex + 1
    let tmpItems = [...items]
    tmpItems.splice(index, 0, { id: Math.floor(Math.random() * 100).toString(), type: "input", label: "Hello" })
    setItems(tmpItems)
  }

  const handleRemove = (id: any) => {
    setItems(old => old.filter(item => item.id !== id))
  }

  return (
    <div className="w-1/2 pt-[20px] px-[60px]">
      <div className="max-w-[500px] mx-auto">
        <SortableList
          items={items}
          onChange={setItems}
          className="flex flex-col"
          renderItem={(item, index = -1) => {
            let last = index >= items.length - 1
            return (
              <>
                <SortableList.Item
                  id={item.id}
                  className="group/block-item relative p-4 border border-transparent hover:border-slate-200 hover:shadow-sm rounded flex justify-between items-center"
                >
                  {/* <div className="flex items-center">
                    <span className="mr-2">
                      {
                        item.type === "input" ?
                          <Textbox />
                          : null
                      }
                    </span>
                    {item.label}
                  </div> */}

                  <Block
                    type={item.type}
                    data={item}
                  />

                  <div className="absolute -left-[58px] flex items-center gap-x-1 py-3 pr-2">
                    <button className="invisible group-hover/block-item:visible px-1.5 py-1.5 hover:bg-red-500 hover:text-white rounded" onClick={() => handleRemove(item.id)}>
                      <Trash />
                    </button>
                    <SortableList.DragHandle />
                  </div>
                </SortableList.Item>

                {
                  !last ?
                    <button
                      onClick={() => handleAdd(index)}
                      className="w-full text-center opacity-0 hover:opacity-100 text-xs py-1 relative"
                    >
                      <span className="block w-full h-0.5 bg-blue-400" />
                      <span className="absolute -left-[13px] -top-[3px] bg-blue-400 rounded-full text-white p-0.5">
                        <Plus />
                      </span>
                    </button>
                    : null
                }
              </>
            )
          }}
        />
      </div>
    </div>
  )
}