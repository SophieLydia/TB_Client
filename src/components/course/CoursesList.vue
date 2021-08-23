<template>
    <div>
        <h3>List of all the courses:</h3>
        <div class="add">
            <router-link to="/courses/add" class="btn btn-add">Click here to add a course</router-link>
        </div>
        <div class="filter"> 
            <h5>Search by:</h5>
            <div class="col">
                Theme
                <select v-model="filterTheme">
                    <option value="">All themes</option>
                    <option v-for="theme in themes" :key=theme :value="theme">{{ theme }}</option>
                </select>
                Canton 
                <select v-model="filterCanton">
                    <option value="">All cantons</option>
                    <option v-for="cant in cantons" :key=cant :value="cant">{{ cant }}</option>
                </select>
                Date
                <input type="date" v-model="filterDate">
            </div>
            <button @click.prevent="searchFilters(filterTheme, filterCanton, filterDate)" class="btn btn-search">Search</button>
            <button @click.prevent="reset()" class="btn btn-reset">Reset</button>
        </div>
        <div class="row">
            <div class="col-md-12">
                <table class="table table-striped">
                    <thead class="thead-dark">
                        <tr>
                            <th></th>
                            <th>Theme</th>
                            <th>Canton</th>
                            <th>Periode</th>
                            <th>Date</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="course in Courses" :key="course._id">
                            <td></td>
                            <td>{{ course.themeId.title }}</td>  
                            <td>{{ course.classId.cantonId.name }}</td>  
                            <td>{{ course.classId.periode }}</td> 
                            <td>{{ course.date }}</td>  
                            <td>
                                <router-link :to="`/courses/${course._id}`" class="btn btn-view">View Course</router-link>
                                <router-link :to="`/courses/update/${course._id}`" class="btn btn-update">Update</router-link>
                                <button @click.prevent="deleteCourse(course._id)" class="btn btn-delete">Delete</button> 
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
    import Course from "@/services/CourseService"
    import Cant from "@/services/CantonService"
    import Theme from "@/services/ThemeService"

    export default {
        data() {
            return {
                Courses: [],
                filterTheme: "",
                filterCanton: "",
                filterDate: "",
                cantons: '',
                themes: ''
            }
        },
        created() {       
            this.get();
            Cant.getAllNames().then(res => {
                this.cantons = res
            });
            Theme.getAllTitles().then(res => {
                this.themes = res
            });
        },
        methods: {
            get(){
                Course.getAll().then(res => {
                    this.Courses = res
                    this.getDate();
                });
            },
            getDate(){
                for (let i=0; i<this.Courses.length; ++i) {
                    this.Courses[i].date = this.Courses[i].date.substring(0,10);
                }
            },
            deleteCourse(id){
                let indexOfArrayItem = this.Courses.findIndex(i => i._id === id);
                if (window.confirm("Do you really want to delete this course?")) {
                    Course.delete(id).then(() => {
                        this.Courses.splice(indexOfArrayItem, 1);
                    }).catch(error => {
                        console.log(error)
                    });
                }
            },
            searchFilters(theme, canton, date){
                if (canton != ''){
                    Cant.findFilters(canton).then(res => {
                        Course.findFilters(theme, res[0]._id, date).then(res => {
                            this.Courses = res;
                            this.getDate();
                        });
                    });
                }else{
                    Course.findFilters(theme, canton, date).then(res => {
                        this.Courses = res;
                        this.getDate();
                    });
                }
            },
            reset(){
                this.filterTheme = "";
                this.filterCanton = "";
                this.filterDate = "";
                this.get();
            }
        }
    }
</script>

<style scoped>
    h3 {
        margin-top: 10px;
        margin-bottom: 10px;
    }
</style>