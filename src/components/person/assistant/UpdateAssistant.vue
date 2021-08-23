<template>
    <div class="row justify-content-center">
        <div id="listing" class="col-sm-4" v-if="person">
            <h3 class="text-center">Update assistant</h3>
            <h3 class="text-center"> {{person.firstName}} </h3>
            <form @submit.prevent="handleUpdateForm">
                <div class="form-group">
                    <label>Salary</label>
                    <input type="number" step="0.05" class="form-control" v-model="person.salary">
                </div>
                <div class="form-group">
                    <label>Canton</label>
                    <br>
                    <select v-model="person.canton">
                        <option v-for="cant in cantons" :key=cant :value="cant">{{ cant }}</option>
                    </select>
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
import Cant from "@/services/CantonService"

export default {
    data() {
        return {
            person: {
                firstName: '',
                salary: '',
                canton: '',
                cantonId: ''
            },
            cantons: ''
        }
    },
    created() {
        Person.getAssistant(`${this.$route.params.id}`).then(res => {
            this.person.firstName = res._id.firstName;
            this.person.salary = res.salary;
            this.person.canton = res.cantonId.name;
            this.person.cantonId = res.cantonId._id;
        });
        Cant.getAllNames().then(res => {
            this.cantons = res
        });
    },
    methods: {
        handleUpdateForm() {
            Cant.findFilters(this.person.canton).then(res => {
                this.person.cantonId = res[0]._id;
                const updatedAssistant = JSON.parse(JSON.stringify({'salary': this.person.salary, 'cantonId': this.person.cantonId}));
                Person.updateAssistant(`${this.$route.params.id}`, updatedAssistant).then(() => {
                    this.$router.push(`/assistant/${this.$route.params.id}`);
                    if (window.confirm(this.person.firstName + " has been updated")) {
                        this.$router.go();
                    }
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