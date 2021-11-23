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
  style?: {[key: string]: number | string};
};

export type SocialBlockProps = {
  style?: {[key: string]: number | string};
};

export type FormInputProps = {
  label?: string;
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

export type MenuModalItemProps = {
  Image: any;
  onPress: () => void;
  title: string;
  text: string;
};

export type MetalPickerProps = {
  currentMetal: number;
  colorfull?: boolean;
  onPress: (id: number) => void;
};

export type HoldingsHeaderProps = {
  metalType: number;
  setMetal: (id: number) => void;
};

export type ChartProps = {
  chartTime: number;
  lineColor: any;
  setTime: (i: number) => void;
};

export type MenuItemProps = {
  title: string;
  description: string;
  Image: any;
  onPress: (...args: any) => void;
  style?: {[key: string]: number | string};
  type?: 'switch';
  switchValue?: boolean;
};

export type MenuItemSmallProps = {
  title: string;
  textColor?: string;
  onPress: (...args: any) => void;
  style?: {[key: string]: number | string};
};

export type ProductItemProps = {
  metal: string;
  price: number;
  vault: string;
  premium: number;
  storageFee: number;
  spread: number;
  textColor?: string;
  onPress: (...args: any) => void;
  style?: {[key: string]: number | string};
};

export type AutoBuyItemProps = {
  metal: string;
  amount: number;
  frequency: string;
  paymentMethod: string;
  startDate: string;
  endDate: string;
  style?: {[key: string]: number | string};
  id: number;
};

export type DatePickerProps = {
  value: any;
  errorMessage: any;
  disabled?: boolean;
  label?: string;
  isTouched: any;
  style?: {[key: string]: number | string};
  onConfirm: (...args: any) => void;
};

export type ItemPickerProps = {
  style?: {[key: string]: number | string};
  label?: string;
  value: string;
  showBorders?: boolean;
  onChange: (value: string) => void;
  items: {label: string; value: string}[];
};

export type ModalWindowProps = {
  title: string;
  text: string;
  confirmTitle: string;
  cancelTitle: string;
  onConfirm: (...args: any) => void;
  onCancel: (...args: any) => void;
  visible: boolean;
};

export type PriceAlertItemProps = {
  color: string;
  metal: string;
  backgroundColor: string;
  Image: any;
  style?: {[key: string]: number | string};
  onPress: (...args: any) => void;
};

export type PriceAlertListItemProps = {
  metal: string;
  backgroundColor: string;
  condition: string;
  date: string;
  id: number;
  time: string;
  color: string;
  value: number;
  style?: {[key: string]: number | string};
};

export type EmptyDataScreenProps = {
  title: string;
  text: string;
  onPress: (...args: any) => void;
};
