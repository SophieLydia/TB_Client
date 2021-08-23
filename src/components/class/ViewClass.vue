<template>
    <div>
        <h3>Details of the class:</h3>
        <div class="row">
            <div class="col-md-12">
                <table class="table table-striped">
                    <thead class="thead-dark">
                        <tr>
                            <th>Periode</th>
                            <td>{{ class_.periode }}</td>
                        </tr>
                        <tr>
                            <th>Canton</th>
                            <td>{{ class_.canton }}</td>
                        </tr>
                        <tr>
                            <th>Post Code</th>
                            <td>{{ class_.address.postCode }}</td>
                        </tr>
                        <tr>
                            <th>City</th>
                            <td>{{ class_.address.city }}</td>  
                        </tr>
                        <tr>           
                            <th>Street Name</th>
                            <td>{{ class_.address.streetName }}</td> 
                        </tr>
                        <tr>     
                            <th>Street Number</th>
                            <td>{{ class_.address.streetNumber }}</td>
                        </tr>
                        <tr>         
                            <th>Children</th>
                            <td> {{ class_.children.join(', ') }} </td>
                        </tr>
                    </thead>
                </table>
            </div>
        </div>
        <div class="row justify-content-center">
            <div class="col-sm-auto">
                <router-link :to="`/classes/update/${class_._id}`" class="btn btn-update">Update</router-link>
                <button @click.prevent="deleteClass(`${class_._id}`)" class="btn btn-delete">Delete</button>
            </div>
        </div>
    </div>
</template>

<script>
    import Class from "@/services/ClassService"
    import Cant from "@/services/CantonService"
    import Person from '@/services/PersonService'

    export default {
        data() {
            return {
                class_: {
                    _id: '',
                    periode: '',
                    canton: '',
                    address: {
                        postCode: '',
                        city: '',
                        streetName: '',
                        streetNumber: ''
                    },
                    children: []
                }
            }
        },
        async created() {  
            const resClass = await Class.get(`${this.$route.params.id}`);
            this.class_._id = resClass._id;
            this.class_.periode = resClass.periode;
            this.class_.canton = resClass.cantonId.name;
            const resCanton = await Cant.get(resClass.cantonId._id);
            this.class_.address = resCanton.address;
            this.getChildren();
        },
        methods: {
            deleteClass(id){
                if (window.confirm("Do you really want to delete this class?")) {
                        Class.delete(id).then(() => {
                            this.$router.push("/classes/list");
                    });
                }
            },
            async getChildren(){
                let listChild = [];
                const allChildren = await Person.findFilters("child", '', this.class_.canton, this.class_.periode);
                for (let i=0; i<allChildren.length; ++i) {
                    listChild[i] = allChildren[i].firstName + " " + allChildren[i].lastName;
                }
                this.class_.children = listChild;
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