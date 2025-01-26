export enum EDIT_TYPE {
  SKILL = 'skill',
  ACTION = 'action',
}

export enum LEVEL_TYPE {
  SKILL = 'skill',
  USER = 'user',
}

export interface LevelObjectKeys {
  [key: string]: number[];
}

export interface ActionType {
  text: string;
  xp: number;
}

export interface SignType {
  email: string;
  password: string;
}

export interface ErrorType {
  text?: string | null;
  xp?: string | null;
  email?: string | null;
  password?: string | null;
}

export interface HistoryType {
  skill: string;
  text: string;
  xp: number;
  date: string;
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
