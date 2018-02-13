$(document).ready(() => {
	console.log("main.js is up!");

		//delete function

	function deleteFavorites(id) {
			console.log("delete button clicked!");
			$.ajax({
				method: "DELETE",
				url: "/profile/"+id,
				success: alert("Item Deleted"),
				failure: alert("Unable to Delete")
			});
		}
});
