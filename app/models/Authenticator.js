export class Authenticator {

    static login(email, password) {
        return new Promise(function(resolve, reject) {
          fetch(
            `https://clearmind-backend.herokuapp.com/api/user/${email}&${password}`
          )
          .then(res => res.json())
          .then((res) => {
            if (res.message == 'i dont exist') {
              reject();
            } else {
              resolve();
            }
          })
          .catch((error) => {
            console.log(error);
            reject();
          })
        });
    }
}
