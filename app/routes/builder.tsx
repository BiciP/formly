import { useState } from "react";
import { SortableList } from "~/components";
import { Plus, Textbox, Trash } from "@phosphor-icons/react"
import { UniBlock } from "~/types";
import Block from "~/components/Block";


export default function Builder(props: any) {
  const [items, setItems] = useState<UniBlock[]>([{ id: "1", type: "input", inputType: 'text' }, { id: "2", type: "input", inputType: 'text' }])

  const handleAdd = (afterIndex: number) => {
    let index = afterIndex + 1
    let tmpItems = [...items]
    tmpItems.splice(index, 0, { id: Math.floor(Math.random() * 100).toString(), type: "input", inputType: 'text' })
    setItems(tmpItems)
  }

  const handleUpdate = (id: any, newItem: UniBlock) => {
    setItems([...items].map(item => item.id === id ? newItem : item))
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

            const onDataChange = (data: UniBlock) => {
              handleUpdate(data.id, data)
            }

            return (
              <>
                <SortableList.Item
                  id={item.id}
                  className="group/block-item relative flex justify-between items-center"
                >
                  <Block
                    data={item}
                    type={item.type}
                    onDataChange={onDataChange}
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