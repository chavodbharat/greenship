import LocalizedStrings from 'react-native-localization';
import en from './en.json';
import de from './de.json';

const translations = {
  en,
  de
};

const Localization = new LocalizedStrings(translations);

export default Localization;