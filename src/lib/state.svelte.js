export let shared = $state(
    {
        userId: '',
        apiKey: '',
        model: 'gpt-4.1-mini',
        provider: 'openai',
        isLoggedIn: false
    }
);

// export let shared = $state(
//     {
//         userId: '',
//         apiKey: '',
//         model: 'gemini-2.0-flash',
//         provider: 'google',
//         isLoggedIn: false
//     }
// );