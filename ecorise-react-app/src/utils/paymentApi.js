export const stkPush = async ({ phoneNumber, amount, accountReference, transactionDesc }) => {
  try {
    const url = process.env.REACT_APP_STK_PUSH_URL;
    console.log('STK Push URL:', url); 

    if (!url) {
      throw new Error('API URL is undefined. Check your environment variable.');
    }

    const response = await fetch(url, {
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

    const contentType = response.headers.get('content-type') || '';

    if (!response.ok) {
      if (contentType.includes('application/json')) {
        const errorData = await response.json();
        throw new Error(errorData?.message || 'Payment initiation failed');
      } else {
        const errorText = await response.text();
        throw new Error(errorText || 'Payment initiation failed and response not JSON');
      }
    }

    if (contentType.includes('application/json')) {
      return await response.json();
    } else {
      const text = await response.text();
      console.warn('Expected JSON response but got:', text);
      throw new Error('Response is not JSON');
    }
  } catch (error) {
    console.error('stkPush error:', error);
    throw error;
  }
};
