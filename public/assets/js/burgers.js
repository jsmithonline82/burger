$(function() {
    // Change burger state on click 
    $('.change-devour').on('click', function(event) {
      event.preventDefault();
      const id = $(this).data('id');
      const newDevour = $(this).data('newdevour');
  
      const newDevouredState = {
        devoured: newDevour,
      };
  
      //PUT request.
      $.ajax(`/api/burgers/${id}`, {
        type: 'PUT',
        data: newDevouredState,
      }).then(function() {
        console.log('changed devoured to', newDevour);
        location.reload();
      });
    });
  
    $('.create-form').on('submit', function(event) {
      event.preventDefault();
  
      const burgerValue = $('#br')
        .val()
        .trim();
      if (burgerValue) {
        const newBurger = {
          burger_name: $('#br')
            .val()
            .trim(),
          devoured: 0,
        };
  
        // POST request.
        $.ajax('/api/burgers', {
          type: 'POST',
          data: newBurger,
        }).then(function() {
          console.log('created new burger');
          location.reload();
        });
      }
    });
  
    // Delete burger
    $('.delete-burger').on('click', function(event) {
      const id = $(this).data('id');
  
      // DELETE request.
      $.ajax(`/api/burgers/${id}`, {
        type: 'DELETE',
      }).then(function() {
        console.log('deleted burger', id);
        location.reload();
      });
    });
  });