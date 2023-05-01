import { PetListArrayInterface } from "../../myPetList/types";

export interface VaccinationMenuOptionsTypePropsInterface {
  petPassportOptionsData: MenuOptions [],
  petListObject: PetListArrayInterface,
  onBackPress: () => void,
  onPetPassportMenuItemPress: (data: MenuOptions) => void;
};
export interface MenuOptions {
  form_id: string,
  icon: string,
  label: string,
  name: string,
  vaccine_type: string
}