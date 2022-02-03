## Styled components for Mirror.xyz 
Building blocks for Mirror.xyz to render web3 content in your React app. 
Styled with [Mirror Degen](https://github.com/mirror-xyz/degen).

Renders:
- Entries 
- Crowdfunds
- Editions
- Entry editions 
- Polls 
- ... more to come 

### Usage 
___

1. Install  .
   ```
    npm install mirrorblocks 
   ```
   ```
    yarn add mirrorblocks 
   ```
2. Wrap your app with the ThemeProvider 
    ```
    import { ThemeProvider } from 'mirrorblocks'

    const App = () => (
    <ThemeProvider>
        <YourRoutes />
    </ThemeProvider>
    )
    ```

3. Import the components you want to use
   ```
   import { Crowdfund, Entry, Edition, EntryEdition, Poll } from 'mirrorblocks'

   const MyPage = () => (
      <main>
         <Poll digest={"18"} />
         <Crowdfund maxWidth={"64rem"} address={"0x18f623e397EF28F1A5a094840f7F6f5587828b94"} />
         <Edition contract={'0xDF5b5ee15CC96ba7d0CB6BD9b2c0fc4417ab6445'} id={453} maxWidth={"24rem"}/>
         <EntryEdition digest={"sfgXhqtwwMkhHLnAM1jVr16MdSJ4RGSb1Y6CAKpslgc"} />
      </main>
   )

   export default MyPage
   ```

### License
___

MIT.

If you have any optimizations ideas or improvements feel free to contribute :) 
