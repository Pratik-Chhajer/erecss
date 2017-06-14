// When category 1 is checked
// Show sub categories of category 1
$('#isC1Selected').click(function() {
	$("#category_1").toggle(this.checked);
});

// When category 2 is checked
// Show sub categories of category 2
$('#isC2Selected').click(function() {
	$("#category_2").toggle(this.checked);
});

// When category 3 is checked
// Show sub categories of category 3
$('#isC3Selected').click(function() {
	$("#category_3").toggle(this.checked);
});

// Function To open modal containg our form
function openModal(){
    $('#myModal').modal();
}

// Function to validate email address
function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

$(document).ready(function(){
	// TO store email address
	var email = "";
	// when email address's submit button is clicked
	// validate the email first
	$("#email_button").click(function(e){
		var Email = document.getElementById("email").value;
		email = Email;
		if (validateEmail(Email)) {
			// if valid email then open modal
			openModal();
		}
		else{
			// else alert user for invalid email address
			alert("Inavalid Email!!");
		}
	});

	// When submit button of form is pressed
	$("#submit_button").click(function(e){
		e.preventDefault();
		// Getting multiple select from sub-categories
		var c1 = $('#c1').val();
		var c2 = $('#c2').val();
		var c3 = $('#c3').val();
		var C = c1.concat(c2);
		// Basically C is single array containing all the choices chosen
		C = C.concat(c3);
		C = JSON.stringify(C);
		var data = {email: email, C: C, submit: true};
		$.ajax({
			url: "server/form_back_end.php", 
			type:"POST",
			data: data, 
		 	success: function(result){
		 		result = $.parseJSON(result);
		 		if(result["error"]!="true"){
		 			alert(result["error"]);
		 		}
		 		else{
		 			// Displaying message according to user
		 			if(result["new_user"]=="true"){
		 				alert("Welcome new user!! Your choices has been saved!");
		 			}
		 			else{
		 				alert("Hi your choices have been updated!");
		 			}
		 		}
	    	}
	    });
	});
});