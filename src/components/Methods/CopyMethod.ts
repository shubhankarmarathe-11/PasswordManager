

function copyText() {
    var username:string = document.getElementById("copyuser").innerText;
    var password:string = document.getElementById("copypassword").innerText;

    var CombineText:string = username + "\n" + password

    navigator.clipboard.writeText(CombineText)
      .then(() => alert("Copied: " + CombineText))
      .catch(err => console.error("Failed to copy: ", err));
}

export {copyText}