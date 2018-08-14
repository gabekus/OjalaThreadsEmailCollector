/* eslint-disable no-unused-vars */
function deleteUser(email) {
  const xhr = new XMLHttpRequest();
  xhr.open('POST', `./delete/${email}`);
  xhr.send();
  xhr.onreadystatechange = () => {
    // Deletion successfully finished

    // Hide deleted row
    document.getElementById(`row-${email}`).style.display = 'none';
  };
}
