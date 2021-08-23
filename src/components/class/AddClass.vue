<template>
    <div class="row justify-content-center">
        <div class="col-sm-6">
            <h3 class="text-center">Add Class</h3>
            <form @submit.prevent="handleSubmitForm">
                <div class="form-group">
                    <label>Canton</label>
                    <select class="form-control" v-model="class_.canton">
                        <option value="" disabled hidden>Select Canton</option>
                        <option v-for="cant in cantons" :key=cant :value="cant">{{ cant }}</option>
                    </select>
                    <label>Periode</label>
                    <select class="form-control" v-model="class_.periode" required>
                        <option value="" disabled hidden>Select Periode</option>
                        <option value="morning">Morning</option>
                        <option value="afternoon">Afternoon</option>
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
    import Cant from "@/services/CantonService"
    import Class from "@/services/ClassService"

    export default {
        data() {
            return {
                class_: {
                    canton: '',
                    cantonId: '',
                    periode: ''
                },
                cantons: '',
            }
        },
        created(){
            Cant.getAllNames().then(res => {
                this.cantons = res
            });
        },
        methods: { 
            handleSubmitForm() {
                Cant.findFilters(this.class_.canton).then(res => {
                    this.class_.cantonId = res[0]._id;
                    Class.create(this.class_).then(() => {
                        this.$router.push('/classes/list');
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