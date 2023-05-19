import { Linking } from "react-native";

export const TAG_TIMEOUT = 2000;
export const TAG_DATE_FORMATE = 'YYYY-MM-DD';
export const TAG_LOCATION_API_KEY = 'AIzaSyCIqkzX9pTLBDe3KKTnDITtVBa-gLqbIEY'; 

export const allGenderStaticData = () => {
    return [
        {
            id: "male", 
            title: "Male"
        }, 
        {
            id: "female", 
            title: "Female"
        }
    ];
}

export const yesNoData = () => {
    return [
        {
            id: "yes", 
            title: "Yes"
        }, 
        {
            id: "no", 
            title: "No"
        }
    ];
}

// Open link
export const openLink = (url: string) => {
    if (!url) return;
    Linking.canOpenURL(url?.trim())
      .then(supported => {
        if (supported) {
          return Linking.openURL(url?.trim());
        }
      })
      .catch(err => console.log(err));
};