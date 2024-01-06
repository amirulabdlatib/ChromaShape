document.addEventListener("DOMContentLoaded", function () {
  const tableBody = document.querySelector("#table tbody");
  const shapeForm = document.getElementById("shapeForm");
  const addShapeButton = document.getElementById("addShape");

  // Event listener for modal form submission
  const updateSaveChangesButton = document.getElementById("updateSaveChanges");
  updateSaveChangesButton.addEventListener("click", () => {
    const shapeId = updateSaveChangesButton.getAttribute("data-shape-id");
    updateShape(shapeId);
  });

  // Function to fetch and display data
  function fetchData() {
    fetch("shape-color/")
      .then((response) => response.json())
      .then((data) => {
        // clear existing table
        tableBody.innerHTML = "";

        // Loop through data and append to the table
        data.forEach((item) => {
          // Format create_time
          const formattedTime = moment(item.create_time).format("H:mm:ss YYYY-MM-DD");

          // Populate data for each row
          const row = `<tr>
                          <td>${formattedTime}</td>
                          <td>${item.name}</td>
                          <td>
                          <div class="${getShapeClass(item.shape)}" style="background-color: ${item.color};margin-left:auto;
                          margin-right:auto;">
                          </div>
                          </td>
                          ${
                            isAuthenticated
                              ? `<td>
                              <button type="button" class="btn btn-warning update-btn mb-2" style="width: 100%" data-bs-toggle="modal" data-bs-target="#updateModal" data-id="${item.id}">Update</button>
                              <button type="button" class="btn btn-danger delete-btn" style="width: 100%" data-id="${item.id}">Delete</button>
                            </td>`
                              : ""
                          }
                       </tr>`;
          tableBody.innerHTML += row;
        });

        // Function to get shape-specific class
        function getShapeClass(shape) {
          return shape.toLowerCase();
        }
        // Attach click event to delete buttons
        const deleteButtons = document.querySelectorAll(".delete-btn");
        deleteButtons.forEach((button) => {
          button.addEventListener("click", () => {
            const id = button.dataset.id;
            deleteShape(id);
          });
        });

        // Attach click event to update buttons
        const updateButtons = document.querySelectorAll(".update-btn");
        updateButtons.forEach((button) => {
          button.addEventListener("click", () => {
            const id = button.dataset.id;
            fetchShapeDetailsForUpdate(id);
          });
        });
      })
      .catch((error) => console.error("Error fetching data:", error));
  }

  // Function to handle form submission
  function addShape() {
    const formData = new FormData(shapeForm);

    fetch("shape-color/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": formData.get("csrfmiddlewaretoken"),
      },
      body: JSON.stringify({
        name: formData.get("name"),
        shape: formData.get("shape"),
        color: formData.get("color"),
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Shape added successfully:", data);
        fetchData(); // Refresh the table after adding a new shape
      })
      .catch((error) => console.error("Error adding shape:", error));
  }

  // Function to handle shape deletion
  function deleteShape(id) {
    if (confirm("Are you sure you want to delete this shape?")) {
      fetch(`shape-color/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": shapeForm.elements.csrfmiddlewaretoken.value,
        },
      })
        .then((response) => {
          if (response.ok) {
            console.log(`Shape with ID ${id} deleted successfully.`);
            fetchData(); // Refresh the table after deleting a shape
          } else {
            console.error(`Error deleting shape with ID ${id}.`);
          }
        })
        .catch((error) => console.error("Error deleting shape:", error));
    }
  }

  // Function to fetch shape details for update
  function fetchShapeDetailsForUpdate(id) {
    fetch(`shape-color/${id}`)
      .then((response) => response.json())
      .then((data) => {
        // Populate modal fields with fetched data
        document.getElementById("updateModalTitle").innerText = `Update Shape - ID: ${data.id}`;
        document.getElementById("updateName").value = data.name;
        document.getElementById("updateShape").value = data.shape;
        document.getElementById("updateColor").value = data.color;

        // Add a data attribute to store the shape ID in the modal submit button
        document.getElementById("updateSaveChanges").setAttribute("data-shape-id", data.id);

        // Show the modal
        //const updateModal = new bootstrap.Modal(document.getElementById("updateModal"));
        //updateModal.show();
      })
      .catch((error) => console.error("Error fetching shape details for update:", error));
  }

  // Function to handle shape update
  function updateShape(id) {
    const updateForm = document.getElementById("updateShapeForm");
    const formData = new FormData(updateForm);

    fetch(`shape-color/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": formData.get("csrfmiddlewaretoken"),
      },
      body: JSON.stringify({
        name: formData.get("updateName"),
        shape: formData.get("updateShape"),
        color: formData.get("updateColor"),
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(`Shape with ID ${id} updated successfully:`, data);
        fetchData(); // Refresh the table after updating a shape
        // Close the modal after successful update
        const updateModal = new bootstrap.Modal(document.getElementById("updateModal"));
        updateModal.hide();
      })
      .catch((error) => console.error(`Error updating shape with ID ${id}:`, error));
  }

  // Initial fetch when the page loads
  fetchData();

  // Add event listener to the "Add" button
  addShapeButton.addEventListener("click", addShape);

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  // Create WebSocket connection
  let url = `ws://${window.location.host}/ws/socket-server`;

  // create websocket object with defined url
  const ShapeSocket = new WebSocket(url);

  ShapeSocket.onmessage = function (e) {
    let data = JSON.parse(e.data);
    console.log("Data:", data);
  };
});
