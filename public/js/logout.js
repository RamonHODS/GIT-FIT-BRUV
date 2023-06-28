const logout = async () => {
    try {
      const response = await fetch('/api/users/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/');
      } else {
        //* Handle the error case
        console.log('Logout failed.');
      }
    } catch (error) {
      //* Handle network errors
      console.log('Logout failed. Network error:', error);
    }
  };
  
  document.querySelector('#logout').addEventListener('click', logout);