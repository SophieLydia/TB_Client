<template>
    <div>
        <h3>Details of the theme:</h3>
        <div class="row">
            <div class="col-md-12">
                <table class="table table-striped">
                    <thead class="thead-dark">
                        <tr>
                            <th>Title</th>
                            <td>{{ theme.title }}</td>
                        </tr>
                        <tr>
                            <th>Description</th>
                            <td>{{ theme.description }}</td>
                        </tr>
                    </thead>
                </table>
            </div>
        </div>
        <div class="row justify-content-center">
            <div class="col-sm-auto">
                <router-link :to="`/themes/update/${theme._id}`" class="btn btn-update">Update</router-link>
                <button @click.prevent="deleteTheme(`${theme._id}`)" class="btn btn-delete">Delete</button>
            </div>
        </div>
    </div>
</template>

<script>
    import Theme from "@/services/ThemeService"

    export default {
        data() {
            return {
                theme: {
                    _id: '',
                    title: '',
                    description: ''
                }
            }
        },
        async created() {  
            const res = await Theme.get(`${this.$route.params.id}`);
            this.theme = res; 
        },
        methods: {
            deleteTheme(id){
                if (window.confirm("Do you really want to delete this theme?")) {
                        Theme.delete(id).then(() => {
                            this.$router.push("/themes/list");
                    });
                }
            }
        }
    }
</script>

<style scoped>
    h3 {
        margin-top: 20px;
        margin-bottom: 20px;
    }
</style>