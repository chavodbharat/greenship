import AsyncStorage from '@react-native-async-storage/async-storage';

export const apiCall = async (url, body, method, isFormData) => {
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };
  const token = await AsyncStorage.getItem('token');

  if (token) {
    headers['authorization'] = 'Bearer' + ' ' + token;
  }
  return fetch(url, {
    method: method,
    headers: isFormData
      ? {
          'content-type': 'multipart/form-data',
          authorization: 'Bearer' + ' ' + token,
        }
      : headers,
    body: body && !isFormData ? JSON.stringify(body) : body,
  })
    .then(async response => {
      if (response.status === 401) {
        // const refToken = await AsyncStorage.getItem('refreshToken');
        // fetch(`${serviceUrl.apiUrl}user/token`, {
        //   method: 'POST',
        //   body: JSON.stringify({
        //     refresh_token: refToken,
        //   }),
        // })
        //   .then(response => response.json())
        //   .then(async responseJson => {
        //     if (responseJson.success) {
        //       AsyncStorage.setItem('token', responseJson.data.token.token);
        //       AsyncStorage.setItem(
        //         'refreshToken',
        //         responseJson.data.token.refresh_token,
        //       );
        //       const headers = {
        //         Accept: 'application/json',
        //         'Content-Type': 'application/json',
        //         // 'slug': org_slug ? org_slug : organization
        //       };
        //       const token1 = responseJson.data.token.token;
        //       if (token) {
        //         headers['authorization'] = 'Bearer' + ' ' + token1;
        //       }
        //       return fetch(url, {
        //         method: method,
        //         headers,
        //         body: body ? JSON.stringify(body) : null,
        //       });
        //     } else {
        //     }
        //   })
        //   .catch(err => {});
      } else {
        return response.json();
      }
    })
    .catch(err => console.log('error in catch in util ', err, err?.message));
};

export const getReverseGeocodingData = async (latitude, longitude) => {
  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyCIqkzX9pTLBDe3KKTnDITtVBa-gLqbIEY`,
    );
    const data = await response.json();

    if (data.status === 'OK') {
      // Extract the address from the response
      const address = data.results[0].formatted_address;
      return address;
    } else {
      console.error('Failed to fetch reverse geocoding data:', data.status);
    }
  } catch (error) {
    console.error('Failed to fetch reverse geocoding data:', error);
  }
};

export const fetchLocationResults = async query => {
  try {
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${query}&key=AIzaSyCIqkzX9pTLBDe3KKTnDITtVBa-gLqbIEY&language=en`;
    const response = await fetch(url);
    const data = await response.json();

    console.log('Date', data);
    if (data.status === 'OK') {
      const locations = data.predictions.map(result => ({
        name: result.description,
      }));
      return locations;
    } else {
      throw new Error('Failed to fetch location results');
    }
  } catch (error) {
    console.error(error);
  }
};
