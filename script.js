// script.js
document.addEventListener("DOMContentLoaded", function() {
    const memoInput = document.getElementById("memoInput");
    const addMemoButton = document.getElementById("addMemoButton");
    const searchInput = document.getElementById("searchInput");
    const memoList = document.getElementById("memoList");

    // Retrieve memos from Local Storage or initialize an empty array
    let memos = JSON.parse(localStorage.getItem("memos")) || [];

    // Function to render memos
    function renderMemos(filter = "") {
        memoList.innerHTML = ""; // Clear the list
        const filteredMemos = memos.filter(memo => memo.includes(filter));
        filteredMemos.forEach((memo, index) => {
            const li = document.createElement("li");
            li.textContent = memo;

            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete";
            deleteButton.className = "deleteButton";
            deleteButton.onclick = () => {
                memos.splice(index, 1); // Remove memo from array
                saveMemos(); // Save updated memos to Local Storage
                renderMemos(searchInput.value); // Re-render the list
            };

            li.appendChild(deleteButton);
            memoList.appendChild(li);
        });
    }

    // Function to save memos to Local Storage
    function saveMemos() {
        localStorage.setItem("memos", JSON.stringify(memos));
    }

    // Add memo on button click
    addMemoButton.addEventListener("click", function() {
        const memoText = memoInput.value.trim();
        if (memoText) {
            memos.push(memoText); // Add memo to array
            memoInput.value = ""; // Clear input field
            saveMemos(); // Save updated memos to Local Storage
            renderMemos(searchInput.value); // Re-render the list
        }
    });

    // Search memos
    searchInput.addEventListener("input", function() {
        renderMemos(searchInput.value); // Re-render the list with filter
    });

    // Initial render of memos
    renderMemos();
});
