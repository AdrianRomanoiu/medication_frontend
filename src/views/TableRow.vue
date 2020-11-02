<template>
    <tr>
    <td>
        <span class="custom-checkbox">
            <input type="checkbox" id="checkbox1" name="options[]" value="1">
            <label for="checkbox1"></label>
        </span>
    </td>
    <td>{{ person.email }}</td>
    <td>{{ person.name }}</td>
    <td>{{ person.birthDate.substring(0, 10) }}</td>
    <td>{{ person.address }}</td>
    <td>{{ person.gender }}</td>
    <td>
        <a href="#editEmployeeModal" class="edit" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i></a>
        <a href="#deleteEmployeeModal" class="delete" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i></a>
        <a href="#detailsModal" class="details" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Details">&#xE0ee;</i></a>
    </td>
</tr>
</template>

<script>
    export default {
        props: {
            person: {
                type: Object,
                required: true
            }
        },
        created() {
            console.log(this.person);
        }
    }
</script>