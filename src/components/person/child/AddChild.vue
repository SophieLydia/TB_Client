<template>
    <div class="row justify-content-center">
        <div class="col-sm-6">
            <h3 class="text-center">Complete the fields specific to the role</h3>
            <form @submit.prevent="handleSubmitForm">
                <div class="form-group">
                    <label>Periode</label>
                    <select class="form-control" v-model="person.periode" required>
                        <option value="" selected disabled hidden>Select Periode</option>
                        <option value="morning">Morning</option>
                        <option value="afternoon">Afternoon</option>
                    </select>
                </div>

                <div class="form-group">
                    <label>Canton</label>
                    <br>
                    <select class="form-control" v-model="person.canton" required>
                        <option value="" selected disabled hidden>Select Canton</option>
                        <option v-for="cant in cantons" :key=cant :value="cant">{{ cant }}</option>
                    </select>
                </div>

                <div class="form-group">
                    <label>Parental statement</label>
                    <select class="form-control" v-model="person.parentalStatement" required>
                        <option value="" disabled hidden>Select Parental Statement</option>
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                    </select>
                </div>

                <div class="form-group">
                    <label>Allergy</label>
                    <input type="text" class="form-control" v-model="person.allergy">
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
    import Class from "@/services/ClassService"

    export default {
        data() {
            return {
                person: {
                    id: '',
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
                    Class.findFilters(this.person.periode, this.person.cantonId).then(res => {
                        this.person.classId = res[0]._id;
                        const child = JSON.parse(JSON.stringify({'_id': this.person.id, 'classId': this.person.classId, 'parentalStatement': this.person.parentalStatement, 'allergy': this.person.allergy}));
                        Person.createChild(child).then(() => {
                            this.$router.push('/people/list');
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
</style>