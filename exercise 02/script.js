let input = document.getElementById("myInput");

let keys = document.getElementsByTagName("button");
for (let i = 0; i < keys.length; i++) {
  let key = keys[i];
  key.onclick = function () {
    let keyValue = key.textContent || key.innerText;
    if (key.id === "delete-btn") {
      input.value = "";
    } else {
      input.value += keyValue;
    }
  };
}
