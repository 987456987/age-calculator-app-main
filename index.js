
      const inputDay = document.getElementById('day');
      const inputMonth = document.getElementById('month');
      const inputYear = document.getElementById('year');

      const errorDay = document.getElementById('error-day');
      const errorMonth = document.getElementById('error-month');
      const errorYear = document.getElementById('error-year');
      const errorItem = document.querySelectorAll('.error');
      
      document.addEventListener('invalid', function(e) {
        e.preventDefault();
        
        if(inputDay.value=='')
        {
          errorDay.textContent = 'This field is required.';
          errorDay.classList.remove('hidden');
        }
        if(inputMonth.value=='')
        {
          errorMonth.textContent = 'This field is required.';
          errorMonth.classList.remove('hidden');
        }
        if(inputYear.value=='')
        {
          errorYear.textContent = 'This field is required.';
          errorYear.classList.remove('hidden');
        }
    
        displayError();

      }, true);


      document.addEventListener('submit', function(e) {
        e.preventDefault();
        
        let isValid = true;
        if(!validYear())
          isValid = false;
        if(!validMonth())
          isValid = false;


        if(!isValid){
            displayError();
        }

        
      }, true);

      function validYear() {
        const year = parseInt(inputYear.value, 10);

        if(year > new Date().getFullYear()) {
          errorYear.textContent = 'Must be valid year.';
          errorYear.classList.remove('hidden');
          return false;
        }
        return true;
      }

      function validMonth() {
        const month = parseInt(inputMonth.value, 10);
        if(month > 12 || month < 1){
          errorMonth.textContent = 'Must be valid month.';
          errorMonth.classList.remove('hidden');
          return false;
        }
        return true;
      }


      function displayError () {
        errorItem.forEach(element => {
            element.style.display = 'block';
          });

        timeoutId = setTimeout(function() {
        errorItem.forEach(element => {
          element.style.display = 'none';
          element.classList.add('hidden');
        });
      }, 5000);
      }

