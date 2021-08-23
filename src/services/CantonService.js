import http from "../http-common";

class CantonService {
  async getAll() {
    try{
      const res = await http.get("/cantons");
      return res.data;
    }catch(err){
      return false;
    }
  }

  async get(id) {
    try{
      const res = await http.get(`/cantons/${id}`);
      return res.data;
    }catch(err){
      return false;
    }
  }

  async getAllNames(){
    const res = await this.getAll();
    var listName = [];
    for (let i=0; i<res.length; ++i){
      listName[i] = res[i].name;
    }
    return listName;
  }

  async create(data) {
    try{
      const res = await http.post("/cantons", data);
      return res.data;
    }catch(err){
      return false;
    }
  }

  async update(id, data) {
    try{
      const res = await http.patch(`/cantons/${id}`, data);
      return res.data;
    }catch(err){
      return false;
    }
  }

  async delete(id) {
    try{
      await http.delete(`/cantons/${id}`);
      return true; 
    }catch(err){
      return false;
    }
  }

  async findFilters(name){
    try{
      const res = await http.get(`/cantons?name=${name}`);
      return res.data;
    }catch(err){
      return false;
    }
  }
}

export default new CantonService();