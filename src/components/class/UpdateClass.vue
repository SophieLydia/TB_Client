<template>
    <div class="row justify-content-center">
        <div class="col-sm-6">
            <h3 class="text-center">Update Class</h3>
            <form @submit.prevent="handleUpdateForm">
                <div class="form-group">
                    <label>Canton</label>
                    <select class="form-control" v-model="selectedCanton">
                        <option v-for="cant in cantons" :key=cant :value="cant" :selected="cant == selectedCanton">{{ cant }}</option>
                    </select>
                </div>

                <div class="form-group">
                    <label>Periode</label>
                    <select class="form-control" v-model="selectedPeriode">
                        <option value="morning">Morning</option>
                        <option value="afternoon">Afternoon</option>
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
import Class from "@/services/ClassService"
import Cant from "@/services/CantonService"

export default {
    data() {
        return {
            slectedPeriode: '',
            selectedCanton: '',
            cantons: ''
        }
    },
    async created() {
        Cant.getAllNames().then(res => {
            this.cantons = res
        });
        const resClass = await Class.get(`${this.$route.params.id}`);
        this.selectedCanton = resClass.cantonId.name;
        this.selectedPeriode = resClass.periode;
    },
    methods: {
        async handleUpdateForm() {
            const resCantonId = await Cant.findFilters(this.selectedCanton);
            const updatedClass = JSON.parse(JSON.stringify({"cantonId":resCantonId[0]._id, "periode":this.selectedPeriode}));
            Class.update(`${this.$route.params.id}`, updatedClass).then(() => {
                this.$router.push('/classes/list');
                if (window.confirm("The class has been updated")) {
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