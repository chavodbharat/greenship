import { ColorValue } from "react-native";
import { Colors } from "react-native-elements";

export interface HeaderTypePropsInterface {
  statusBarColor?: string;
  onSearchPress?: () => void;
  isEmergency?: boolean;
  locationAddress?: string;
  onLocationSearch?: (value: string) => void;
  onFilterPress?: any;
  isFilterShow?: boolean;
  onCrossIconPress?: () => void;
  backOneScreen?: boolean;
  headerBackgroundColor?: ColorValue;
}
