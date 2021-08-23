<template>
    <div class="row justify-content-center">
        <div class="col-sm-6">
            <h3 class="text-center">Update Canton</h3>
            <form @submit.prevent="handleUpdateForm">
                <div class="form-group">
                    <label>Name</label>
                    <input type="text" class="form-control" v-model="canton.name">
                </div>

                <div class="form-group">
                    <label>Budget</label>
                    <input type="number" step="0.05" class="form-control" v-model="canton.budget">
                </div>

                <div class="form-group">
                    <label>Post Code</label>
                    <input type="number" class="form-control" v-model="canton.address.postCode">
                </div>

                <div class="form-group">
                    <label>City</label>
                    <input type="text" class="form-control" v-model="canton.address.city">
                </div>

                <div class="form-group">
                    <label>Street Name</label>
                    <input type="text" class="form-control" v-model="canton.address.streetName">
                </div>

                <div class="form-group">
                    <label>Street Number</label>
                    <input type="number" class="form-control" v-model="canton.address.streetNumber">
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
    },
    methods: {
        async handleUpdateForm() {
            Cant.update(`${this.$route.params.id}`, this.canton).then(() => {
                this.$router.push('/cantons/list');
                if (window.confirm("The canton of " + this.canton.name +  " has been updated")) {
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