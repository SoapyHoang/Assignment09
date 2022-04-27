// CREATE AN ARRAY OF EMPLOYEES
let employees = []

// CHECK TO SEE IF STORAGE OBJECT EXISTS WHEN THE PAGE LOADS
// IF DOES, RETURN STORAGE OBJECT INTO ARRAY INSTEAD OF POPULATED ARRAY
if (localStorage.employees) {
    employees = JSON.parse(localStorage.employees)
}

// GET DOM ELEMENTS
const $ = (id) => document.getElementById(id)
let form = $('addForm')
let empTable = $('employees')

// BUILD THE EMPLOYEES TABLE WHEN THE PAGE LOADS
buildGrid()

// ADD EMPLOYEE
form.addEventListener('submit', (e) => {
    // PREVENT FORM SUBMISSION
    e.preventDefault()
    // GET THE VALUES FROM THE TEXT BOXES
    let id = $('id').value
    let name = $('name').value
    let ext = $('extension').value
    let email = $('email').value
    let dept = $('department').value
    // ADD THE NEW EMPLOYEE TO A NEW ARRAY OBJECT
    let employee = [id, name, ext, email, dept]
    // PUSH THE NEW ARRAY TO THE *EXISTING* EMPLOYEES ARRAY
    employees.push(employee)
    // BUILD THE GRID
    buildGrid()
    // RESET THE FORM
    $('addForm').reset()
    // SET FOCUS BACK TO THE ID TEXT BOX
    $('id').focus()
});

// DELETE EMPLOYEE
empTable.addEventListener('click', (e) => {
    // CONFIRM THE DELETE
    if (confirm(`Are you sure you want to delete employee, ${e.target.parentElement.children[1].innerText}?`)) {
        // GET THE SELECTED ROWINDEX FOR THE TR (PARENTNODE.PARENTNODE)
        let i = e.target.parentElement.rowIndex
        // CALL DELETEROW() METHOD TO DELETE SPECIFIC ROW IN THE TABLE
        empTable.deleteRow(i)
        // REMOVE EMPLOYEE FROM ARRAY
        employees.splice(i - 1, 1)
        // BUILD THE GRID
        buildGrid()
    }
});

// BUILD THE EMPLOYEES GRID
function buildGrid() {
    // REMOVE THE EXISTING SET OF ROWS BY REMOVING THE ENTIRE TBODY SECTION
    empTable.removeChild(empTable.getElementsByTagName('tbody')[0])
    // REBUILD THE TBODY FROM SCRATCH
    let tbody = document.createElement('tbody')
    
    // LOOP THROUGH THE ARRAY OF EMPLOYEES
    // REBUILDING THE ROW STRUCTURE
    let msg = ''
    employees.forEach((employee) => {
        console.log(employee)
        msg += '<tr>' // Begin Row
        employee.forEach((field) => {
            msg += '<th>' + field + '</th>' // Add Column
        })
        msg += '<th>&nbsp;</th></tr>' // End Row
    })
    tbody.innerHTML = msg


    // BIND THE TBODY TO THE EMPLOYEE TABLE
    empTable.appendChild(tbody)
    // UPDATE EMPLOYEE COUNT
    $('empCount').value = '(' + employees.length + ')'
    // STORE THE ARRAY IN STORAGE
    localStorage.employees = JSON.stringify(employees)
};