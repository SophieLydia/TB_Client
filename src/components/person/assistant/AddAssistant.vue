<template>
    <div class="row justify-content-center">
        <div class="col-sm-6">
            <h3 class="text-center">Complete the fields specific to the role</h3>
            <form @submit.prevent="handleSubmitForm">
                <div class="form-group">
                    <label>Salary</label>
                    <input type="number" step="0.05" class="form-control" v-model="person.salary" required>
                </div>

                <div class="form-group">
                    <label>Canton</label>
                    <br>
                    <select class="form-control" v-model="person.canton">
                        <option value="" selected disabled hidden>Select Canton</option>
                        <option v-for="cant in cantons" :key=cant :value="cant">{{ cant }}</option>
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
    import Cant from "@/services/CantonService"
    export default {
        data() {
            return {
                person: {
                    id: '',
                    firstName: '',
                    salary: '',
                    canton: '',
                    cantonId: ''
                },
                cantons: ''
            }
        },
        created() {
            Person.get(`${this.$route.params.id}`).then(res => {
                this.person.firstName = res.firstName;
                this.person.id = res._id;
            });
            Cant.getAllNames().then(res => {
                this.cantons = res
            });
        },
        methods: {
            handleSubmitForm() {
                Cant.findFilters(this.person.canton).then(res => {
                    this.person.cantonId = res[0]._id;
                    const assistant = JSON.parse(JSON.stringify({'_id': this.person.id , 'salary': this.person.salary, 'cantonId': this.person.cantonId}));
                    Person.createAssistant(assistant).then(() => {
                        this.$router.push('/people/list')
                    });
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