import { IInputBlock, UniBlock } from "~/types"
import InputBlock from "./InputBlock"

interface Props {
  type: IInputBlock['type'],
  data: UniBlock
}

export default function Block(props: Props) {
  const BlockComponent = BlockHandler[props.type]
  
  // TODO: see what we can do with this :)
  // @ts-ignore
  return <BlockComponent {...props} />
}

const BlockHandler = {
  'input': InputBlock 
}