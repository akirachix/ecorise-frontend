// src/utils/paymentApi.js

export const stkPush = async ({ phoneNumber, amount, accountReference, transactionDesc }) => {
  try {
    const response = await fetch('https://ecorise-7761ef090ee3.herokuapp.com/api/daraja/stk-push/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        phone_number: phoneNumber,
        amount,
        account_reference: accountReference,
        transaction_desc: transactionDesc
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData?.message || 'Payment initiation failed');
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};
