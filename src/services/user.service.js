import http from "../api";

class UserDataService {
  getAll() {
    return http.get("/getUsers");
  }

  get(id) {
    return http.get(`/getUsers/${id}`);
  }


  create(data) {
    return http.post("/newUser", data);
  }

  update(id, data) {
    return http.put(`/updateUser/${id}`, data);
  }

  delete(id) {
    return http.delete(`/deleteUser/${id}`);
  }

  deleteAll() {
    return http.delete(`/deleteUsers`);
  }

}

export default new UserDataService();