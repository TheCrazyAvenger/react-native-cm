export type OnboardingItemProps = {
  item: {[key: string]: string | any};
};

export type TextProps = {
  style?: {[key: string]: number | string};
};

export type PaginatorProps = {
  data: {[key: string]: string | any};
  currentIndex: number;
};

export type NextButtonProps = {
  title: string;
  onPress: () => void;
  style?: {[key: string]: number | string};
};

export type PaginationFooterProps = {
  data: {[key: string]: string | any};
  currentIndex: number;
  onPress: () => void;
  title: string;
  style?: {[key: string]: number | string};
};

export type CheckBoxProps = {
  value: any;
  onPress: () => void;
  error: any;
  isTouched: any;
};

export type SocialBlockProps = {
  style?: {[key: string]: number | string};
};

export type FormInputProps = {
  label: string;
  plaseholder: string;
  onChangeText: any;
  onFocus: any;
  onInput?: any;
  value: any;
  errorMessage: any;
  isTouched: any;
  style?: {[key: string]: number | string};
  secureTextEntry?: boolean;
  rightIcon?: any;
};

export type PasswordItemProps = {
  text: string;
  color: string;
};

export type NotificationProps = {
  text: string;
  visible: boolean;
  onPress: any;
};

export type MetalsCardProps = {
  data: any;
};

export type ActionsCardProps = {
  backgroundColor: string;
  title: string;
  description: string;
  buttonTitle: string;
  onPress: any;
};

export type ViewMoreButtonProps = {
  style?: {[key: string]: number | string};
  onPress: any;
};
