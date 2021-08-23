import http from "../http-common";

class PersonService {
  async getAll() {
    try{
      const res = await http.get("/people");
      return res.data;
    }catch(err){
      return false;
    }
  }

  async get(id) {
    try{
      const res = await http.get(`/people/${id}`);
      return res.data;
    }catch(err){
      return false;
    }
  }

  async getAssistant(id){
    try{
      const res = await http.get(`/assistants/${id}`);
      return res.data;
    }catch(err){
      return false;
    }
  }

  async getChild(id){
    try{
      const res = await http.get(`/children/${id}`);
      return res.data;
    }catch(err){
      return false;
    }
  }

  async create(data) {
    try{
      const res = await http.post("/people", data);
      return res.data;
    }catch(err){
      return false;
    }
  }

  async createAssistant(data) {
    try{
      const res = await http.post("/assistants/", data);
      return res.data;
    }catch(err){
      return false;
    }
  }

  async createChild(data) {
    try{
      const res = await http.post("/children/", data);
      return res.data;
    }catch(err){
      return false;
    }
  }

  async update(id, data) {
    try{
      const res = await http.patch(`/people/${id}`, data);
      return res.data;
    }catch(err){
      return false;
    }
  }

  async updateAssistant(id, data) {
    try{
      const res = await http.patch(`/assistants/${id}`, data);
      return res.data;
    }catch(err){
      return false;
    }
  }

  async updateChild(id, data) {
    try{
      const res = await http.patch(`/children/${id}`, data);
      return res.data;
    }catch(err){
      return false;
    }
  }

  async delete(id) {
    try{
      await http.delete(`/people/${id}`);
      return true; 
    }catch(err){
      return false;
    }
  }

  async findFilters(role, name, canton, periode){
    try{
      const res = await http.get(`/people?role=${role}&name=${name}&canton=${canton}&periode=${periode}`);
      return res.data;
    }catch(err){
      return false;
    }
  }
}

export default new PersonService();