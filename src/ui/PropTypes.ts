export type ScreenProps = {
  style?: {[key: string]: string | number};
  type?: 'View';
};

export type TextButtonProps = {
  title: string;
  solid?: boolean;
  onPress: () => void;
  style?: {[key: string]: number | string};
  disabled?: boolean;
};

export type SocialButtonProps = {
  imageUri: any;
  onPress: () => void;
  style?: {[key: string]: number | string};
  borderColor: string;
};
