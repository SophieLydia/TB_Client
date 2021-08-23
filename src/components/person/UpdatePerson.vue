<template>
    <div class="row justify-content-center">
        <div class="col-sm-6">
            <h3 class="text-center">Update Person</h3>
            <form @submit.prevent="handleUpdateForm">
                <div class="form-group">
                    <label>First Name</label>
                    <input type="text" class="form-control" v-model="person.firstName">
                </div>

                <div class="form-group">
                    <label>Last Name</label>
                    <input type="text" class="form-control" v-model="person.lastName">
                </div>

                <div class="form-group">
                    <label>Email</label>
                    <input type="text" class="form-control" v-model="person.email">
                </div>

                <div class="form-group">
                    <label>Phone Number</label>
                    <input type="text" class="form-control" v-model="person.phoneNumber">
                </div>

                <div class="form-group">
                    <label>Post Code</label>
                    <input type="number" class="form-control" v-model="person.address.postCode">
                </div>

                <div class="form-group">
                    <label>City</label>
                    <input type="text" class="form-control" v-model="person.address.city">
                </div>

                <div class="form-group">
                    <label>Street Name</label>
                    <input type="text" class="form-control" v-model="person.address.streetName">
                </div>

                <div class="form-group">
                    <label>Street Number</label>
                    <input type="number" class="form-control" v-model="person.address.streetNumber">
                </div> 

                <div class="row justify-content-center">
                    <div class="col-sm-auto">
                        <button class="btn btn-update">Update</button>
                    </div>
                </div> 
            </form>                
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
                }
            }
        }
    },
    created() {
        Person.get(`${this.$route.params.id}`).then(res => {
            this.person = res});
    },
    methods: {
        handleUpdateForm() {
            const updatedPerson = JSON.parse(JSON.stringify(this.person));
            Person.update(`${this.$route.params.id}`, updatedPerson).then(() => {
                this.$router.push('/people/list');
                if (window.confirm(updatedPerson.firstName + " has been updated")) {
                    this.$router.go();
                }
            });
        }
    }
}
</script>

<style scoped>
    .btn {
        margin-top: 30px;
    }
    h3 {
        margin-top: 20px;
        margin-bottom: 20px;
    }
</style>