<template>
    <div class="row justify-content-center">
        <div class="col-sm-6">
            <h3 class="text-center">Add Course</h3>
            <form @submit.prevent="handleSubmitForm">
                <div class="form-group">
                    <label>Theme</label>
                    <select class="form-control" v-model="course.theme" required>
                        <option value="" disabled hidden>Select Theme</option>
                        <option v-for="theme in themes" :key=theme :value="theme">{{ theme }}</option>
                    </select>
                </div>

                <div class="form-group">
                    <label>Class</label>
                    <select class="form-control" v-model="course.classId" required>
                        <option value="" disabled hidden>Select Class</option>
                        <option v-for="class_ in classes" :key=class_._id :value="class_">
                            {{ class_.cantonId.name }} -
                            {{ class_.periode }} 
                        </option>
                    </select>
                </div>

                <div class="form-group">
                    <label>Date</label>
                    <input type="date" class="form-control" v-model="course.date" required>
                </div>

                <div class="form-group">
                    <label>Cost</label>
                    <input type="number" step="0.05" class="form-control" v-model="course.cost" required>
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
    import Course from "@/services/CourseService"
    import Theme from "@/services/ThemeService"
    import Class from "@/services/ClassService"

    export default {
        data() {
            return {
                course: {
                    id: '',
                    theme: '',
                    themeId: '',
                    classId: '',
                    date: '',
                    cost: ''
                },
                classes: '',
                themes: ''
            }
        },
        created(){
            console.log("PASS")
            Class.getAll().then(res => {
                this.classes = res
            });
            Theme.getAllTitles().then(res => {
                this.themes = res
            });
        },
        methods: { 
            handleSubmitForm() {
                Theme.findFilters(this.course.theme).then(res => {
                    this.course.themeId = res[0]._id;
                    Course.create(this.course).then(() => {
                        this.$router.push('/courses/list');
                    });
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