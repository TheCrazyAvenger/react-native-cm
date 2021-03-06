export type OnboardingItemProps = {
  item: {[key: string]: string | any};
};

export type ButtonsProps = {
  color: string;
};

export type MenuModalProps = {
  visible: boolean;
  onPress: () => void;
};

export type TextProps = {
  style?: {[key: string]: number | string};
  numberOfLines?: number;
  onPress?: (...args: any) => void;
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
  disabled?: boolean;
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
  onChangeText: (...args: any) => void;
  onChange?: (...args: any) => void;
  onFocus: (...args: any) => void;
  onBlur: (...args: any) => void;
  onInput?: (...args: any) => void;
  onContentSizeChange?: (...args: any) => void;
  height?: number;
  leftPrefix?: string | null;
  value: any;
  errorMessage?: any;
  isTouched: any;
  style?: {[key: string]: number | string};
  inputStyle?: {[key: string]: number | string};
  containerStyle?: {[key: string]: number | string};
  secureTextEntry?: boolean;
  rightIcon?: any;
  leftIcon?: any;
  keyboardType?: any;
  disabled?: boolean;
  errorStyle?: {[key: string]: number | string};
  maxLength?: number;
  showError?: boolean;
  multiline?: boolean;
  autoFocus?: boolean;
};

export type MaskFormInputProps = {
  label?: string;
  plaseholder: string;
  onChangeText: (...args: any) => void;
  onChange?: (...args: any) => void;
  onFocus: (...args: any) => void;
  onBlur: (...args: any) => void;
  onInput?: (...args: any) => void;
  onContentSizeChange?: (...args: any) => void;
  value: any;
  errorMessage?: any;
  isTouched: any;
  style?: {[key: string]: number | string};
  labelStyle?: {[key: string]: number | string};
  containerStyle?: {[key: string]: number | string};
  secureTextEntry?: boolean;
  RightIcon?: any;
  keyboardType?: any;
  errorStyle?: {[key: string]: number | string};
  maxLength?: number;
  showError?: boolean;
  multiline?: boolean;
  autoFocus?: boolean;
  mask: any;
};

export type PasswordItemProps = {
  text: string;
  color: string;
};

export type NotificationProps = {
  text: string | null;
  visible: boolean;
  onPress: any;
  textStyle?: {[key: string]: number | string};
  buttonColor?: 'white';
  style?: {[key: string]: number | string};
};

export type MetalsCardProps = {
  metalId: number;
  data: any;
  isLoading: boolean;
  error: any;
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

export type TransactionsModalProps = {
  visible: boolean;
  date: string;
  spot: number;
  price_with_tax: number;
  account: string;
  total: string;
  cart: any;
  shippingMethod: string;
  product: string;
  oz: number;
  ozPrice?: number;
  time: string;
  type: string;
  order: number;
  paymentMethod: string;
  onPress: () => void;
};

export type MetalPickerProps = {
  currentMetal: number;
  colorfull?: boolean;
  markedColor?: string;
  showAll?: boolean;
  onPress: (id: number) => void;
};

export type OperationsPickerProps = {
  currentOperation: number;
  onPress: (id: number) => void;
};

export type HoldingsHeaderProps = {
  metalType: number;
  data: any;
};

export type ChartProps = {
  chartTime: number;
  lineColor: any;
  setTime: (i: number) => void;
  metalType: number;
  metalsData?: any;
};

export type PricesItemProps = {
  data: any;
};

export type PricesChartProps = {
  chartMetal: number;
  lineColor: any;
  metalData: any;
};

export type MenuItemProps = {
  title: string;
  description: string;
  Image: any;
  onPress: (...args: any) => void;
  style?: {[key: string]: number | string};
  type?: 'switch';
  switchValue?: boolean;
  disabledSwitch?: boolean;
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
  status: string;
  paymentMethod: string;
  startDate: string;
  endDate: string;
  style?: {[key: string]: number | string};
  id: number;
  usedAmount: string;
  account: string;
  keyId: number;
  onRemove: (...args: any) => void;
};

export type AutoBuyInfoProps = {
  metal: string;
  amount: number;
  frequency: string;
  paymentMethod: string;
  startDate: string;
  endDate: string;
  usedAmount: string;
  account: string;
  style?: {[key: string]: number | string};
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
  textStyle?: {[key: string]: number | string};
  label?: string;
  value: string;
  errorMessage?: any;
  isTouched?: any;
  labelStyle?: {[key: string]: number | string};
  containerStyle?: {[key: string]: number | string};
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
  keyId: number;
  error: any;
  data: any;
  time: string;
  color: string;
  value: number;
  style?: {[key: string]: number | string};
  onRemove: (...args: any) => void;
};

export type EmptyDataScreenProps = {
  title?: string;
  text?: string;
  buttonTitle?: string;
  descriptionStyle?: {[key: string]: number | string};
  onPress?: (...args: any) => void;
  style?: {[key: string]: number | string};
  titleStyle?: {[key: string]: number | string};
};

export type FormImagePickerProps = {
  name: any;
};

export type ImageInputProps = {
  uri?: string | null;
  onChange: (...args: any) => void;
};

export type ImageInputListProps = {
  uris: Array<string> | [];
  onAdd: (...args: any) => void;
  onRemove: (...args: any) => void;
};

export type PaymentMethodsItemProps = {
  paymentMethod: string;
  cardNumber: string;
  id: number;
  expiring: string;
  fullName: string;
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
  amountOz: string | number;
  style?: {[key: string]: number | string};
  type: string;
  account?: string;
};

export type OrderInfoProps = {
  order: number | string;
  status: string;
  date?: string;
  time?: string;
  style?: {[key: string]: number | string};
};

export type PaymentMethodPickerProps = {
  label: string;
  containerStyle?: {[key: string]: number | string};
  labelStyle?: {[key: string]: number | string};
  onChange: (value: any) => void;
  setPaymentType: (value: any) => void;
  accountStyle?: {[key: string]: number | string};
  method?: string;
  account?: string;
};

export type EmptyPaymentMethodProps = {
  title: string;
  type?: string;
  onPress?: (...args: any) => void;
  style?: {[key: string]: number | string};
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

export type TransactionItemProps = {
  product: string;
  quantity: number;
  total: string;
  price_with_tax: number;
  cart: any;
  shippingMethod: string;
  type: string;
  list: any;
  localeDate: string;
  date: string;
  account: string;
  spot: number;
  time: string;
  oz: number;
  ozPrice?: number;
  order: number;
  paymentMethod: string;
  onPress: (...args: any) => void;
  id: number;
  style?: {[key: string]: number | string};
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
  account: string;
};

export type NumberPaginationProps = {
  style?: {[key: string]: number | string};
  onPageChange: (...args: any) => void;
  changeView: (...args: any) => void;
  totalCount: number;
  showView?: boolean;
  siblingCount?: number;
  currentPage: number;
  pageSize: number;
};

export type WithdrawTaxItemProps = {
  style?: {[key: string]: number | string};
  amount: string | number;
  price_with_tax?: number;
};

export type TimePickerProps = {
  chartTime: number;
  setTime: (...args: any) => void;
};

export type PieChartProps = {
  gainsLosses: number;
  commonOwned: string;
};

export type PortfolioHeaderProps = {
  gainsLosses: number;
  isEmpty: boolean;
  commonOwned: string;
};

export type PricesGraphProps = {
  data: any;
  isLoading: boolean;
};
