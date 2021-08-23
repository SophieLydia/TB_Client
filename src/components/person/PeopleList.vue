<template>
    <div>
        <h3>List of all the people:</h3>
        <div class="add">
            <router-link :to="`/people/add`" class="btn btn-add">Click here to add a person</router-link>
        </div>
        <div class="filter"> 
            <h5>Search by:</h5>
            <div class="col">
                Role
                <select v-model="filterRole">
                    <option value="">All roles</option>  
                    <option value="child">Child</option>
                    <option value="assistant">Assistant</option>
                    <option value="boss">Boss</option>
                </select>
                Name 
                <input type="text" v-model="filterName" placeholder="First or/and last name"> 
                Periode
                <select v-model="filterPeriode">
                    <option value="">All periodes</option>  
                    <option value="morning">Morning</option>
                    <option value="afternoon">Afternoon</option>
                </select>
                Canton
                <select v-model="filterCanton">
                    <option value="">All cantons</option>
                    <option v-for="cant in cantons" :key=cant :value="cant">{{ cant }}</option>
                </select>
            </div>
            <button @click.prevent="searchFilters(filterRole, filterName, filterCanton, filterPeriode)" class="btn btn-search">Search</button>
            <button @click.prevent="reset()" class="btn btn-reset">Reset</button>
        </div>
        <div class="row">
            <div class="col-md-12">
                <table class="table table-striped">
                    <thead class="thead-dark">
                        <tr>
                            <th></th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Role</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="person in People" :key="person._id">
                            <td></td>
                            <td>{{ person.firstName }}</td>  
                            <td>{{ person.lastName }}</td>  
                            <td>{{ person.role }}</td>  
                            <td>
                                <router-link :to="`/people/${person._id}`" class="btn btn-view">View Person</router-link>
                                <router-link :to="`/people/update/${person._id}`" class="btn btn-update">Update</router-link>
                                <button @click.prevent="deletePerson(person._id)" class="btn btn-delete">Delete</button> 
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
    import Person from "@/services/PersonService"
    import Cant from "@/services/CantonService"

    export default {
        data() {
            return {
                People: [],
                filterRole: "",
                filterName: "",
                filterCanton: "",
                filterPeriode: "",
                cantons: ''
            }
        },
        created() {       
            Person.getAll().then(res => {
                this.People = res
            });
            Cant.getAllNames().then(res => {
                this.cantons = res
            });
        },
        methods: {
            get(){
                Person.getAll().then(res => {
                    this.People = res
                });
            },
            deletePerson(id){
                let indexOfArrayItem = this.People.findIndex(i => i._id === id);
                if (window.confirm("Do you really want to delete this person?")) {
                        Person.delete(id).then(() => {
                        this.People.splice(indexOfArrayItem, 1);
                    }).catch(error => {
                        console.log(error)
                    });
                }
            },
            searchFilters(role, name, canton, periode){
                Person.findFilters(role, name, canton, periode).then(res => {
                    this.People = res
                });
            },
            reset(){
                this.filterRole = "";
                this.filterName = "";
                this.filterCanton = "";
                this.filterPeriode = "";
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