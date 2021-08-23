<template>
    <div class="row justify-content-center">
        <div class="col-sm-6">
            <h3 class="text-center">Update Theme</h3>
            <form @submit.prevent="handleUpdateForm">
                <div class="form-group">
                    <label>Title</label>
                    <input type="text" class="form-control" v-model="theme.title">
                </div>

                <div class="form-group">
                    <label>Description</label>
                    <textarea type="text" class="form-control" v-model="theme.description"></textarea>
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
    async created() {
        const resTheme = await Theme.get(`${this.$route.params.id}`);
        this.theme = resTheme;
    },
    methods: {
        async handleUpdateForm() {
            Theme.update(`${this.$route.params.id}`, this.theme).then(() => {
                this.$router.push('/themes/list');
                if (window.confirm("The theme has been updated")) {
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