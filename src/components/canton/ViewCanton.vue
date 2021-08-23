<template>
    <div>
        <h3>Details of the canton:</h3>
        <div class="row">
            <div class="col-md-12">
                <table class="table table-striped">
                    <thead class="thead-dark">
                        <tr>
                            <th>Name</th>
                            <td>{{ canton.name }}</td>
                        </tr>
                        <tr>
                            <th>Post Code</th>
                            <td>{{ canton.address.postCode }}</td>
                        </tr>
                        <tr>
                            <th>City</th>
                            <td>{{ canton.address.city }}</td>  
                        </tr>
                        <tr>           
                            <th>Street Name</th>
                            <td>{{ canton.address.streetName }}</td> 
                        </tr>
                        <tr>     
                            <th>Street Number</th>
                            <td>{{ canton.address.streetNumber }}</td>
                        </tr>
                        <tr>         
                            <th>Budget</th>
                            <td> {{ canton.budget }} CHF </td>
                        </tr>
                    </thead>
                </table>
            </div>
        </div>
        <div class="row justify-content-center">
            <div class="col-sm-auto">
                <router-link :to="`/cantons/update/${canton._id}`" class="btn btn-update">Update</router-link>
                <button @click.prevent="deleteCanton(`${canton._id}`)" class="btn btn-delete">Delete</button>
            </div>
        </div>
    </div>
</template>

<script>
    import Cant from "@/services/CantonService"

    export default {
        data() {
            return {
                canton: {
                    name: '',
                    address: {
                        postCode: '',
                        city: '',
                        streetName: '',
                        streetNumber: ''
                    },
                    budget: ''
                }
            }
        },
        async created() {  
            this.canton = await Cant.get(`${this.$route.params.id}`);
            console.log(this.canton);
        },
        methods: {
            deleteCanton(id){
                if (window.confirm("Do you really want to delete this canton?")) {
                        Cant.delete(id).then(() => {
                            this.$router.push("/cantons/list");
                    });
                }
            }
        }
    }
</script>

<style scoped>
    h3 {
        margin-top: 20px;
        margin-bottom: 20px;
    }
</style>