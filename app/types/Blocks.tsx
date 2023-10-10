export type BlockType = IInputBlock['type']
export type UniBlock = IInputBlock

export interface IBlock {
  id: string;
  type: BlockType;
}

export interface IInputBlock extends IBlock {
  type: "input";
  label?: string;
  placeholder?: string;
}