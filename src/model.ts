export enum EDIT_TYPE {
  SKILL = 'skill',
  ACTION = 'action',
}

export interface ActionType {
  text: string;
  xp: number;
}

export interface ErrorType {
  text?: string | null;
  xp?: string | null;
}

export interface HistoryType {
  text: string;
  xp: number;
  date: Date;
  checked: boolean;
}

export interface SkillType {
  name: string;
  level: number;
  xp: number;
  actions: ActionType[];
}

export interface StateType {
  name: string;
  theme: string;
  level: number;
  xp: number;
  skillsSorting: string;
  actionsSorting: string;
  activeTab: string;
  skills: SkillType[];
  history: HistoryType[];
}

export interface ModalType {
  title: string;
  btnText?: string;
  type: string;
  editing: SkillType | ActionType | null;
  isOpen: boolean;
  textInput: string;
  xpInput?: string;
}

export interface InputPropsType
  extends React.InputHTMLAttributes<HTMLInputElement> {
  ref: HTMLElement | null;
}
