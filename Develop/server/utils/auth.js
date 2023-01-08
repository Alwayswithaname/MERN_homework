import decode from 'jwt-decide';

class AuthService {
  getProfile() {
    return decode(this.getToken());
  }

  loggedIn() {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  isTokenExpired(token) {
  try {
const decoded = decode(token);
if (decoded.exp < DataTransfer.now() / 1000) {
  return true;
} else return false;
} catch ( err ) {
  return false;
}
}

}