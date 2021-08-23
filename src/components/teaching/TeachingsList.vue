<template>
    <div>
        <h3>List of all the teachings:</h3>
        <div class="add">
            <router-link to="/teachings/add" class="btn btn-add">Click here to add a teaching</router-link>
        </div>
        <div class="filter"> 
            <h5>Search by:</h5>
            
            <div class="col">
                Name of assistant
                <input type="text" style="width: 300px" v-model="filterName" placeholder="First and/or last name of the assistant">
                Theme 
                <select v-model="filterTheme">
                    <option value="">All themes</option>
                    <option v-for="theme in themes" :key=theme._id :value="theme.title">{{ theme.title }}</option>
                </select>
                Canton
                <select v-model="filterCanton">
                    <option value="">All cantons</option>
                    <option v-for="cant in cantons" :key=cant._id :value="cant.name">{{ cant.name }}</option>
                </select>
                Date
                <input type="date" v-model="filterDate">
            </div>
            <button @click.prevent="searchFilters(filterName, filterTheme, filterCanton, filterDate)" class="btn btn-search">Search</button>
            <button @click.prevent="reset()" class="btn btn-reset">Reset</button>
        </div>
        <div class="row">
            <div class="col-md-12">
                <table class="table table-striped">
                    <thead class="thead-dark">
                        <tr>
                            <th>Name</th>
                            <th>Theme</th>
                            <th>Canton</th>
                            <th>Date</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="teach in Teachings" :key="teach._id">
                            <td>{{ teach.assistantId._id.firstName }} {{ teach.assistantId._id.lastName }}</td>  
                            <td>{{ teach.courseId.themeId}}</td>
                            <td>{{ teach.courseId.classId.cantonId}}</td>
                            <td>{{ teach.courseId.date}}</td>
                            <td>
                                <router-link :to="`/teachings/${teach._id}`" class="btn btn-view">View Teaching</router-link>
                                <router-link :to="`/teachings/update/${teach._id}`" class="btn btn-update">Update</router-link>
                                <button @click.prevent="deleteTeaching(teach._id)" class="btn btn-delete">Delete</button> 
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
    import Teach from "@/services/TeachingService"
    import Cant from "@/services/CantonService"
    import Theme from "@/services/ThemeService"

    export default {
        data() {
            return {
                Teachings: [],
                cantons: [],
                themes: [],
                filterName: '',
                filterTheme: '',
                filterCanton: '',
                filterDate: '',
            }
        },
        created() {       
            this.get();
            Cant.getAll().then(res => {
                this.cantons = res
            });
            Theme.getAll().then(res => {
                this.themes = res;
            });
        },
        methods: {
            get(){
                Teach.getAll().then(res => {
                    this.Teachings = res
                    this.getDetails();
                });
            },
            getDetails(){
                for (let i=0; i<this.Teachings.length; ++i) {
                    this.Teachings[i].courseId.date = this.Teachings[i].courseId.date.substring(0,10);
                    Theme.get(this.Teachings[i].courseId.themeId).then(res => {
                        this.Teachings[i].courseId.themeId = res.title;
                    });
                    Cant.get(this.Teachings[i].courseId.classId.cantonId).then(res => {
                        this.Teachings[i].courseId.classId.cantonId = res.name;
                    });
                }
            },
            deleteTeaching(id){
                let indexOfArrayItem = this.Teachings.findIndex(i => i._id === id);
                if (window.confirm("Do you really want to delete this teaching?")) {
                    Teach.delete(id).then(() => {
                        this.Teachings.splice(indexOfArrayItem, 1);
                    }).catch(error => {
                        console.log(error)
                    });
                }
            },
            async searchFilters(filterName, filterTheme, filterCanton, filterDate){
                Teach.findFilters(filterName, filterTheme, filterCanton, filterDate).then(res => {
                    this.Teachings = res;
                    this.getDetails();
                });            
            },
            reset(){
                this.filterName = "";
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