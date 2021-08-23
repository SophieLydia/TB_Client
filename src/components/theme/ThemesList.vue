<template>
    <div>
        <h3>List of all the themes:</h3>
        <div class="add">
            <router-link to="/themes/add" class="btn btn-add">Click here to add a theme</router-link>
        </div>
        <div class="row">
            <div class="col-md-12">
                <table class="table table-striped">
                    <thead class="thead-dark">
                        <tr>
                            <th>Title</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="theme in Themes" :key="theme._id">
                            <td>{{ theme.title }}</td>  
                            <td>
                                <router-link :to="`/themes/${theme._id}`" class="btn btn-view">View Theme</router-link>
                                <router-link :to="`/themes/update/${theme._id}`" class="btn btn-update">Update</router-link>
                                <button @click.prevent="deleteTheme(theme._id)" class="btn btn-delete">Delete</button> 
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
    import Theme from "@/services/ThemeService"

    export default {
        data() {
            return {
                Themes: []
            }
        },
        created() {       
            Theme.getAll().then(res => {
                this.Themes = res
            });
        },
        methods: {
            deleteTheme(id){
                let indexOfArrayItem = this.Themes.findIndex(i => i._id === id);
                if (window.confirm("Do you really want to delete this theme?")) {
                    Theme.delete(id).then(() => {
                        this.Themes.splice(indexOfArrayItem, 1);
                    }).catch(error => {
                        console.log(error)
                    });
                }
            }
        }
    }
</script>

<style scoped>
    h3 {
        margin-top: 10px;
        margin-bottom: 10px;
    }
</style>