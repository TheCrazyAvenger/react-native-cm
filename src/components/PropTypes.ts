export type OnboardingItemProps = {
  item: {[key: string]: string | any};
};

export type TextProps = {
  style?: {[key: string]: number | string};
  numberOfLines?: number;
};

export type NewsCardProps = {
  data: any;
  isLoading: boolean;
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
  onPress?: () => void;
  error?: any;
  isTouched?: any;
  style?: {[key: string]: number | string};
  containerStyle?: {[key: string]: number | string};
};

export type SocialBlockProps = {
  style?: {[key: string]: number | string};
};

export type FormInputProps = {
  label?: string;
  plaseholder: string;
  onChangeText: any;
  onFocus: any;
  onBlur: any;
  onInput?: any;
  value: any;
  errorMessage?: any;
  isTouched: any;
  style?: {[key: string]: number | string};
  containerStyle?: {[key: string]: number | string};
  secureTextEntry?: boolean;
  rightIcon?: any;
  leftIcon?: any;
  keyboardType?: any;
  disabled?: boolean;
  errorStyle?: {[key: string]: number | string};
  showError?: boolean;
};

export type PasswordItemProps = {
  text: string;
  color: string;
};

export type NotificationProps = {
  text: string;
  visible: boolean;
  onPress: any;
  style?: {[key: string]: number | string};
};

export type MetalsCardProps = {
  metalId: number;
};

export type MetalsItemProps = {
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
  markedColor?: string;
  showAll?: boolean;
  onPress: (id: number) => void;
};

export type HoldingsHeaderProps = {
  metalType: number;
  data: any;
  setMetal: (id: number) => void;
};

export type ChartProps = {
  chartTime: number;
  lineColor: any;
  setTime: (i: number) => void;
};

export type PricesItemProps = {
  data: any;
};

export type PricesChartProps = {
  chartMetal: number;
  lineColor: any;
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
  type?: string;
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
  onRemove: (...args: any) => void;
};

export type DatePickerProps = {
  value: any;
  errorMessage: any;
  disabled?: boolean;
  label?: string;
  isTouched: any;
  style?: {[key: string]: number | string};
  labelStyle?: {[key: string]: number | string};
  errorStyle?: {[key: string]: number | string};
  showIcon?: boolean;
  onConfirm: (...args: any) => void;
  type?: 'card';
};

export type ItemPickerProps = {
  style?: {[key: string]: number | string};
  label?: string;
  value: string;
  errorMessage?: any;
  isTouched?: any;
  labelStyle?: {[key: string]: number | string};
  errorStyle?: {[key: string]: number | string};
  onChange: (value: string) => void;
  items: {label: string; value: string}[];
  showArrow?: boolean;
  placeholderStyle?: {[key: string]: number | string};
  LeftIcon?: any;
  maxHeight?: number;
  disabled?: boolean;
};

export type ModalWindowProps = {
  title: string;
  text: string;
  confirmTitle: string;
  cancelTitle?: string;
  onConfirm: (...args: any) => void;
  onCancel?: (...args: any) => void;
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
  onRemove: (...args: any) => void;
};

export type EmptyDataScreenProps = {
  title?: string;
  text: string;
  buttonTitle?: string;
  descriptionStyle?: {[key: string]: number | string};
  onPress?: (...args: any) => void;
};

export type FormImagePickerProps = {
  name: any;
};

export type ImageInputProps = {
  uri?: string | null;
  onChange: any;
};

export type ImageInputListProps = {
  uris: Array<string> | [];
  onAdd: any;
  onRemove: any;
};

export type PaymentMethodsItemProps = {
  paymentMethod: string;
  cardNumber: string;
  id: number;
  expiring: string;
  style?: {[key: string]: number | string};
  label: string;
  onRemove: (...args: any) => void;
  type: string | null;
};

export type BuyingInfoProps = {
  paymentMethod: string;
  metal: string;
  amount: string;
  spot: number;
  amountOz: string;
  style?: {[key: string]: number | string};
  type: string;
};

export type OrderInfoProps = {
  order: number | string;
  status: string;
  style?: {[key: string]: number | string};
};

export type PaymentMethodPickerProps = {
  label: string;
  containerStyle?: {[key: string]: number | string};
  labelStyle?: {[key: string]: number | string};
  onChange: (value: any) => void;
};

export type EmptyPaymentMethodProps = {
  title: string;
  type?: string;
  onPress?: (...args: any) => void;
};

export type CredentialsItemProps = {
  title: string;
  value: string;
  id: number;
};

export type PaymentItemProps = {
  title: string;
  buttonTitle: string;
  image: string;
  onPress: (...args: any) => void;
};

export type FundWithdrawInfoProps = {
  cashBalance?: number;
  amount?: string;
  type?: string;
  method?: string;
  account?: string;
  style?: {[key: string]: number | string};
};

export type ReedemItemProps = {
  style?: {[key: string]: number | string};
  image: string;
  name: string;
  price: number;
  availability: string;
  onSale: boolean;
  date?: string;
  onPress: (...args: any) => void;
};

export type CartItemProps = {
  style?: {[key: string]: number | string};
  image: string;
  name: string;
  price: number;
  availability: string;
  qty: number;
  date?: string;
};

export type TaxItemProps = {
  style?: {[key: string]: number | string};
  subtotal: number;
  salesTax: number;
  shippingFee: string;
  shippingTax: number;
  total: number;
};

export type ReedemInfoProps = {
  style?: {[key: string]: number | string};
  cart: any;
  paymentMethod: string;
  shippingMethod: string;
};
