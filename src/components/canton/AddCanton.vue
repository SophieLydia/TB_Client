<template>
    <div class="row justify-content-center">
        <div class="col-sm-6">
            <h3 class="text-center">Add Canton</h3>
            <form @submit.prevent="handleSubmitForm">
                <div class="form-group">
                    <label>Name</label>
                    <input type="text" class="form-control" v-model="canton.name" required>
                </div>

                <div class="form-group">
                    <label>Budget</label>
                    <input type="number" step="0.05" class="form-control" v-model="canton.budget" required>
                </div>

                <div class="form-group">
                    <label>Post Code</label>
                    <input type="number" class="form-control" v-model="canton.address.postCode" required>
                </div>

                <div class="form-group">
                    <label>City</label>
                    <input type="text" class="form-control" v-model="canton.address.city" required>
                </div>

                <div class="form-group">
                    <label>Street Name</label>
                    <input type="text" class="form-control" v-model="canton.address.streetName" required>
                </div>

                <div class="form-group">
                    <label>Street Number</label>
                    <input type="number" class="form-control" v-model="canton.address.streetNumber" required>
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
        methods: { 
            handleSubmitForm() {
                Cant.create(this.canton).then(() => {
                    this.$router.push('/cantons/list');
            
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