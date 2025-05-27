let studentListDB = [
  {
    id: 1,
    name: "Huấn",
    age: 18,
    class: "A1",
  },
  {
    id: 2,
    name: "Ngọc",
    age: 19,
    class: "A1",
  },
  {
    id: 3,
    name: "Len",
    age: 20,
    class: "A1",
  },
];

function showStudentList() {
  let showStudentList = document.getElementById("show-student-list");
  let studentList = "";
  for (let object of studentListDB) {
    let li = `
          <tr>
            <td>${object.name}</td>
            <td>${object.age}</td>
            <td>${object.class}</td>
            <td>
              <button class="edit-button" onclick="editStudentInfo(${object.id})">Sửa</button>
              <button class="delete-button" onclick="deleteStudent(${object.id})">Xóa</button>
            </td>
          </tr>
  `;
    studentList += li;
  }
  showStudentList.innerHTML = studentList;
}

let edittingId = null;

function addOrEditStudent() {
  let nameValue = document.getElementById("name").value.trim();
  let ageValue = document.getElementById("age").value.trim();
  let classValue = document.getElementById("class").value.trim();
  if (nameValue === "" || ageValue === "" || classValue === "") {
    alert("Tên, tuổi hoặc lớp không được để trống");
    return;
  }
  if (edittingId === null) {
    let newStudent = {
      id: Date.now(),
      name: nameValue,
      age: ageValue,
      class: classValue,
    };
    studentListDB.push(newStudent);
  } else {
    let index = studentListDB.findIndex((object) => object.id === edittingId);
    if (index === -1) return;
    studentListDB[index].name = nameValue;
    studentListDB[index].age = ageValue;
    studentListDB[index].class = classValue;
    document.querySelector(".add-button").textContent = "Thêm sinh viên";
    edittingId = null;
  }

  showStudentList();
  document.getElementById("name").value = "";
  document.getElementById("age").value = "";
  document.getElementById("class").value = "";
}

function addNewStudent() {
  let addNewStudentButton = document.querySelector(".add-button");
  addNewStudentButton.addEventListener("click", addOrEditStudent);
}

function deleteStudent(id) {
  studentListDB = studentListDB.filter((object) => object.id !== id);
  showStudentList();
}

function searchForStudentByName() {
  let searchInput = document.getElementById("search-input").value.toUpperCase();
  let tableRow = document.getElementsByTagName("tr");

  for (let i = 1; i < tableRow.length; i++) {
    let tableData = tableRow[i].getElementsByTagName("td")[0];
    let studentName = tableData.textContent || tableData.innerText;
    if (studentName.toUpperCase().indexOf(searchInput) > -1) {
      tableRow[i].style.display = "";
    } else {
      tableRow[i].style.display = "none";
    }
  }
}

function editStudentInfo(id) {
  let studentInfo = studentListDB.find((object) => object.id === id);
  if (!studentInfo) return;
  document.getElementById("name").value = studentInfo.name;
  document.getElementById("age").value = studentInfo.age;
  document.getElementById("class").value = studentInfo.class;

  edittingId = id;

  document.querySelector(".add-button").textContent = "Cập nhật";
}

showStudentList();
addNewStudent();
