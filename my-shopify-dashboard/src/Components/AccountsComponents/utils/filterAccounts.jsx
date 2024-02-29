export const filterAccounts = (accounts, searchQuery) => {
  // Filter out undefined or null accounts first
  const validAccounts = accounts.filter(account => account !== undefined && account !== null);

  // Preprocess valid accounts
  const preprocessedAccounts = validAccounts.map(account => ({
    ...account,
    name: `${account.first_name} ${account.last_name}`,
    total_spent: account.total_spent,
  }));

  if (!searchQuery) return preprocessedAccounts;

  return preprocessedAccounts.filter(account => {
    const accountData = [
      account.name,
      account.email,
      account.customer_status,
      account.total_spent.toFixed(2),
    ]
    .join(' ')
    .toLowerCase();

    return accountData.includes(searchQuery.toLowerCase());
  });
};
