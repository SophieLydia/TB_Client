<template>
    <div class="row justify-content-center">
        <div class="col-sm-6">
            <h3 class="text-center">Add Theme</h3>
            <form @submit.prevent="handleSubmitForm">
                <div class="form-group">
                    <label>Title</label>
                    <input type="text" class="form-control" v-model="theme.title" required>
                </div>

                <div class="form-group">
                    <label>Description</label>
                    <input type="text" class="form-control" v-model="theme.description" required>
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
    import Theme from "@/services/ThemeService"

    export default {
        data() {
            return {
                theme: {
                    title: '',
                    description: ''
                }
            }
        },
        methods: { 
            handleSubmitForm() {
                Theme.create(this.theme).then(() => {
                    this.$router.push('/themes/list');
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