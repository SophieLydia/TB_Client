<template>
    <div>
        <h3>More details about the child:</h3>
        <div class="row">
            <div class="col-md-12">
                <table class="table table-striped">
                    <thead class="thead-dark">
                        <tr>
                            <th>First Name</th>
                            <td>{{ person.firstName }}</td>
                        </tr>
                        <tr>
                            <th>Last Name</th>
                            <td>{{ person.lastName }}</td>
                        </tr>
                        <tr>
                            <th>Canton</th>
                            <td>{{ person.canton }}</td>  
                        </tr>
                        <tr>
                            <th>Periode</th>
                            <td>{{ person.periode }}</td>  
                        </tr>
                        <tr>           
                            <th>Parental statement</th>
                            <td>{{ person.parentalStatement ? "Yes" : "No"}}</td> 
                        </tr>
                        <tr>
                            <th>Allergy</th>
                            <td>{{ person.allergy }}</td>  
                        </tr>
                    </thead>
                </table>
            </div>
        </div>
        <div class="row justify-content-center">
            <div class="col-sm-auto">
                <router-link :to="`/child/update/${person.id}`" class="btn btn-update">Update</router-link>
            </div>
        </div>
    </div>
</template>

<script>
    import Person from "@/services/PersonService"

    export default {
        data() {
            return {
                person: {
                    id: '',
                    firstName: '',
                    lastName: '',
                    canton: '',
                    periode: '',
                    parentalStatement: '',
                    allergy: ''
                }
            }
        },
        created() {  
            Person.getChild(`${this.$route.params.id}`).then(res => {
                this.person.id = res._id._id;
                this.person.firstName = res._id.firstName;
                this.person.lastName = res._id.lastName;
                this.person.canton = res.classId.cantonId.name;
                this.person.periode = res.classId.periode;
                this.person.parentalStatement = res.parentalStatement;
                this.person.allergy = res.allergy;
            });
        }
    }
</script>

<style scoped>
    h3 {
        margin-top: 20px;
        margin-bottom: 20px;
    }
</style>