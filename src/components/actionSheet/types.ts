export interface ActionSheetTypePropsInterface {
    actionSheetItems: ActionSheeItemObj [];
    onPressItem: (position: number) => void;
    onCancelPress: () => void;
    actionTextColor?: any;
};

export interface ActionSheeItemObj {
    id: string,
    title: string,
    image?: any,
    isLocalImage?: boolean,
};
  