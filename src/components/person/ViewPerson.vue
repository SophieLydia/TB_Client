<template>
    <div>
        <h3>Details of the personal data:</h3>
        <div class="row">
            <div class="col-md-12">
                <table class="table table-striped">
                    <thead class="thead-dark">
                        <tr>
                            <th>First Name</th>
                            <td>{{ person.firstName }}</td>
                        </tr>
                        <tr>
                            <th>Last Name</th>
                            <td>{{ person.lastName }}</td>
                        </tr>
                        <tr>
                            <th>Email</th>
                            <td>{{ person.email }}</td>  
                        </tr>
                        <tr>           
                            <th>Phone Number</th>
                            <td>{{ person.phoneNumber }}</td> 
                        </tr>
                        <tr>     
                            <th>Post Code</th>
                            <td>{{ person.address.postCode }}</td>
                        </tr>
                        <tr>         
                            <th>City</th>
                            <td>{{ person.address.city }}</td>
                        </tr>
                        <tr>              
                            <th>Street Name</th>
                            <td>{{ person.address.streetName }}</td>
                        </tr>
                        <tr>       
                            <th>Street Number</th>
                            <td>{{ person.address.streetNumber }}</td>
                        </tr>
                        <tr>     
                            <th>Role</th>
                            <td>{{ person.role }}
                                <router-link :to="`/${person.role}/${person._id}`" class="btn btn-details">More details here</router-link>
                            </td>
                        </tr>
                    </thead>
                </table>
            </div>
        </div>
        <div class="row justify-content-center">
            <div class="col-sm-auto">
                <router-link :to="`/people/update/${person._id}`" class="btn btn-update">Update</router-link>
                <button @click.prevent="deletePerson(`${person._id}`)" class="btn btn-delete">Delete</button>
            </div>
        </div>
    </div>
</template>

<script>
    import Person from "@/services/PersonService"

    export default {
        data() {
            return {
                person: {
                    firstName: '',
                    lastName: '',
                    email: '',
                    phoneNumber: '',
                    address: {
                        postCode: '',
                        city: '',
                        streetName: '',
                        streetNumber: ''
                    },
                    role: ''
                }
            }
        },
        created() {  
            Person.get(`${this.$route.params.id}`).then(res => {
                this.person = res});
        },
        methods: {
            deletePerson(id){
                if (window.confirm("Do you really want to delete this person?")) {
                        Person.delete(id).then(() => {
                            this.$router.push("/people/list");
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