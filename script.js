const inputText = document.getElementById("inputText");
const preview = document.getElementById("markdownPreview");
const fileInput = document.getElementById("fileInput");
const dropZone = document.getElementById("dropZone");

inputText.addEventListener("input", updatePreview);

function updatePreview() {
  const markdown = inputText.value;
  const html = marked.parse(markdown, { breaks: true });
  preview.innerHTML = html;
}

function downloadMarkdown() {
  const blob = new Blob([inputText.value], { type: "text/markdown" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "converted.md";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

// 📁 Drag-and-drop support
dropZone.addEventListener("dragover", (e) => {
  e.preventDefault();
  dropZone.style.backgroundColor = "#def";
});

dropZone.addEventListener("dragleave", () => {
  dropZone.style.backgroundColor = "#fff";
});

dropZone.addEventListener("drop", (e) => {
  e.preventDefault();
  dropZone.style.backgroundColor = "#fff";

  const file = e.dataTransfer.files[0];
  if (file && file.type === "text/plain") {
    readFile(file);
  } else {
    alert("Please drop a valid .txt file.");
  }
});

fileInput.addEventListener("change", () => {
  const file = fileInput.files[0];
  if (file && file.type === "text/plain") {
    readFile(file);
  } else {
    alert("Please upload a valid .txt file.");
  }
});

function readFile(file) {
  const reader = new FileReader();
  reader.onload = (e) => {
    inputText.value = e.target.result;
    updatePreview();
  };
  reader.readAsText(file);
}
