<template>
    <div class="row justify-content-center">
        <div class="col-sm-6">
            <h3 class="text-center">Add Teaching</h3>
            <form @submit.prevent="handleSubmitForm">
                <div class="form-group">
                    <label>Name of the assistant</label>
                    <select class="form-control" v-model="teach.assistantId" required @change="newCourses($event)">
                        <option value="" disabled hidden>Select Name</option>
                        <option v-for="name in names" :key=name._id :value="name._id">{{ name.firstName }} {{ name.lastName }}</option>
                    </select>
                </div>

                <div class="form-group">
                    <label>Course</label>
                    <select class="form-control" v-model="teach.courseId" required @change="newAssistants($event)">
                        <option value="" disabled hidden>Select Course</option>
                        <option v-for="course in courses" :key=course._id :value="course">
                            {{ course.themeId.title }} -
                            {{ course.classId.cantonId.name }} -
                            {{ course.classId.periode }} -
                            {{ course.date.substring(0,10) }}
                        </option>
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
            Once you selected an assistant, only the available courses (i.e. in 
            the same canton) are shown. 
            <br>
            Once you selected a course, only the available assistants (i.e. in 
            the same canton) are shown.
            <br>
            If you want to reset, click here: 
            <button @click.prevent="reset()" class="btn btn-reset">Reset</button>      
        </div>
    </div>
</template>

<script>
    import Teach from "@/services/TeachingService"
    import Course from "@/services/CourseService"
    import Person from "@/services/PersonService"

    export default {
        data() {
            return {
                teach: {
                    assistantId: '',
                    courseId: ''
                },
                names: '',
                courses: ''
            }
        },
        created(){
            this.getAll();
        },
        methods: {
            getAll(){
                Person.findFilters("assistant", '', '', '').then(res => {
                    this.names = res;
                });
                Course.getAll().then(res => {
                    this.courses = res;
                });
            }, 
            handleSubmitForm() {
                Teach.create(this.teach).then(() => {
                    this.$router.push('/teachings/list');
                });
            },
            //To have only the courses that are in the same canton as the assistant
            newCourses(event){
                Person.getAssistant(this.teach.assistantId).then(res => {
                    Course.findFilters('', res.cantonId._id, '').then(res => {
                        this.courses = res;
                    });
                });
                this.courses = event;
            },
            //To have only the assistants that are in the same canton as the course
            newAssistants(event){
                Person.findFilters("assistant", '', this.teach.courseId.classId.cantonId.name, '').then(res => {
                    this.names = res;
                });
                this.names = event;
            },
            reset(){
                this.teach.assistantId = "";
                this.teach.courseId = "";
                this.getAll();
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