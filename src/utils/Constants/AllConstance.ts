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

//For static report problem options
export const getAllStaticReportProblemOptions = () => {
    return [
        {
            id: "1", 
            title: "Sexually Inappropriate"
        }, 
        {
            id: "2", 
            title: "Prohibited Content"
        }, 
        {
            id: "3", 
            title: "Misleading or Scam"
        }, 
        {
            id: "4", 
            title: "False News"
        }, 
        {
            id: "5", 
            title: "Offensive"
        }, 
        {
            id: "6", 
            title: "Violence"
        }, 
        {
            id: "7", 
            title: "Spam"
        }, 
        {
            id: "8", 
            title: "Nudity"
        }, 
        {
            id: "9", 
            title: "Harassment"
        }, 
        {
            id: "10", 
            title: "Hate Speech"
        }, 
        {
            id: "11", 
            title: "Terrorism"
        }, 
        {
            id: "12", 
            title: "Other"
        }
    ];
}