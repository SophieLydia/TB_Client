<template>
    <div class="row justify-content-center">
        <div class="col-sm-6">
            <h3 class="text-center">Add Person</h3>
            <form @submit.prevent="handleSubmitForm">
                <div class="form-group">
                    <label>First Name</label>
                    <input type="text" class="form-control" v-model="person.firstName" required>
                </div>

                <div class="form-group">
                    <label>Last Name</label>
                    <input type="text" class="form-control" v-model="person.lastName" required>
                </div>

                <div class="form-group">
                    <label>Email</label>
                    <input type="text" class="form-control" v-model="person.email" required>
                </div>

                <div class="form-group">
                    <label>Phone Number</label>
                    <input type="text" class="form-control" v-model="person.phoneNumber" required>
                </div>

                <div class="form-group">
                    <label>Post Code</label>
                    <input type="number" class="form-control" v-model="person.address.postCode" required>
                </div>

                <div class="form-group">
                    <label>City</label>
                    <input type="text" class="form-control" v-model="person.address.city" required>
                </div>

                <div class="form-group">
                    <label>Street Name</label>
                    <input type="text" class="form-control" v-model="person.address.streetName" required>
                </div>

                <div class="form-group">
                    <label>Street Number</label>
                    <input type="number" class="form-control" v-model="person.address.streetNumber" required>
                </div>

                <div class="form-group">
                    <label>Role</label>
                    <select class="form-control" v-model="person.role" required>
                        <option value="" selected disabled hidden>Select Role</option>
                        <option value="child">Child</option>
                        <option value="assistant">Assistant</option>
                        <option value="boss">Boss</option>
                    </select>
                </div>                
                <div class="row justify-content-center">
                    <div class=" col-sm-auto">
                        <div class="form-group">
                            <button class="btn btn-add">Add</button>
                        </div>
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
                    id: '',
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
        methods: {
            handleSubmitForm() {
                Person.create(this.person).then(() => {
                    Person.getAll().then((res) => {
                        this.person.id = res[res.length -1]._id;
                        this.goTo();
                    });
                });
            },
            goTo(){
                if (this.person.role == "assistant"){
                    this.$router.push(`/assistant/add/${this.person.id}`)
                }else if (this.person.role == "child"){
                    this.$router.push(`/child/add/${this.person.id}`)
                }else{
                    this.$router.push('/people/list')
                }
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