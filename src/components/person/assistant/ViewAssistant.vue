<template>
    <div>
        <h3>More details about the assistant:</h3>
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
                            <th>Salary</th>
                            <td>{{ person.salary }}</td> 
                        </tr>
                    </thead>
                </table>
            </div>
        </div>
        <div class="row justify-content-center">
            <div class="col-sm-auto">
                <router-link :to="`/assistant/update/${person.id}`" class="btn btn-update">Update</router-link>
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
                    salary: ''
                }
            }
        },
        created() {  
            Person.getAssistant(`${this.$route.params.id}`).then(res => {
                this.person.id = res._id._id;
                this.person.firstName = res._id.firstName;
                this.person.lastName = res._id.lastName;
                this.person.canton = res.cantonId.name;
                this.person.salary = res.salary;
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