<template>
    <div>
        <h3>List of all the classes:</h3>
        <div class="add">
            <router-link to="/classes/add" class="btn btn-add">Click here to add a class</router-link>
        </div>
        <div class="filter"> 
            <h5>Search by:</h5>
            <div class="col">
                Periode
                <select v-model="filterPeriode">
                    <option value="">All periode</option>
                    <option value="morning">Morning</option>
                    <option value="afternoon">Afternoon</option>
                </select>
                Canton 
                <select v-model="filterCanton">
                    <option value="">All cantons</option>
                    <option v-for="cant in cantons" :key=cant :value="cant">{{ cant }}</option>
                </select>
            </div>
            <button @click.prevent="searchFilters(filterPeriode, filterCanton)" class="btn btn-search">Search</button>
            <button @click.prevent="reset()" class="btn btn-reset">Reset</button>
        </div>
        <div class="row">
            <div class="col-md-12">
                <table class="table table-striped">
                    <thead class="thead-dark">
                        <tr>
                            <th>Canton</th>
                            <th>Periode</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="class_ in Classes" :key="class_._id">
                            <td>{{ class_.cantonId.name }}</td>  
                            <td>{{ class_.periode }}</td>  
                            <td>
                                <router-link :to="`/classes/${class_._id}`" class="btn btn-view">View Class</router-link>
                                <router-link :to="`/classes/update/${class_._id}`" class="btn btn-update">Update</router-link>
                                <button @click.prevent="deleteClass(class_._id)" class="btn btn-delete">Delete</button> 
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
    import Cant from "@/services/CantonService"
    import Class from "@/services/ClassService"

    export default {
        data() {
            return {
                Classes: [],
                filterPeriode: "",
                filterCanton: "",
                cantons: ''
            }
        },
        created() {       
            Cant.getAllNames().then(res => {
                this.cantons = res
            });
            this.get();
        },
        methods: {
            get(){
                console.log(this.cantons)
                Class.getAll().then(res => {
                    this.Classes = res
                    console.log(res)
                });
            },
            deleteClass(id){
                let indexOfArrayItem = this.Classes.findIndex(i => i._id === id);
                if (window.confirm("Do you really want to delete this class?")) {
                    Class.delete(id).then(() => {
                        this.Classes.splice(indexOfArrayItem, 1);
                    }).catch(error => {
                        console.log(error)
                    });
                }
            },
            async searchFilters(filterPeriode, filterCanton){
                if (filterCanton != ''){
                    const cantonId = await Cant.findFilters(filterCanton);
                    Class.findFilters(filterPeriode, cantonId[0]._id).then(res => {
                        this.Classes = res;
                    });
                }else{
                    Class.findFilters(filterPeriode, filterCanton).then(res => {
                        this.Classes = res;
                    });
                }
            },
            reset(){
                this.filterPeriode = "";
                this.filterCanton = "";
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