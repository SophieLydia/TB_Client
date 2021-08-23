import http from "../http-common";

class CourseService {
  async getAll() {
    try{
      const res = await http.get("/courses");
      return res.data;
    }catch(err){
      return false;
    }
  }

  async get(id) {
    try{
      const res = await http.get(`/courses/${id}`);
      return res.data;
    }catch(err){
      return false;
    }
  }

  async create(data) {
    try{
      const res = await http.post("/courses", data);
      return res.data;
    }catch(err){
      return false;
    }
  }

  async update(id, data) {
    try{
      const res = await http.patch(`/courses/${id}`, data);
      return res.data;
    }catch(err){
      return false;
    }
  }

  async delete(id) {
    try{
      await http.delete(`/courses/${id}`);
      return true; 
    }catch(err){
      return false;
    }
  }

  async findFilters(theme, cantonId, date){
    try{
      const res = await http.get(`/courses?themeTitle=${theme}&classCanton=${cantonId}&date=${date}`);
      return res.data;
    }catch(err){
      return false;
    }
  }
}

export default new CourseService();