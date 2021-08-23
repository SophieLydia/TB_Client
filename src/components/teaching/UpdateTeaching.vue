<template>
    <div class="row justify-content-center">
        <div class="col-sm-6">
            <h3 class="text-center">Update Teaching</h3>
            <form @submit.prevent="handleUpdateForm">
                <div class="form-group">
                    <label>Name</label>
                    <select class="form-control" v-model="selectedName">
                        <option v-for="name in names" :key=name._id :value="name._id" :selected="name == selectedName">{{ name.firstName }} {{name.lastName}}</option>
                    </select>
                </div>

                <div class="row justify-content-center">
                    <div class="col-sm-auto">
                        <button class="btn btn-update">Update</button>
                    </div>
                </div> 
            </form>  
            <div>
                To change the theme, the canton, the periode or the date, you must update the corresponding course here:
            </div>             
            <router-link :to="`/courses/update/${courseId}`" class="btn btn-redirect">Update course</router-link> 
        </div>
    </div>
</template>

<script>
import Teach from "@/services/TeachingService"
import Person from "@/services/PersonService"
import Class from "@/services/ClassService"

export default {
    data() {
        return {
            courseId: '',
            selectedName: '',
            names: ''
        }
    },
    async created() {
        const resTeach = await Teach.get(`${this.$route.params.id}`);
        this.courseId = resTeach.courseId._id;
        const resClass = await Class.get(resTeach.courseId.classId);
        //To have only the assistants that are in the same canton as the course
        Person.findFilters("assistant", '', resClass.cantonId.name, '').then(res => {
            this.names = res;
        });
        const resName = await Person.get(resTeach.assistantId._id);
        this.selectedName = resName._id;
    },
    methods: {
        async handleUpdateForm() {
            const updatedTeach = JSON.parse(JSON.stringify({"assistantId": this.selectedName, "courseId": this.courseId}));
            Teach.update(`${this.$route.params.id}`, updatedTeach).then(() => {
                this.$router.push('/teachings/list');
                if (window.confirm("The teaching has been updated")) {
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