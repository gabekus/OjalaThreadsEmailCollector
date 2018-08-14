/* eslint-disable no-unused-vars */
function deleteUser(email) {
  if (window.confirm(`Are you sure you want to delete ${email}`)) {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', `./delete/${email}`);
    xhr.send();
    xhr.onreadystatechange = () => {
    // Deletion successfully finished

    // Hide deleted row
      document.getElementById(`row-${email}`).style.display = 'none';
    };
  }
}
