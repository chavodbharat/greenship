export interface HeaderTypePropsInterface {
    statusBarColor?: string;
    isfilter?: boolean;
    onSearchPress?: () => void;
    isEmergency?: boolean; 
    locationAddress?: string;
    onLocationSearch?: (value: string) => void;
};
  