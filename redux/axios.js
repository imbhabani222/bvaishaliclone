import axios from "axios";
import Cookies from "universal-cookie";
const cookies = new Cookies();

axios.defaults.headers.common["Authorization"] = `bearer ${cookies.get(
  "accessToken"
)}`;
axios.defaults.headers.common["storecode"] = `bvaishali`;

export default axios;
