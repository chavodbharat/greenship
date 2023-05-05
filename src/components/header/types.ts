export interface HeaderTypePropsInterface {
  statusBarColor?: string;
  onSearchPress?: () => void;
  isEmergency?: boolean;
  locationAddress?: string;
  onLocationSearch?: (value: string) => void;
  onFilterPress?: any;
}
