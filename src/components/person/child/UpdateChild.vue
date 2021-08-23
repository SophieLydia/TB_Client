<template>
    <div class="row justify-content-center">
        <div id="listing" class="col-sm-4" v-if="person">
            <h3 class="text-center">Update child</h3>
            <h3 class="text-center"> {{person.firstName}} </h3>
            <form @submit.prevent="handleUpdateForm">
                <div class="form-group">
                    <label>Canton</label>
                    <br>
                    <select v-model="person.canton">
                        <option v-for="cant in cantons" :key=cant :value="cant">{{ cant }}</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Periode</label>
                    <select class="form-control" v-model="person.periode">
                        <option value="morning">Morning</option>
                        <option value="afternoon">Afternoon</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Parental Statement</label>
                    <select class="form-control" v-model="person.parentalStatement">
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Allergy</label>
                    <input type="text" class="form-control" v-model="person.allergy">
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
import Class from "@/services/ClassService"

export default {
    data() {
        return {
            person: {
                firstName: '',
                canton: '',
                cantonId: '',
                periode: '',
                parentalStatement: '',
                allergy: '',
                classId: ''
            },
            cantons: ''
        }
    },
    created() {
        Person.getChild(`${this.$route.params.id}`).then(res => {
                this.person.firstName = res._id.firstName;
                this.person.lastName = res._id.lastName;
                this.person.canton = res.classId.cantonId.name;
                this.person.periode = res.classId.periode;
                this.person.parentalStatement = res.parentalStatement;
                this.person.allergy = res.allergy;
        });
        Cant.getAllNames().then(res => {
            this.cantons = res
        });
    },
    methods: {
        handleUpdateForm() {
            Cant.findFilters(this.person.canton).then(res => {
                this.person.cantonId = res[0]._id;
                Class.findFilters(this.person.periode, this.person.cantonId).then(res => {
                    this.person.classId = res[0]._id;
                    const updatedChild = JSON.parse(JSON.stringify({'classId': this.person.classId, 'parentalStatement': this.person.parentalStatement, 'allergy': this.person.allergy}));
                    Person.updateChild(`${this.$route.params.id}`, updatedChild).then(() => {
                        this.$router.push(`/child/${this.$route.params.id}`);
                        if (window.confirm(this.person.firstName + " has been updated")) {
                            this.$router.go();
                        }
                    });
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
    .btn-update {
        background-color: rgb(84, 155, 113);
        margin-right: 10px;
    }
</style>