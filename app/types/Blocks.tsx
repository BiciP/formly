export type BlockType = IInputBlock['type']
export type UniBlock = IInputBlock

export interface IBlock {
  id: string;
  type: BlockType;
}

export interface IInputBlock extends IBlock {
  type: "input";
  inputType: 'text' | 'number' | 'password';
  label?: string;
  placeholder?: string;
}