<template>
    <div>
        <h3>Details of the course:</h3>
        <div class="row">
            <div class="col-md-12">
                <table class="table table-striped">
                    <thead class="thead-dark">
                        <tr>
                            <th>Theme</th>
                            <td>{{ course.theme }}</td>
                        </tr>
                        <tr>
                            <th>Canton</th>
                            <td>{{ course.canton }}</td>
                        </tr>
                        <tr>
                            <th>Periode</th>
                            <td>{{ course.periode }}</td>  
                        </tr>
                        <tr>           
                            <th>Date</th>
                            <td>{{ course.date }}</td> 
                        </tr>
                        <tr>     
                            <th>Cost</th>
                            <td>{{ course.cost }}</td>
                        </tr>
                        <tr>         
                            <th>Absence</th>
                            <td> {{ course.absence.join(', ') }} </td>
                        </tr>
                    </thead>
                </table>
            </div>
        </div>
        <div class="row justify-content-center">
            <div class="col-sm-auto">
                <router-link :to="`/courses/update/${course._id}`" class="btn btn-update">Update</router-link>
                <button @click.prevent="deleteCourse(`${course._id}`)" class="btn btn-delete">Delete</button>
            </div>
        </div>
    </div>
</template>

<script>
    import Course from "@/services/CourseService"
    import Class from "@/services/ClassService"
    import Theme from "@/services/ThemeService"
    import Person from '@/services/PersonService'

    export default {
        data() {
            return {
                course: {
                    _id: '',
                    theme: '',
                    canton: '',
                    periode: '',
                    date: '',
                    cost: '',
                    absence: []
                }
            }
        },
        async created() {  
            const res = await Course.get(`${this.$route.params.id}`);
            let coursePars = JSON.parse(JSON.stringify(res));
            this.course._id = coursePars._id;
            this.course.date = coursePars.date;
            this.course.cost = coursePars.cost;
            this.course.absence = coursePars.absence;  
            this.getPeriode(coursePars.classId);
            this.getCanton(coursePars.classId);
            this.getTheme(coursePars.themeId);
            this.getAbsence();
            this.getDate();
        },
        methods: {
            deleteCourse(id){
                if (window.confirm("Do you really want to delete this course?")) {
                        Course.delete(id).then(() => {
                            this.$router.push("/courses/list");
                    });
                }
            },
            getDate(){
                this.course.date = this.course.date.substring(0,10);
            },
            async getAbsence(){
                let listAbsence = [];
                for (let i=0; i<this.course.absence.length; ++i) {
                    await Person.get(this.course.absence[i]).then(res => {
                        listAbsence[i] = res.firstName + " " + res.lastName;
                    });
                }
                this.course.absence = listAbsence;
            },
            async getPeriode(classId){
                await Class.get(classId).then(res => {
                    this.course.periode = res.periode;
                });
            },
            async getCanton(classId){
                await Class.get(classId).then(res => {
                    this.course.canton = res.cantonId.name;
                });
            },
            async getTheme(themeId){
                await Theme.get(themeId).then(res => {
                    this.course.theme = res.title;
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