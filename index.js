document.addEventListener('DOMContentLoaded', function () {
    const firstName = document.getElementById('fname');
    const lastName = document.getElementById('lname');
    const address = document.getElementById('address');
    const position = document.getElementById('position');
    const genderRadios = document.querySelectorAll('input[name="gender"]');
    let tableData = []; // Initialize tableData as an empty array
    const container = document.getElementById('container');
    const form = document.querySelector('form');
    const error = document.createElement("p");
    const defaultPositionValue = position.value;
    let editable = false;
    let editIndex = -1;
    function clearData() {
        firstName.value = '';
        lastName.value = '';
        address.value = '';
        position.value = defaultPositionValue; // Set the value to the default value

        // Clear the selected radio button for the "gender" field
        genderRadios.forEach(radio => {
            radio.checked = false;
        });
    }

    function appendDataToTable(data) {
        const table = document.getElementById("table");
        const row = document.createElement("tr");
        const del = document.createElement("button");
        const edit = document.createElement("button");
        del.textContent = "delete";
        edit.textContent = "edit";

        // Add event listener for delete button
        del.addEventListener('click', function () {
            const rowIndex = tableData.indexOf(data);
            if (rowIndex !== -1) {
                tableData.splice(rowIndex, 1);
                
                table.deleteRow(rowIndex + 1); 
            }
        });

        edit.addEventListener('click' , function(){
            editable = true;
            editIndex = tableData.indexOf(data);
            firstName.value = data.firstName;
            lastName.value = data.lastName;
            address.value = data.address;
            position.value = data.position;
            genderRadios.forEach(radio => {
                radio.checked = radio.value === data.gender;
            
            });
            

        })

        for (const key in data) {
            const td = document.createElement("td");
            td.textContent = data[key];
            row.appendChild(td);
        }

        row.appendChild(edit);
        row.appendChild(del);

        table.appendChild(row);
    }

    function validateData() {
        if (firstName.value === '' || lastName.value === '' || address.value === '' || position.value === '' ) return false;
        return true;
    }

    function funcGetData(event) {
        event.preventDefault(); // Prevent the form submission and page refresh
       
        const gender = document.querySelector('input[name="gender"]:checked');
        if (validateData() ) {
            error.style.display = "none";
            const data = {
                firstName: firstName.value,
                lastName: lastName.value,
                address: address.value,
                position: position.value,
                gender: gender ? gender.value : ''
            };
            console.log(data);
            if(!editable){
            tableData.push(data);
            appendDataToTable(data);
        }else{
            tableData[editIndex] = data;
            const row = table.rows[editIndex + 1]; // Adding 1 because of the header row
            row.cells[0].textContent = data.firstName;
            row.cells[1].textContent = data.lastName;
            row.cells[2].textContent = data.address;
            row.cells[3].textContent = data.position;
            row.cells[4].textContent = data.gender;
            editable = false;
            editIndex = -1;
        }
        clearData();
            
        } else {
            error.textContent = "Please fill in all the details";
            container.appendChild(error);
        }
    }

    form.addEventListener('submit', funcGetData);
});
