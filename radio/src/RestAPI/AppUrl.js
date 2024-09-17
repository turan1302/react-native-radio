class AppUrl{
  static baseURL = "http://127.0.0.1:8000";
  static apiURL = this.baseURL+"/api";

  // client
  static register = this.apiURL+"/client/register";
  static login = this.apiURL+"/client/login";
  static logout = this.apiURL+"/client/logout";
  static profile = this.apiURL+"/client/profile";
  static update = this.apiURL+"/client/update";
  static update_profile = this.apiURL+"/client/update-profile";
  static check = this.apiURL+"/client/check";

  // home
  static home = this.apiURL+"/home";
  static set_favourite = this.apiURL+"/home/set-favourite";

  // favourite
  static favourites = this.apiURL+"/favourites";
  static remove_favourite = this.apiURL+"/favourites/remove-favourite";

  // radio
  static categories = this.apiURL+"/radio/categories";
  static set_radio = this.apiURL+"/radio/set-radio";
  static remove_radio = this.apiURL+"/radio/remove-radio";

}

export default AppUrl;
