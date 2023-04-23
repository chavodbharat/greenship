import * as ImagePicker from 'react-native-image-picker';

export const TAG_TIMEOUT = 2000;
export const TAG_DATE_FORMATE = 'YYYY-MM-DD';

export const imageOptionsTitleData = () => {
    return [
        {
            id: "capture", 
            title: "Take Image"
        }, 
        {
            id: "library", 
            title: "Select Image"
        }
    ];
}

export const allImageOptionsArray = () => {
    return [
        { 
            title: 'Take Image', 
            type: 'capture',
            options: {
              saveToPhotos: true,
              mediaType: 'photo',
              includeBase64: false,
              includeExtra: true,
            },
        }, 
        {
            title: 'Select Image',
            type: 'library',
            options: {
              selectionLimit: 0,
              mediaType: 'photo',
              includeBase64: false,
              includeExtra: true,
            },
        }
    ];
}

export const onImageOptionPress = async (type: string | undefined, options: any) => {
    const data = (type === 'capture') ? await ImagePicker.launchCamera(options)
        : await ImagePicker.launchImageLibrary(options);
    return data;
} 