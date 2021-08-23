import http from "../http-common";

class TeachingService {
  async getAll() {
    try{
      const res = await http.get("/teachings");
      return res.data;
    }catch(err){
      return false;
    }
  }

  async get(id) {
    try{
      const res = await http.get(`/teachings/${id}`);
      return res.data;
    }catch(err){
      return false;
    }
  }

  async create(data) {
    try{
      const res = await http.post("/teachings", data);
      return res.data;
    }catch(err){
      return false;
    }
  }

  async update(id, data) {
    try{
      const res = await http.patch(`/teachings/${id}`, data);
      return res.data;
    }catch(err){
      return false;
    }
  }

  async delete(id) {
    try{
      await http.delete(`/teachings/${id}`);
      return true; 
    }catch(err){
      return false;
    }
  }

  async findFilters(name, theme, canton, date){
    try{
      const res = await http.get(`/teachings?assistantName=${name}&courseTheme=${theme}&canton=${canton}&date=${date}`);
      return res.data;
    }catch(err){
      return false;
    }
  }
}

export default new TeachingService();