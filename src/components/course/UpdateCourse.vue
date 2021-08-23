<template>
    <div class="row justify-content-center">
        <div class="col-sm-6">
            <h3 class="text-center">Update Course</h3>
            <form @submit.prevent="handleUpdateForm">
                <div class="form-group">
                    <label>Theme</label>
                    <select class="form-control" v-model="selectedTheme">
                        <option v-for="theme in themes" :key=theme :value="theme" :selected="theme == selectedTheme">{{ theme }}</option>
                    </select>
                </div>

                <div class="form-group">
                    <label>Canton</label>
                    <select class="form-control" v-model="selectedCanton">
                        <option v-for="cant in cantons" :key=cant :value="cant" :selected="cant == selectedCanton">{{ cant }}</option>
                    </select>
                </div>

                <div class="form-group">
                    <label>Periode</label>
                    <select class="form-control" v-model="periode">
                        <option value="morning">Morning</option>
                        <option value="afternoon">Afternoon</option>
                    </select>
                </div>

                <div class="form-group">
                    <label>Date</label>
                    <input type="date" class="form-control" v-model="date">
                </div>

                <div class="form-group">
                    <label>Cost</label>
                    <input type="number" step="0.05" class="form-control" v-model="cost">
                </div>

                <div class="form-group">
                    <label>Absence</label>
                    <div v-for="child in allAbsences" :key="child._id">
                        <input type="checkbox" :value="child._id" v-model="absenceId">
                        {{ child.firstName }} {{ child.lastName }}
                    </div>
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
import Course from "@/services/CourseService"
import Class from "@/services/ClassService"
import Theme from "@/services/ThemeService"
import Cant from "@/services/CantonService"
import Person from "@/services/PersonService"

export default {
    data() {
        return {
            periode: '',
            date: '',
            cost: '',
            allAbsences: [],
            absenceId: [],
            selectedTheme: '',
            themes: '',
            selectedCanton: '',
            cantons: ''
        }
    },
    async created() {
        Cant.getAllNames().then(res => {
            this.cantons = res
        });
        Theme.getAllTitles().then(res => {
            this.themes = res
        });
        const resCourse = await Course.get(`${this.$route.params.id}`);
        this.date = resCourse.date.substring(0, 10);
        this.cost = resCourse.cost;
        this.absenceId = resCourse.absence;
        const resTheme = await Theme.get(resCourse.themeId);
        this.selectedTheme = resTheme.title;
        const resClass = await Class.get(resCourse.classId)
        this.selectedCanton = resClass.cantonId.name;
        this.periode = resClass.periode;
        Person.findFilters("child", '', this.selectedCanton, this.periode).then(res => {
            this.allAbsences = res;
        });
    },
    methods: {
        async handleUpdateForm() {
            const resThemeId = await Theme.findFilters(this.selectedTheme);
            const resCantonId = await Cant.findFilters(this.selectedCanton);
            const resClassId = await Class.findFilters(this.periode, resCantonId[0]._id);
            const updatedCourse = JSON.parse(JSON.stringify({"themeId":resThemeId[0]._id, "classId":resClassId[0]._id, "date":this.date, "cost":this.cost, "absence":this.absenceId}));
            Course.update(`${this.$route.params.id}`, updatedCourse).then(() => {
                this.$router.push('/courses/list');
                if (window.confirm("The course has been updated")) {
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