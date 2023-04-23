import AsyncStorage from '@react-native-async-storage/async-storage';

export const apiCall = async (url, body, method, isFormData) => {
  const headers = isFormData ? {
      'content-type': 'multipart/form-data'
    } : {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
  const token = await AsyncStorage.getItem('token');

  if (token) {
    headers['authorization'] = 'Bearer' + ' ' + token;
  }
  return fetch(url, {
    method: method,
    headers: headers,
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
