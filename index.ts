import inquirer from "inquirer";

// Defining Types
interface Employee {
  employeeId: number;
  employeeName: string;
  salary: number;
}

// Variable Initialization
let collectionOfEmployee: Employee[] = [
  {
    employeeId: 7625,
    employeeName: "Fahad Khan",
    salary: 25000,
  },
  {
    employeeId: 7487,
    employeeName: "Imran Sindhi",
    salary: 50000,
  },
  {
    employeeId: 242536,
    employeeName: "Atif Aslam",
    salary: 100000,
  },
];

// Function to prompt user with a menu
async function EmployeeManagementSystem() {
  return inquirer.prompt({
    message: "Please Select One Option to Continue.",
    type: "list",
    name: "EmployeeOptions",
    choices: ["Add", "Delete", "Update", "View list", "Exit"],
  });
}

// Function to prompt for user input
async function UserInput(message: string) {
  return inquirer.prompt({
    message: message,
    type: "input",
    name: "UserInput",
  });
}

// Main function to handle the user input and operations
async function main() {
  let exit = false;

  while (!exit) {
    const functionCallEMS = await EmployeeManagementSystem();

    switch (functionCallEMS.EmployeeOptions) {
      case "Add":
        await addEmployee();
        break;
      case "Delete":
        await deleteEmployee();
        break;
      case "Update":
        await updateEmployee();
        break;
      case "View list":
        viewEmployeeList();
        break;
      case "Exit":
        exit = true;
        console.log("Exiting the Employee Management System...");
        break;
      default:
        console.log("Invalid option selected.");
    }
  }
}

async function addEmployee() {
  let idInput = await UserInput("Add Employee ID: ");
  let nameInput = await UserInput("Add Employee Name: ");
  let salaryInput = await UserInput("Add Employee Salary: ");

  // Converting inputs to the correct types
  let id = parseInt(idInput.UserInput);
  let salary = parseFloat(salaryInput.UserInput);
  let name = nameInput.UserInput;

  // Validate the input
  if (isNaN(id) || isNaN(salary)) {
    console.log(
      "Invalid input. Please enter numeric values for ID and Salary."
    );
  } else {
    let details: Employee = {
      employeeId: id,
      employeeName: name,
      salary: salary,
    };

    collectionOfEmployee.push(details);
    console.log("Employee added successfully.");
    console.log(collectionOfEmployee);
  }
}

async function deleteEmployee() {
  let idInput = await UserInput("Enter Employee ID to delete: ");
  let id = parseInt(idInput.UserInput);

  if (isNaN(id)) {
    console.log("Invalid input. Please enter a numeric value for ID.");
    return;
  }

  let index = collectionOfEmployee.findIndex(
    (employee) => employee.employeeId === id
  );

  if (index !== -1) {
    collectionOfEmployee.splice(index, 1);
    console.log("Employee deleted successfully.");
  } else {
    console.log("Employee not found.");
  }

  console.log(collectionOfEmployee);
}

async function updateEmployee() {
  let idInput = await UserInput("Enter Employee ID to update: ");
  let id = parseInt(idInput.UserInput);

  if (isNaN(id)) {
    console.log("Invalid input. Please enter a numeric value for ID.");
    return;
  }

  let employee = collectionOfEmployee.find(
    (employee) => employee.employeeId === id
  );

  if (employee) {
    let nameInput = await UserInput(
      `Update Employee Name (current: ${employee.employeeName}): `
    );
    let salaryInput = await UserInput(
      `Update Employee Salary (current: ${employee.salary}): `
    );

    let name = nameInput.UserInput || employee.employeeName;
    let salary = parseFloat(salaryInput.UserInput) || employee.salary;

    if (!isNaN(salary)) {
      employee.employeeName = name;
      employee.salary = salary;
      console.log("Employee updated successfully.");
    } else {
      console.log(
        "Invalid salary input. Please enter a numeric value for salary."
      );
    }
  } else {
    console.log("Employee not found.");
  }

  console.log(collectionOfEmployee);
}

function viewEmployeeList() {
  console.log("Employee List:");
  console.log(collectionOfEmployee);
}

// Execute the main function
main();
