import http from "../http-common";

class ClassService {
  async getAll() {
    try{
      const res = await http.get("/classes");
      return res.data;
    }catch(err){
      return false;
    }
  }

  async get(id) {
    try{
      const res = await http.get(`/classes/${id}`);
      return res.data;
    }catch(err){
      return false;
    }
  }

  async create(data) {
    try{
      const res = await http.post("/classes", data);
      return res.data;
    }catch(err){
      return false;
    }
  }

  async update(id, data) {
    try{
      const res = await http.patch(`/classes/${id}`, data);
      return res.data;
    }catch(err){
      return false;
    }
  }

  async delete(id) {
    try{
      await http.delete(`/classes/${id}`);
      return true; 
    }catch(err){
      return false;
    }
  }

  async findFilters(periode, cantonId){
    try{
      const res = await http.get(`/classes?periode=${periode}&canton=${cantonId}`);
      return res.data;
    }catch(err){
      return false;
    }
  }
}

export default new ClassService();