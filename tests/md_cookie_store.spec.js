const {test} = require('@playwright/test');
const { addAbortListener } = require('events');


test('cookies', async({context,page})=>
{
   await context.clearCookies();

    //  await context.addCookies([{
    //     name: '_ga',
    //     value: 'GA1.1.624035496.1757332596',
    //     url: 'https://dev.merchdominator.com/best_sellers'
    //     // domain: 'dev.merchdominator.com',
    //     // path: '/',
    //  },
    //  {
    //     name: 'fbp',
    //     value: 'fb.1.1757332597082.32005520864184869',
    //     url: 'https://dev.merchdominator.com/best_sellers'
    //     // domain: 'dev.merchdominator.com',
    //     // path: '/',
    //  },
    //  {
    //     name: 'merch_dominator_session',
    //     value: 'CDkYuuVxXBzjixQqLo2P7HNDQVKhz1ZjXuZ9',
    //     url: 'https://dev.merchdominator.com/best_sellers',
    //     //path: '/',
    //     httpOnly: true,
    //     secure: true
    //  }]);

   await context.addCookies([
    { name: '_ga', value: 'GA1.1.624035496.1757332596', url: 'https://dev.merchdominator.com' },
    { name: '_fbp', value: 'fb.1.1757332597082.320055250864184869', url: 'https://dev.merchdominator.com' },
    { name: '_cs_c', value: '0', url: 'https://dev.merchdominator.com' },
    { name: 'cookieconsent_preference', value: 'security:allowed,analytics_storage:allowed,ads_storage:allowed,functionality_storage:allowed,personalization_storage:allowed', url: 'https://dev.merchdominator.com' },
    { name: '_cs_id', value: '2abe3ef1-15c4-a98a-a734-8482d0d165f2.1757332835.4.1757574767.1757574765.1.1790496835516.0.x', url: 'https://dev.merchdominator.com' },
    { name: '__stripe_mid', value: '7254dd0e-0321-4ee8-b682-f9072d486efcc12665', url: 'https://dev.merchdominator.com' },
    { name: 'cf_clearance', value: 'Fva9LHdPLa8dHzr7fas5d2NqVFCP2hE9L40lO8Fs7bM-1758776636-1.2.1.1-9t1Y9NLuSP8To1dEVFBzssLd.ZzAKu6MYZgY.sohb64bXJjXSCPquErWjRg7.HIdJmVirUGwK.iFUet1CSG0hdj0mOv9EzTPEE3b3z26NRXs5BJ10fDVgxexAoROK4Bii9zKQwxwQLaQ1uQZhRINIMwtjWG9LvyfQsU8bwuAnfSjRWPqP7ExWU_s5dyKA4OdzDkSeGpuvR7oMBKFMLUwZMnLo_wRLgW_hdOshYT4arI', url: 'https://dev.merchdominator.com' },
    { name: '_gcl_au', value: '1.1.1282636869.1757332596.740872145.1758776640.1758776644', url: 'https://dev.merchdominator.com' },
    { name: 'XSRF-TOKEN', value: 'ChHfr4wP5hK2fPK4L5Ly61wofFCqQK2ql2OER7j1', url: 'https://dev.merchdominator.com' },
    { name: 'merch_dominator_session', value: 'CDkyUUvxXBx3j2ixQqLoL2p7HNDQXEkg12jXLuZ9', url: 'https://dev.merchdominator.com', httpOnly: true, secure: true },
    { name: '_dd_s', value: 'logs=1&id=bd39354a-2c81-4593-a337-b6876ea1fc4b&created=1758776574143&expire=1758777568403', url: 'https://dev.merchdominator.com' },
    { name: '_ga_Z7FFVFKBJG', value: 'GS2.1.s1758776573$o21$g1$t1758776670$j29$l0$h274265012', url: 'https://dev.merchdominator.com' },
    { name: '_ga_K95CXXH79J', value: 'GS2.1.s1758776575$o22$g1$t1758776670$j36$l0$h0', url: 'https://dev.merchdominator.com' },
    { name: 'AWSALBTG', value: 'OojJEISbJ4QTf87I6dPeKkng6HLXv0NfU6luymIlHKaF6nlKsEL9D/7qPrkylAWRr6hMTsOve+ygOt7oO8p9f6oqXtxeEP3AlG7SsYKDeOeQjFN9PiiTnAzepP8XYgHnr1IRSDoR2x/x6O5oeU2QUAXfZHwAyNzLsMtnihYi1bvOVb5GwDY=', url: 'https://dev.merchdominator.com' },
    { name: 'AWSALBTGCORS', value: 'OojJEISbJ4QTf87I6dPeKkng6HLXv0NfU6luymIlHKaF6nlKsEL9D/7qPrkylAWRr6hMTsOve+ygOt7oO8p9f6oqXtxeEP3AlG7SsYKDeOeQjFN9PiiTnAzepP8XYgHnr1IRSDoR2x/x6O5oeU2QUAXfZHwAyNzLsMtnihYi1bvOVb5GwDY=', url: 'https://dev.merchdominator.com' }
  ]);
     
        await page.reload();
        await page.goto('https://dev.merchdominator.com/best_sellers');
        
await page.pause();
        // const cooke = await context.cookies();
        // console.log(cooke);
});