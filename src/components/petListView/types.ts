export interface PetListViewTypePropsInterface {
    petListData: any;
    isEmergency?: boolean;
    isModalVisible?: boolean;
    onDeletePress?: (petId: string) => void;
    onDeleteModalShowOrHide?: (value: boolean) => void;
};