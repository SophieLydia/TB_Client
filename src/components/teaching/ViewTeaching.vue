<template>
    <div>
        <h3>Details of the teaching:</h3>
        <div class="row">
            <div class="col-md-12">
                <table class="table table-striped">
                    <thead class="thead-dark">
                        <tr>
                            <th>Name</th>
                            <td>{{ teach.name }}</td>
                        </tr>
                        <tr>
                            <th>Theme</th>
                            <td>{{ teach.theme }}</td>
                        </tr>
                        <tr>
                            <th>Canton</th>
                            <td>{{ teach.canton }}</td>
                        </tr>
                        <tr>
                            <th>Periode</th>
                            <td>{{ teach.periode }}</td>  
                        </tr>
                        <tr>           
                            <th>Date</th>
                            <td>{{ teach.date }}</td> 
                        </tr>
                    </thead>
                </table>
            </div>
        </div>
        <div class="row justify-content-center">
            <div class="col-sm-auto">
                <router-link :to="`/teachings/update/${teach._id}`" class="btn btn-update">Update</router-link>
                <button @click.prevent="deleteTeaching(`${teach._id}`)" class="btn btn-delete">Delete</button>
            </div>
        </div>
    </div>
</template>

<script>
    import Teach from "@/services/TeachingService"
    import Class from "@/services/ClassService"
    import Theme from "@/services/ThemeService"
    import Person from '@/services/PersonService'

    export default {
        data() {
            return {
                teach: {
                    _id: '',
                    name: '',
                    theme: '',
                    canton: '',
                    periode: '',
                    date: ''
                }
            }
        },
        async created() {  
            const resTeach = await Teach.get(`${this.$route.params.id}`);
            const resName = await Person.get(resTeach.assistantId._id);
            this.teach._id = resTeach._id;
            this.teach.name = (resName.firstName + " " + resName.lastName);
            this.teach.date = resTeach.courseId.date;  
            this.getPeriode(resTeach.courseId.classId);
            this.getCanton(resTeach.courseId.classId);
            this.getTheme(resTeach.courseId.themeId);
            this.getDate();
        },
        methods: {
            deleteTeaching(id){
                if (window.confirm("Do you really want to delete this teaching?")) {
                        Teach.delete(id).then(() => {
                            this.$router.push("/teachings/list");
                    });
                }
            },
            getDate(){
                this.teach.date = this.teach.date.substring(0,10);
            },
            async getPeriode(classId){
                await Class.get(classId).then(res => {
                    this.teach.periode = res.periode;
                });
            },
            async getCanton(classId){
                await Class.get(classId).then(res => {
                    this.teach.canton = res.cantonId.name;
                });
            },
            async getTheme(themeId){
                await Theme.get(themeId).then(res => {
                    this.teach.theme = res.title;
                });
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