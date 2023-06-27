module.exports = {
    format_date: (date) => {
      if (!date) {
        return '';
      }
      //* Format date as MM/DD/YYYY
      return date.toLocaleDateString();
    },
  };