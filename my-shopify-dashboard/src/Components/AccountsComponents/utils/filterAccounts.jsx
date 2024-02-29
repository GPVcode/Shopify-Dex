  // Assuming filterAccounts function is designed to filter through an array of account objects based on a search query
export const filterAccounts = (accounts, searchQuery) => {
    if (!searchQuery) return accounts; // If no search query, return all accounts
  
    return accounts.filter((account) => {
      // Construct a single string with relevant fields for the search
      const accountData = [
        account.first_name,
        account.last_name,
        account.email,
        account.customer_status,
        account.total_spent.toString(), // Assuming total_spent is a number, convert it to string
        // Add more fields as necessary
      ]
      .filter(Boolean) // Remove undefined or null values
      .join(' ') // Combine all fields into a single string
      .toLowerCase(); // Convert to lowercase for case-insensitive comparison
  
      // Return true if accountData includes the lowercase search query, false otherwise
      return accountData.includes(searchQuery.toLowerCase());
    });
  };
  