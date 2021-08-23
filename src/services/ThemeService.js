import http from "../http-common";

class ThemeService {
  async getAll() {
    try{
      const res = await http.get("/themes");
      return res.data;
    }catch(err){
      return false;
    }
  }

  async get(id) {
    try{
      const res = await http.get(`/themes/${id}`);
      return res.data;
    }catch(err){
      return false;
    }
  }

  async getAllTitles(){
    const res = await this.getAll();
    var listTitle = [];
    for (let i=0; i<res.length; ++i){
      listTitle[i] = res[i].title;
    }
    return listTitle;
  }

  async create(data) {
    try{
      const res = await http.post("/themes", data);
      return res.data;
    }catch(err){
      return false;
    }
  }

  async update(id, data) {
    try{
      const res = await http.patch(`/themes/${id}`, data);
      return res.data;
    }catch(err){
      return false;
    }
  }

  async delete(id) {
    try{
      await http.delete(`/themes/${id}`);
      return true; 
    }catch(err){
      return false;
    }
  }

  async findFilters(themeTitle){
    try{
      const res = await http.get(`/themes?title=${themeTitle}`);
      return res.data;
    }catch(err){
      return false;
    }
  }
}

export default new ThemeService();