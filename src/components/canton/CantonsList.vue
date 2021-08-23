<template>
    <div>
        <h3>List of all the cantons:</h3>
        <div class="add">
            <router-link to="/cantons/add" class="btn btn-add">Click here to add a canton</router-link>
        </div>
        <div class="filter"> 
            <h5>Search by:</h5>
            <div class="col">
                Name
                <select v-model="filterCanton">
                    <option value="">All cantons</option>
                    <option v-for="cant in cantons" :key=cant._id :value="cant.name">{{ cant.name }}</option>
                </select>
            </div>
            <button @click.prevent="searchFilters(filterCanton)" class="btn btn-search">Search</button>
            <button @click.prevent="reset()" class="btn btn-reset">Reset</button>
        </div>
        <div class="row">
            <div class="col-md-12">
                <table class="table table-striped">
                    <thead class="thead-dark">
                        <tr>
                            <th>Name</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="cant in Cantons" :key="cant._id">
                            <td>{{ cant.name }}</td>  
                            <td>
                                <router-link :to="`/cantons/${cant._id}`" class="btn btn-view">View Canton</router-link>
                                <router-link :to="`/cantons/update/${cant._id}`" class="btn btn-update">Update</router-link>
                                <button @click.prevent="deleteCanton(cant._id)" class="btn btn-delete">Delete</button> 
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

    export default {
        data() {
            return {
                Cantons: [],
                cantons: [],
                filterCanton: ""
            }
        },
        created() {       
            this.get();
            Cant.getAll().then(res => {
                this.cantons = res
            });
        },
        methods: {
            get(){
                Cant.getAll().then(res => {
                    this.Cantons = res
                });
            },
            deleteCanton(id){
                let indexOfArrayItem = this.Cantons.findIndex(i => i._id === id);
                if (window.confirm("Do you really want to delete this canton?")) {
                    Cant.delete(id).then(() => {
                        this.Cantons.splice(indexOfArrayItem, 1);
                    }).catch(error => {
                        console.log(error)
                    });
                }
            },
            async searchFilters(filterCanton){
                if (filterCanton != ''){
                    Cant.findFilters(filterCanton).then(res => {
                        this.Cantons = res;
                    });
                }else{
                    this.get();
                }
            },
            reset(){
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