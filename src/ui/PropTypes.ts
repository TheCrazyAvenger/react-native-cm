export type ScreenProps = {
  style?: {[key: string]: string | number};
  type?: 'View';
};

export type TextButtonProps = {
  title: string;
  solid?: boolean;
  loading?: boolean;
  onPress: () => void;
  style?: {[key: string]: number | string};
  disabled?: boolean;
  disabledStyle?: {[key: string]: number | string};
  changeDisabledStyle?: boolean;
  disabledTitle?: string | null;
  titleStyle?: {[key: string]: number | string};
};

export type SocialButtonProps = {
  imageUri: any;
  onPress: () => void;
  style?: {[key: string]: number | string};
  borderColor: string;
};
