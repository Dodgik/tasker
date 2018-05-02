
export const login = (data) => {
  return new Promise(function (resolve, reject) {
    try {
      if (data.login == 'admin' && data.password == '123') {
        resolve({ response: { login: data.login } });
      } else {
        reject({ message: 'not valid login or password' })
      }
    } catch (e) {
      reject(e)
      console.error('---api login error: ', e)
    }
  })
}

export const logout = () => {
  return new Promise(function (resolve, reject) {
    try {
      resolve({ response: { message: 'success' } });
    } catch (e) {
      reject(e)
      console.error('---api logout error: ', e)
    }
  })
}
